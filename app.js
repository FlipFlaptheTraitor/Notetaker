const express = require("express");
const fs = require("fs");
const path = require('path');

const PORT = process.env.PORT || 3001;


const app = express();


app => {
  fs.readFile("db/db.json","utf8", (err, data) => {
      if (err) throw err;
      
      var notes = JSON.parse(data);

      // Setup the route
      app.get("/api/notes", function(req, res) {
          res.json(notes);
      });

      // Setup the /api/notes post route
      app.post("/api/notes", function(req, res) {
          let newNote = req.body;
          notes.push(newNote);
          updateDb();
          return console.log("Added new note: "+newNote.title);
      });

      // grabs note by id
      app.get("/api/notes/:id", function(req,res) {
          res.json(notes[req.params.id]);
      });

      // Deletes note
      app.delete("/api/notes/:id", function(req, res) {
          notes.splice(req.params.id, 1);
          updateDb();
          console.log("Deleted note with id "+req.params.id);
      });

      // Display notes and index html
      app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "../notes.html"));
    });
    
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../index.html"));
    });

      //updates db
      function updateDb() {
          fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
              if (err) throw err;
              return true;
          });
      }

  });

}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});  