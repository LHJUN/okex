'use strict';
const BabyNameService = require('../services/babyName.server.service');

exports.list = async function(req, res) {
    let babyNames = await BabyNameService.list();
    return res.json({"status":1,"success":"成功", babyNames: babyNames});
};

exports.listByPage = async function(req, res) {
  let content = await BabyNameService.listByPage({
    pageIndex: parseInt(req.params.page),
    pageSize: parseInt(req.query.size)
  });
  return res.json({"status":1,"success":"成功", content: content});
};

exports.findByName = async function(req, res) {
  let babyNames = await BabyNameService.findByName(req.params.name);
  return res.json({"status":1,"success":"成功", content: babyNames});
};

exports.findAllByNameLike = async function(req, res) {
  let babyNames = await BabyNameService.findAllByNameLike(req.query.nameContains);
  return res.json({"status":1,"success":"成功", content: babyNames});
}

exports.add = async function(req, res) {
    await BabyNameService.add(req.body,function (err) {
        if(err){
            return res.json({status: 'failed'});
        }
        return res.json({status: 'success'});
    });
};
