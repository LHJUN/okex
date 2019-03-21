const db = {};
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'nodejs'
});

db.query = function(sql, callback){

  if (!sql) {
    callback();
    return;
  }
  pool.query(sql, function(err, rows, fields) {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    };

    callback(null, rows, fields);
  });
}
module.exports = db;
