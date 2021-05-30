const path = require('path');
const router = require('express').Router();
const fs = require('fs');



router.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + "/db/db.json", 'utf8',  (note)=> {
        res.json(JSON.parse(note))
})
});


router.post('/api/notes', (req, res) => {
    fs.writeFile(__dirname + "/db/db.json", 'utf8',  (note)=> {
        let newNote = req.body.id;
            note.push(newNote);
            updateDb();
})
});


router.get("/api/notes/:id", (req,res)=> {
    fs.readFile(__dirname + "/db/db.json", 'utf8',  (note)=> {
    res.json(note[req.params.id]);
})
});


router.delete("/api/notes/:id", (req, res)=> {
    fs.writeFile(__dirname + "/db/db.json", 'utf8',  (note)=> {
        note.splice(req.params.id);
            updateDb();
})
});


function updateDb() {
    fs.writeFile(__dirname +"db/db.json",JSON.stringify(note,'\t'),err => {
        if (err) throw err;
        return true;
    });
}
module.exports = router;
