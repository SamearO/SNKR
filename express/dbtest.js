// function sqldata() {
//   const sqlite3 = require("sqlite3").verbose();
//   // open the database
//   let db = new sqlite3.Database("stockx.db");
//   // gets all data from ProductActivity table

//   let sql = "SELECT * FROM PRODUCTACTIVITY";
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       return err;
//     }
//     return rows;
//   });
//   // close the database connection
//   db.close();
// }

exports.getData = async () => {
  const sqlite3 = require("sqlite3").verbose();
  // open the database
  let db = new sqlite3.Database("stockx.db");
  // gets all data from ProductActivity table

  let sql = "SELECT * FROM PRODUCTACTIVITY";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return err;
    }
    return rows;
  });
  // close the database connection
  db.close();
};
