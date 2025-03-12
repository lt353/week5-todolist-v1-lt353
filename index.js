const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Data for the lists
let personal = ["Lindsay", "Trenton", "Hawaii", "USA"];
let zodiac = ["Lindsay", "Trenton", "Scorpio", "Topaz"];

// Home Page Route
app.get("/", function(req, res) {
  res.render("home");
});

// Personal Information Route
app.get("/Personal", function(req, res) { 
  res.render("list", { listTitle: "Personal Information", newListItems: personal });
});

// Zodiac Information Route
app.get("/Zodiac", function(req, res) {
  res.render("list", { listTitle: "Zodiac & Birthstone", newListItems: zodiac });
});

// Start Server
app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
