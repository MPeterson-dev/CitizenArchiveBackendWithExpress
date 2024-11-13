const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const isAdmin = false; // Default admin status to false for regular users
    const createdAt = new Date(); // Set created_at to the current date and time

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (first_name, last_name, email, password, is_admin, created_at) VALUES (?,?,?,?,?,?)';
        db.query(sql, [first_name, last_name, email, hashedPassword, isAdmin, createdAt], (err, results) => {
            if (err) {
                console.error("Database error during registration:", err); // Log detailed error
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.json({ success: false, message: 'Email already registered.' });
                }
                return res.status(500).json({ success: false, message: 'Database error.' });
            }
            res.json({ success: true, message: 'Registration successful.' });
        });
    } catch (error) {
        console.error("Server error during registration:", error); // Log server error
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
