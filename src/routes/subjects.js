const express = require('express');
const router = express.Router();
const db = require('../db');

//Get all subjects for front page
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            subjects.id,
            subjects.icon,
            subjects.title,
            COUNT(topics.id) AS topic_count
        FROM subjects
        LEFT JOIN topics ON topics.subject_id = subjects.id
        GROUP BY subjects.id;
        `;
    db.query(sql, (err, results) => {
        if(err){
            res.status(500).json({ error: 'Database query error.' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;