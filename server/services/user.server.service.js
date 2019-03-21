// 'use strict';
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
//
// exports.listUsers = async function() {
//   return User.find({});
// };
//
// exports.findUser = async function (username) {
//   return User.find({username : username});
// };
//
//
// exports.addUser = async function (user,callback) {
//   let u = new User();
//   for(let key in user){
//     u[key] = user[key];
//   }
//   u.save(function (err) {
//       callback(err);
//   });
// };
