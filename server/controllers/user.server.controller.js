'use strict';
const UserService = require('../services/user.server.service');


exports.list = function(req, res) {
  UserService.listUsers(function(err, data) {
    res.json(data);
  });
};
