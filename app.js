const express = require("express");
const path = require("path");
const fs = require("fs")

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;


// HTML Routes

// Basic route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,  "/public/index.html"));
  });
  
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname,  "/public/notes.html"));
  
  });
  
  fs.readFile(__dirname+"/db/db.json","utf8", (err, data) => {
    if (err) throw err;
    
    var notes = JSON.parse(data);

    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });

    // Deletes note
    app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Deleted note with id "+req.params.id);
    });


    //updates db
    function updateDb() {
        fs.writeFile(__dirname+"/db/db.json",JSON.stringify(notes),err => {
            if (err) throw err;
            return true;
        });
    }

});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });  

 