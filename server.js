// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var myJson = require("./db/db.json");
let notes = [{
}];


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
// =============================================================
// Basic routes that send the user to the notes home page and notes edit page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

// // API Routes
// // =============================================================
// // Displays all notes
// app.get("/api/notes", function(req, res) {
//     res.json(notes);
// });

// // post routes
// app.post("/api/notes", function(req, res) {
//     notes.push(req.body)
//     res.json(true);
//     console.log(res.location);
// });
// =================================================================
// API's
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        return res.json(notes);
    })
});


app.post("/api/notes", function (req, res) {

    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        var newNote = req.body;
        var timeStamp = new Date();
        newNote.id = timeStamp;
        notes.push(newNote);

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (err, data) {
            if (err) throw err;
            console.log(newNote);
            res.json(newNote);
        })
    })
});

app.delete("/api/notes/:id", function (req, res) {
    //get the id out of the req.
    let notesID = req.params.id.toString();
    console.log(notesID);
    //get all the notes out of the database.
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        let filteredNotes = notes.filter((note) => { return note.id !== notesID })
        console.log(filteredNotes);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(filteredNotes), function (err, data) {
            if (err) throw err;
            
            res.json(filteredNotes);
        })
    });
});


// listens for server
app.listen(PORT, function () {
    console.log("App listening on PORT: http://localhost:" + PORT);
});