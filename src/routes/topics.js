const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to fetch topics by subject
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

// New route to fetch topic title by topic ID
router.get('/title/:topicId', (req, res) => {
    const { topicId } = req.params;
    console.log(`Fetching title for topic ID: ${topicId}`);
    
    const sql = `SELECT title FROM topics WHERE id = ?`;

    db.query(sql, [topicId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        if (results.length === 0) {
            console.log(`No topic found for ID: ${topicId}`);
            return res.status(404).json({ success: false, message: 'Topic not found.' });
        }

        console.log(`Fetched topic title:`, results[0]);
        res.json(results[0]);
    });
});

module.exports = router;
