const express = require('express'); 
const router = express.Router();    
const db = require('../db');        
const bcrypt = require('bcryptjs'); 


router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            console.log("No user found for email:", email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        console.log("User found:", user);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);

        if (isPasswordValid) {
            console.log("Password valid:", isPasswordValid);    
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    isAdmin: user.is_admin
                }
            });
        }else{
            console.log("Password mismatch for email:", email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

module.exports = router;