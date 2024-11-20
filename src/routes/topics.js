const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:subject', (req, res) => {
    const { subject } = req.params;
    console.log(`Fetching topics for subject: ${subject}`);
    
    const sql = `
        SELECT topics.id, topics.title, topics.description
        FROM topics
        JOIN subjects ON topics.subject_id = subjects.id
        WHERE subjects.title = ?;            
    `;

    db.query(sql, [subject], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        if (results.length === 0) {
            console.log(`No topics found for subject: ${subject}`);
            return res.status(404).json({ success: false, message: 'No topics found for the specified subject.' });
        }

        console.log(`Fetched topics:`, results);
        res.json(results);
    });
});

module.exports = router;
