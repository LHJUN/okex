'use strict';

const UserController = require('../controllers/user.server.controller');
const ArticleController = require('../controllers/article.server.controller');
const BabyNameController = require('../controllers/babyName.server.controller');
module.exports = function (app) {
  app.route('/api/admin/login').post(UserController.login);
  app.route('/api/admin/logout').post(UserController.logout);
  app.route('/api/user/login').post(UserController.login);
  app.route('/api/user/list').get(UserController.list);
  app.route('/api/admin/info').get(UserController.adminInfo);
  app.route('/api/user/count').get(UserController.userCount);
  app.route('/api/user/checkSession').get(UserController.checkSession);
  app.route('/api/admin/regist').post(UserController.resigt);

  app.route('/api/article/list').get(ArticleController.list);
  app.route('/api/article/add').post(ArticleController.add);

  app.route('/api/babyName/list/').get(BabyNameController.list);
  app.route('/api/babyName/page/:page').get(BabyNameController.listByPage);
  app.route('/api/babyName/search').get(BabyNameController.findAllByNameLike);
  app.route('/api/babyName/:name').get(BabyNameController.findByName);
  app.route('/api/babyName/add').post(BabyNameController.add);
};
