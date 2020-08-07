// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var notes = require("./db/db.json");


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

// API Routes
// =============================================================
// Displays all notes
app.get("/api/notes", function(req, res) {
    res.json(notes);
});

// post routes
app.post("/api/notes", function(req, res) {
    notes.push(req.body)
    res.json(true);
});


// listens for server
app.listen(PORT, function () {
    console.log("App listening on PORT: http://localhost:" + PORT);
});