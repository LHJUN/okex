'use strict';
const MockData = require('../utils/mock.data');
const CookieUtils = require('../utils/cookie.utils');
const UserService = require('../services/user.server.service');

exports.login = async function(req, res) {
  let user = await UserService.findUser(req.body.username);
  if(user[0].password === req.body.password){
    req.session.user = user[0];
    return res.json({"status":1,"success":"登录成功", user: user[0]});
  }
  return res.json({"status":0,"failed":"登录失败"});
};

exports.logout = function(req, res) {
  CookieUtils.clearSessionId(res);
  return res.json({"status":1,"success":"退出成功"});
};

exports.adminInfo = function(req, res) {
  return res.json({"status":1,"data": {id: 1, name: 'test', status: 'active'}});
};

exports.userCount = function(req, res) {
  return res.json({"status":1,"count":MockData.mockUsers().length});
};

exports.checkSession = function(req, res) {
  const sessionValue = CookieUtils.getSessionId(req)
  if (sessionValue) {
    return res.json({status: 'success', user: {id: 1, name: 'test', status: 'active'}});
  } else {
    return res.json({status: 'failed'});
  }
};

exports.list = async function(req, res) {
  return res.json(await UserService.listUsers());
};


exports.resigt = async function (req,res) {
  let user = {};
  user.username = req.body.username;
  user.password = req.body.password;
  await UserService.addUser(user,function (err) {
    if(err){
      return res.json({status: 'failed'});
    }
    return res.json({status: 'success'});
  });
  
};
