'use strict';
const ArticleService = require('../services/article.server.service');

exports.list = async function(req, res) {
    let article = await ArticleService.list();
    return res.json({"status":1,"success":"成功", article: article});
};

exports.add = async function(req, res) {
    await ArticleService.add(req.body,function (err) {
        if(err){
            return res.json({status: 'failed'});
        }
        return res.json({status: 'success'});
    });

};
