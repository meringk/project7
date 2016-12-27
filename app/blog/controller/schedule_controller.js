var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var scheduleService = require('../service/schedule_service.js');



//방명록리스트더보기
router.get('/selectSchedule', function(req, res){
     var month = (req.url).split('=')[1];
     scheduleService.selectSchedule(month)
        .then(function (data){
            console.log(data);
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
});


module.exports = router;
