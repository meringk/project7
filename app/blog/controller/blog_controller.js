var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var blogService = require('../service/blog_service.js');


// 글 리스트 불러오기
router.post('/selectBlogList', function (req, res) {
    var param = req.body;
    blogService.selectBlogList(param)
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});


// 글 상세정보 가져오기
router.post('/selectBlogContent', function (req, res) {
    console.log("PARAM");
    var param = req.body;
    console.log(param)
    blogService.selectBlogContent(param)
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});







module.exports = router;
