const express = require('express'); 
const router = express.Router(); 
const db = require('../db');

router.get('/:topicId', (req, res) => {
    const { topicId } = req.params;
    console.log(`Fetching lessons for topic ID: ${topicId}`);
    
    const sql = `
        SELECT lessons.id, lessons.title, lessons.description, lessons.video_url
        FROM lessons
        WHERE lessons.topic_id = ?;
    `;

    db.query(sql, [topicId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        if (results.length === 0) {
            console.log(`No lessons found for topic ID: ${topicId}`);
            return res.status(404).json({ success: false, message: 'No lessons found for the specified topic.' });
        }

        console.log(`Fetched lessons:`, results);
        res.json(results);
    });
});

module.exports = router;
