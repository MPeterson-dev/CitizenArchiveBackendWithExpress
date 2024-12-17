const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch comments for a lesson
router.get('/:lessonId', (req, res) => {
    const { lessonId } = req.params;
    const sql = `SELECT * FROM comments WHERE lesson_id = ? ORDER BY created_at ASC`;

    db.query(sql, [lessonId], (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.json(results);
    });
});

// Add a new comment to a lesson
router.post('/', (req, res) => {
    const { lesson_id, username, text } = req.body;

    // Reject the request if username or text is missing
    if (!username || !text) {
        return res.status(400).json({ success: false, message: 'Username and comment text are required.' });
    }

    const sql = `INSERT INTO comments (lesson_id, username, text) VALUES (?, ?, ?)`;

    db.query(sql, [lesson_id, username, text], (err, results) => {
        if (err) {
            console.error('Error adding comment:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.json({ success: true, message: 'Comment added successfully.' });
    });
});

module.exports = router;
