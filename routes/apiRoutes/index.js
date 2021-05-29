const path = require('path');
const router = require('express').Router();
const fs = require('fs');



router.get('/api/notes', (req, res) => {
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    let newNote = req.body;
    notes.push(newNote);

});


module.exports = router;
