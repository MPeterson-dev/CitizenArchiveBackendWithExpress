const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

router.post('/', async (req, res) => {
    console.log("Register route hit:", req.body); // Log the incoming request body
    const { first_name, last_name, email, password } = req.body;
    const isAdmin = false; // Default admin status to false
    const createdAt = new Date(); // Set created_at timestamp

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `
            INSERT INTO users (first_name, last_name, email, password, created_at, is_admin)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [first_name, last_name, email, hashedPassword, createdAt, isAdmin], (err, results) => {
            if (err) {
                console.error("Database error during registration:", err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ success: false, message: 'Email already registered.' });
                }
                return res.status(500).json({ success: false, message: 'Database error.' });
            }
            res.status(201).json({ success: true, message: 'Registration successful.' });
        });
    } catch (error) {
        console.error("Server error during registration:", error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
