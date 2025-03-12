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

// Note to just see how it works to push to dgithub from here

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
let items = [
  "Buy Food",
  "Prepare Food",
  "Cook Food",
  "Eat Food",
  "Clean Plates",
];
let workItems = ["Show Up", "Get Settled", "Drink Coffee"];
let funItems = [
  "Go Swimming",
  "Read a Book",
  "Watch Severance",
  "Listen to Music",
];
let weekendItems = [
  "Mow the Lawn",
  "Go to Costco",
  "Prep for Next Weeks Class",
  "Meal Prep",
];

// Default route for the main list
app.get("/", function (req, res) {
  // The list title is "Today" and the items are the default items
  // res.render is used to render the list.ejs template
  // The second argument is an object with two properties: listTitle and newListItems
  res.render("list", { listTitle: "Today", newListItems: items });
});

// Route for the work list
app.get("/work", function (req, res) {
  // it only has "Work" but it that is because the list title starts with Work,
  // the complete title is "Work Tasks"
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

// Route for the fun list
app.get("/fun", function (req, res) {
  // it only has "Fun" but it that is because the list title starts with Fun,
  // the complete title is "Fun Things to Do"
  res.render("list", { listTitle: "Fun", newListItems: funItems });
});

// Route for the weekend list
app.get("/weekend", function (req, res) {
  // it only has "Weekend" but it that is because the list title starts with Weekend,
  // the complete title is "Weekend Plans"
  res.render("list", { listTitle: "Weekend", newListItems: weekendItems });
});

// Handle form submissions
app.post("/", function (req, res) {
  let item = req.body.newItem; // Get the new item from the form
  let list = req.body.list; // Get the list name from the form

  // Add the new item to the appropriate list
  if (list === "Work") {
    workItems.push(item); // Push adds the new item to the end of the array
    res.redirect("/work"); // Redirect, meaning it will go to the /work route
  } else if (list === "Fun") {
    funItems.push(item);
    res.redirect("/fun");
  } else if (list === "Weekend") {
    weekendItems.push(item);
    res.redirect("/weekend");
  } else {
    // Default to the main list
    items.push(item);
    res.redirect("/");
  }
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
