'use strict';
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

exports.list = async function() {
    return Article.find({}).sort({createAt:-1}).limit(4);
};

exports.add = async function (article,callback) {
    let _article = new Article();
    for(let key in article){
        _article[key] = article[key];
    }
    _article.save(function (err) {
        callback(err);
    });
};

