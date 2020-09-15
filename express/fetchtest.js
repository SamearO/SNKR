// // function filters sales that are already in the database, using the sale data from the api as a parameter
// var filtered = [];
// const filter = (obj, callback) => {
//   // import sqlite module
//   const sqlite3 = require("sqlite3").verbose();
//   // initialise db to stockx database
//   let db = new sqlite3.Database("stockx.db");
//   // initialise filtered array as empty
//   // initialise sql to all records in the ProductActivity table
//   let sql = "SELECT * FROM PRODUCTACTIVITY";
//   // db.all function allows you to use all rows in the table as a paramater
//   db.all(sql, [], (err, rows) => {
//     callback(rows, obj);
//   });
//   db.close();
//   //   console.log(filtered);
// };

// // var filtered = [];
// function compareId(rows, obj) {
//   // nested for loop loops over every possible combination of chainId in the database and the data from the api such that it populates an array with all sales from the api that are not already in the database
//   // first for loop for the data from the api
//   for (var i = 0; i < obj.length; i++) {
//     // initialise doesexist to false at the start of the initial for loop
//     var doesexist = false;
//     // second for loop for the rows in the database
//     for (var k = 0; k < rows.length; k++) {
//       // if statement that checks if chainId's equal each other
//       if (obj[i]["chainId"] == rows[k]["ProductActivty_chainId"]) {
//         // set doesexist to true if two sales have the same chainId (indicating to not put that sale in the database)
//         doesexist = true;
//       }
//     }
//     //if no chainId's are found to be the same, push that sale onto the filtered array
//     if (doesexist == false) {
//       filtered.push(obj[i]);
//       // console.log(i, obj[i]);
//     }
//   }
//   // close the database
//   // return the filtered array
// }

// function updatedb(apidata) {
//   const sqlite3 = require("sqlite3").verbose();
//   let db = new sqlite3.Database("stockx.db");
//   let datatoinsert = [
//     apidata[i].chainId,
//     apidata[i].amount,
//     apidata[i].createdAt,
//     apidata[i].shoeSize,
//     apidata[i].productId,
//     apidata[i].skuUuid,
//     apidata[i].state,
//     apidata[i].localAmount,
//     apidata[i].localCurrency,
//   ];
//   let sql =
//     "INSERT INTO PRODUCTACTIVITY(ProductActivity__chainId,ProductActivity__amount,ProductActivity__createdAt,ProductActivity__shoeSize,ProductActivity__productId,ProductActivity__skuUuid,ProductActivity__state,ProductActivity__localAmount,ProductActivity__localCurrency) VALUES (?,?,?,?,?,?,?,?,?)";
//   for (var i = 0; i < apidata.length - 1; i++) {
//     db.serialize(function () {
//       db.run(sql, datatoinsert, function (err) {
//         if (err) throw err;
//       });
//     });
//   }
// }

// function fetchsales() {
//   var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//   const xhr = new XMLHttpRequest();
//   const url =
//     "https://stockx.com/api/products/e2213059-bad6-4a09-8b3f-e78fe4013256/activity?state=480&currency=GBP&limit=100&page=1&sort=createdAt&order=DESC&country=GB";
//   xhr.open("GET", url);
//   xhr.setRequestHeader(
//     "user-agent",
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
//   );
//   xhr.send();
//   // function executes when the ready state is changed
//   xhr.onreadystatechange = (e) => {
//     // if the request is done and the server is returning an ok response then execute
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       // initialise myobj to the json response to the API
//       var myobj = JSON.parse(xhr.responseText)["ProductActivity"];
//       // set datatoadd to filtered data
//       filter(myobj, compareId);
//       console.log(myobj[1]);
//       //   console.log("after filter", datatoadd);
//     } else {
//       console.log("Server Error:", xhr.status);
//     }
//   };
// }

// // fetchsales();

// function updatedbfromapi() {
//   var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//   const xhr = new XMLHttpRequest();
//   const url =
//     "https://stockx.com/api/products/e2213059-bad6-4a09-8b3f-e78fe4013256/activity?state=480&currency=GBP&limit=100&page=1&sort=createdAt&order=DESC&country=GB";
//   xhr.open("GET", url);
//   xhr.setRequestHeader(
//     "user-agent",
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
//   );
//   xhr.send();
//   // function executes when the ready state is changed
//   xhr.onreadystatechange = (e) => {
//     // if the request is done and the server is returning an ok response then execute
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       // initialise myobj to the json response to the API
//       var myobj = JSON.parse(xhr.responseText)["ProductActivity"];
//       var datatoadd;
//       // import sqlite module
//       const sqlite3 = require("sqlite3").verbose();
//       // initialise db to stockx database
//       let db = new sqlite3.Database("stockx.db");
//       // initialise filtered array as empty
//       const filtered = [];
//       // initialise sql to all records in the ProductActivity table
//       let sql = "SELECT * FROM PRODUCTACTIVITY";
//       // db.all function allows you to use all rows in the table as a paramater
//       db.all(sql, [], (err, rows) => {
//         // nested for loop loops over every possible combination of chainId in the database and the data from the api such that it populates an array with all sales from the api that are not already in the database
//         // first for loop for the data from the api
//         for (var i = 0; i < myobj.length; i++) {
//           // initialise doesexist to false at the start of the initial for loop
//           var doesexist = false;
//           // second for loop for the rows in the database
//           for (var k = 0; k < rows.length; k++) {
//             // if statement that checks if chainId's equal each other
//             if (myobj[i]["chainId"] == rows[k]["ProductActivty_chainId"]) {
//               // set doesexist to true if two sales have the same chainId (indicating to not put that sale in the database)
//               doesexist = true;
//             }
//           }
//           //if no chainId's are found to be the same, push that sale onto the filtered array
//           if (doesexist == false) {
//             filtered.push(myobj[i]);
//             // console.log(i, obj[i]);
//           }
//         }
//         // close the database
//         db.close();
//         // return the filtered array
//         console.log("filtered length:", filtered.length);
//         console.log("api length", myobj.length);
//       });
//     } else {
//       console.log("Server Error:", xhr.status);
//     }
//   };
// }

// updatedbfromapi();
