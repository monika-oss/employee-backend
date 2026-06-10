const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isEmployee } = require('../middleware/auth');
const employeeController = require('../controllers/employeeController');

// Middleware for all employee routes
router.use(verifyToken);

// --- ADMIN ROUTES ---

// Get all employees
router.get('/', isAdmin, employeeController.getAllEmployees);

// Add new employee
router.post('/', isAdmin, employeeController.addEmployee);

// Edit employee
router.put('/:id', isAdmin, employeeController.editEmployee);

// Delete employee
router.delete('/:id', isAdmin, employeeController.deleteEmployee);

// --- EMPLOYEE ROUTES ---

// Get own profile
router.get('/profile/me', isEmployee, employeeController.getOwnProfile);

// Update own profile (limit what they can update)
router.put('/profile/me', isEmployee, employeeController.updateOwnProfile);

module.exports = router;
