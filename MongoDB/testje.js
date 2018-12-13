const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db;

MongoClient.connect(
  "mongodb://localhost:27017/products",
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("products");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port 3000");
    });
  }
);

app.set("view enginge", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//redirect to list
app.get("/", (req, res) => {
  res.redirect("/list");
});

//List all products
app.get("/list", (req, res) => {
  db.collections("products")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("list.ejs", { products: result });
    });
});

//show the add product form
app.get("/add", (req, res) => {
  res.render("add.ejs", {});
});
