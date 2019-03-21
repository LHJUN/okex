'use strict';

const UserController = require('../controllers/user.server.controller');

module.exports = function (app) {
  app.route('/api/user/list').get(UserController.list);
};
