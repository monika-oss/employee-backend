const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initRemoteDb() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        ssl: { rejectUnauthorized: false },
        multipleStatements: true
    });

    console.log('Connecting with Config:');
    console.log('- Host:', process.env.DB_HOST);
    console.log('- User:', process.env.DB_USER);
    console.log('- Port:', process.env.DB_PORT);
    console.log('- Database:', process.env.DB_NAME);
    
    try {
        console.log('Connecting to Aiven Database...');
        const sql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
        
        // Remove the CREATE DATABASE and USE statements as Aiven doesn't allow CREATE DATABASE
        let modifiedSql = sql.replace(/CREATE DATABASE IF NOT EXISTS employee;/g, '');
        modifiedSql = modifiedSql.replace(/USE employee;/g, '');
        
        console.log('Executing SQL to create tables...');
        await pool.query(modifiedSql);
        
        console.log('Successfully created tables and default admin user in Aiven Database!');
    } catch (error) {
        console.error('Error initializing remote database:', error);
    } finally {
        await pool.end();
    }
}

initRemoteDb();
