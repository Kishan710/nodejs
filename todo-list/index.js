const express = require("express");
const app = express();
const PORT = 6060;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let array = [];
app.get("/", (req, res) => {
  return res.render("home", { array });
});

app.post("/add", (req, res) => {
  array.push(req.body);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  array = array.filter((element, index) => index != req.params.id);
  res.redirect("/");
});              

app.get("/edit/:id", (req, res) => {
  let updateAarry = array[req.params.id];
  return res.render("edit", { updateAarry, updateId: req.params.id });
});

app.post("/update", (req, res) => {
  let { updateId, task } = req.body;
  array[updateId] = { task };
  return res.redirect("/");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("server is not running", PORT);
    return;
  }
  console.log("server is running", PORT);
});