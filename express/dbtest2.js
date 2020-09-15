const sqlite3 = require("sqlite3").verbose();
var data = [],
  records = [];
let db = new sqlite3.Database("stockx.db");
// gets all data from ProductActivity table
// let sql = "SELECT * FROM PRODUCTACTIVITY";
function getRecords() {
  return new Promise((resolve) => {
    db.all("SELECT * FROM PRODUCTACTIVITY", [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      rows.forEach((row) => {
        data.push(row);
      });

      resolve(data);
    });
  });
}

async function asyncCall() {
  records = await getRecords();

  records.forEach((e) => {
    console.log(e);
  });
}

asyncCall();

console.log(data[0]);
