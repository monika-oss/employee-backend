const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getAllEmployees = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees ORDER BY id ASC');
        
        // Auto-heal sequence if there are gaps
        let needsUpdate = false;
        for (let i = 0; i < rows.length; i++) {
            const expectedId = 'EMP' + (i + 1).toString().padStart(3, '0');
            if (rows[i].employee_id !== expectedId) {
                needsUpdate = true;
                break;
            }
        }
        
        if (needsUpdate) {
            for (let i = 0; i < rows.length; i++) {
                const newEmpId = 'EMP' + (i + 1).toString().padStart(3, '0');
                if (rows[i].employee_id !== newEmpId) {
                    await db.query('UPDATE employees SET employee_id = ? WHERE id = ?', [newEmpId, rows[i].id]);
                    rows[i].employee_id = newEmpId;
                }
            }
        }
        
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addEmployee = async (req, res) => {
    const { name, email, phone, department, designation, salary } = req.body;
    try {
        // 1. Create User account for login
        const defaultPassword = 'password123';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        
        const [userResult] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 'Employee']
        );
        const userId = userResult.insertId;

        // Auto-assign the next sequential ID
        const [empCountRows] = await db.query('SELECT COUNT(*) as count FROM employees');
        const nextIdNum = empCountRows[0].count + 1;
        const employee_id = 'EMP' + nextIdNum.toString().padStart(3, '0');

        // 2. Create Employee record
        const [empResult] = await db.query(
            'INSERT INTO employees (employee_id, name, email, phone, department, designation, salary, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [employee_id, name, email, phone, department, designation, salary, userId]
        );

        res.status(201).json({ message: 'Employee added successfully', id: empResult.insertId });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email or Employee ID already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editEmployee = async (req, res) => {
    const empId = req.params.id;
    const { employee_id, name, email, phone, department, designation, salary } = req.body;
    
    try {
        // Find employee to get user_id
        const [empRows] = await db.query('SELECT user_id FROM employees WHERE id = ?', [empId]);
        if (empRows.length === 0) return res.status(404).json({ message: 'Employee not found' });
        
        const userId = empRows[0].user_id;

        // Update employee
        await db.query(
            'UPDATE employees SET employee_id=?, name=?, email=?, phone=?, department=?, designation=?, salary=? WHERE id=?',
            [employee_id, name, email, phone, department, designation, salary, empId]
        );

        // Update user
        if (userId) {
            await db.query('UPDATE users SET name=?, email=? WHERE id=?', [name, email, userId]);
        }

        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteEmployee = async (req, res) => {
    const empId = req.params.id;
    try {
        const [empRows] = await db.query('SELECT user_id FROM employees WHERE id = ?', [empId]);
        if (empRows.length === 0) return res.status(404).json({ message: 'Employee not found' });
        
        const userId = empRows[0].user_id;

        // Delete from employees
        await db.query('DELETE FROM employees WHERE id = ?', [empId]);

        // Delete from users
        if (userId) {
            await db.query('DELETE FROM users WHERE id = ?', [userId]);
        }

        // Reassign employee IDs to make them continuous
        const [allEmps] = await db.query('SELECT id FROM employees ORDER BY id ASC');
        for (let i = 0; i < allEmps.length; i++) {
            const newEmpId = 'EMP' + (i + 1).toString().padStart(3, '0');
            await db.query('UPDATE employees SET employee_id = ? WHERE id = ?', [newEmpId, allEmps[i].id]);
        }

        res.status(200).json({ message: 'Employee deleted successfully and IDs updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOwnProfile = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees WHERE user_id = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Profile not found' });
        
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateOwnProfile = async (req, res) => {
    const { name, phone } = req.body; // Usually employees can only update name/phone/address, not salary or role
    try {
        await db.query('UPDATE employees SET name=?, phone=? WHERE user_id=?', [name, phone, req.user.id]);
        await db.query('UPDATE users SET name=? WHERE id=?', [name, req.user.id]);
        
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllEmployees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    getOwnProfile,
    updateOwnProfile
};
