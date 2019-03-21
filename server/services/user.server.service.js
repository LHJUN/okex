'use strict';

const userModel = require('../models/user.server.model')

exports.listUsers = function(callback) {
  userModel.list(callback);
};

