import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import {scraper} from "./ApiLink.js"
const express = require("express");
const bodyParser = require("body-parser");
const spawn = require('child_process').spawn;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require("cors");
const { response } = require("express");
app.use(cors()); // Use this after the variable declaration

let python = spawn(scraper.findInterpreter(), ['./Predictor.py'])
let data = 9 // placeholder for size hook
python.stdin.write(data.toString())
py.stdin.end()

app.get('/api/pytest', (req, res) => {
  const sqlite3 = require("sqlite3").verbose();
  // open the database
  let db = new sqlite3.Database("stockx.db");
  // gets all data from ProductActivity table
  let sql = "SELECT * FROM PREDICTION";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send({ prediction: rows });
  });
  // close the database connection
  db.close();
  // res.send({ express: hello() });
})

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

app.get("/api/series", (req, res) => {
  const sqlite3 = require("sqlite3").verbose();
  // open database
  let db = new sqlite3.Database("stockx.db")
  // gets all data from Product table
  let sql = "SELECT * FROM SERIESSALES"
  db.all(sql, [], (err, rows) => {
    if (err){
      throw err
    }
    res.send({series: rows});
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
console.log("")
setTimeout(function() {
  console.log("")
  scraper.updateDbFromArr(names)
}, 1000 * 5);
setTimeout(function() {
  console.log("")
  scraper.updateDbFromApi2()
}, 1000 * 60);
setTimeout(function() {
  console.log("")
  scraper.updateDbFromSeriesData("af8ae222-4eff-4a2d-b674-c3592efa5252")
}, 1000 * 50);
setTimeout(function() {
  console.log("")
  scraper.updatePrediction()
}, 1000 * 45);
setInterval ( function() { 
  console.log("")
  scraper.updateDbFromApi2()
}, 1000 * 60 * 60);
setInterval ( function() { 
  console.log("")
  scraper.updateDbFromArr(names)
}, 1000 * 60 * 50);
setInterval ( function() { 
  console.log("")
  scraper.updateDbFromSeriesData("af8ae222-4eff-4a2d-b674-c3592efa5252")
}, 1000 * 60 * 45);
setInterval ( function() { 
  console.log("")
  scraper.updatePrediction()
}, 1000 * 60 * 48);

// when server is started, logs this message on the console
app.listen(port, () => console.log(`Server Started On: ${port}`));

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);
