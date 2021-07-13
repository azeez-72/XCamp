const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});

const db = mongoose.connection;

const PORT = 3000;

app.set("views", path.join(__dirname, "/views")); //append views to cwd(when running from different directory)
app.set("view engine", "ejs"); //configure express with ejs

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/makecampground", (req, res) => {
  
})

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
