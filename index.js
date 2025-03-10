//jshint esversion:6

/*
 * Assignment: To-do List with Multiple Categories
 * Description: 
 * - This is a simple To-Do List app using Express, and EJS.
 * - The original code was provided by the professor and included a default to-do list and a work list.
 * - I added functionality for two new categories: Fun and Weekend.
 * - Now, users can manage different types of tasks under separate lists.
 * 
 * Author: Debasis Bhattacharya mostly
 *         Lindsay Trenton for just the parts that create /fun and /weekend
 * Date: February 11, 2025
 * 
 * External Packages Used:
 * - express (http://www.npmjs.com/package/express)
 * - body-parser (http://www.npmjs.com/package/body-parser)
 * - ejs (https://www.npmjs.com/package/ejs)
 */

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

// Arrays to store items for different lists
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food", "Clean Plates"];
let workItems = ["Show Up", "Get Settled", "Drink Coffee"];
let funItems = ["Go Swimming", "Read a Book", "Watch Severance", "Listen to Music"];
let weekendItems = ["Mow the Lawn", "Go to Costco", "Prep for Next Weeks Class", "Meal Prep"];

// Default route for the main list
app.get("/", function(req, res) {
  res.render("list", { listTitle: "Today", newListItems: items });
});

// Route for the work list
app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

// Route for the fun list
app.get("/fun", function(req, res) {
  res.render("list", { listTitle: "Fun", newListItems: funItems });
});

// Route for the weekend list
app.get("/weekend", function(req, res) {
  res.render("list", { listTitle: "Weekend", newListItems: weekendItems });
});

// Handle form submissions
app.post("/", function(req, res) {
  let item = req.body.newItem;
  let list = req.body.list;

  if (list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else if (list === "Fun") {
    funItems.push(item);
    res.redirect("/fun");
  } else if (list === "Weekend") {
    weekendItems.push(item);
    res.redirect("/weekend");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});