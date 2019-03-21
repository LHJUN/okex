'use strict';

const db = require('../utils/mysql');

exports.list = function(callback) {
  db.query('select * from users', function(err, rows) {
    if (err) {
      console.log(err);
      return;
    }
    callback(err, rows)
  });
};
