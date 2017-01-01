var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var studyService = require('../service/study_service.js');


// 글 리스트 불러오기
router.post('/selectStudyList', function (req, res) {
    var param = req.body;
    studyService.selectStudyList(param)
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});


// 글 상세정보 가져오기
router.post('/selectStudyContent', function (req, res) {
    console.log("PARAM");
    var param = req.body;
    console.log(param)
    studyService.selectStudyContent(param)
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});





module.exports = router;
