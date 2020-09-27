import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import {updateDbFromApi2, updateDbFromApi1} from "./ApiLink.js"
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require("cors");
const { response } = require("express");
app.use(cors()); // Use this after the variable declaration

// code for my api endpoint that displays data from my database
app.get("/api/sales", (req, res) => {
  const sqlite3 = require("sqlite3").verbose();
  // open the database
  let db = new sqlite3.Database("stockx.db");
  // gets all data from ProductActivity table
  let sql = "SELECT * FROM PRODUCTACTIVITY";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send({ express: rows });
  });
  // close the database connection
  db.close();
  // res.send({ express: hello() });
});

app.get("/api/attributes", (req, res) => {
  const sqlite3 = require("sqlite3").verbose();
  // open database
  let db = new sqlite3.Database("stockx.db")
  // gets all data from Product table
  let sql = "SELECT * FROM PRODUCT"
  db.all(sql, [], (err, rows) => {
    if (err){
      throw err
    }
    res.send({attributes: rows});
  })
  // close the database connection
  db.close();

})

// post api route
app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

// this block of code automatically updates the database every hour and every 50 minutes
const names = ["air-jordan-1-retro-high-light-smoke-grey", "air-jordan-1-retro-high-satin-snake-chicago-w", "air-jordan-1-retro-high-bred-toe", "nike-dunk-low-samba-2020", "adidas-yeezy-boost-350-v2-zyon"]
setTimeout(function() {
  updateDbFromApi1(names)
}, 1000 * 5);
setTimeout(function() {
  updateDbFromApi2()
}, 1000 * 60);
setInterval ( function() { 
  updateDbFromApi2()
}, 1000 * 60 * 60);
setInterval ( function() { 
  updateDbFromApi1(names)
}, 1000 * 60 * 50);


// when server is started, logs this message on the console
app.listen(port, () => console.log(`Server Started On: ${port}`));

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);
