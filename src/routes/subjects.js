const express = require('express');
const router = express.Router();
const db = require('../db');

//Get all subjects
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM subjects';
    db.query(sql, (err, results) => {
        if(err){
            res.status(500).json({ error: 'Database query error.' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;