var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes

// Basic route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,  "/public/index.html"));
  });
  
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname,  "/public/notes.html"));
  
  });
  
  fs.readFile("db/db.json","utf8", (err, data) => {
    if (err) throw err;
    
    var notes = JSON.parse(data);

    // Setup the route
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    // Setup the /api/notes post route
   
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


    //updates db
    function updateDb() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
        });
    }

});
  
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });  