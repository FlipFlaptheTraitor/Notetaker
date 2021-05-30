const router = require('express').Router();
const fs = require("fs")
const uniqid = require('uniqid');
const path = require('path');

router.get('/notes', (req, res) => {
  fs.readFile(__dirname + "../../../db/db.json", 'utf8', function (error, data) {
    if (error) {
      return error
    }
    res.json(JSON.parse(data))
  })
});


router.post("/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uniqid();
  saveNote = JSON.parse(fs.readFileSync(__dirname + "../../../db/db.json", "utf8"));
  saveNote.push(newNote);
  fs.writeFileSync(
    path.join(__dirname + "../../../db/db.json",),
    JSON.stringify(saveNote)
  );
  res.json(newNote);
});

module.exports = router;