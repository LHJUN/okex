'use strict';
  const mongoose = require('mongoose');
const BaoBaoName = mongoose.model('BaoBaoName');

exports.list = async function(page) {
  return BaoBaoName.find({});
};

exports.listByPage = async function({ pageIndex, pageSize }) {
  return {
    total: await BaoBaoName.find({}).count(),
    names: await BaoBaoName.find({}).skip((pageIndex || 0) * (pageSize || 0)).limit(pageSize || 0)
  }
};

exports.findAllByNameLike = async function(nameContains) {
  return {
    names: await BaoBaoName.find({
      label: { $regex: new RegExp(nameContains, 'i') }
    }).limit(6)
  }
};

exports.findByName = async function(name) {
  return BaoBaoName.find({
    label: name
  });
};

exports.add = async function(babyName, callback) {
  let _babyName = new BaoBaoName();
  for (let key in babyName) {
    _babyName[key] = babyName[key];
  }
  _babyName.save(function(err) {
    callback(err);
  });
};

