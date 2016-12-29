var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var scheduleService = require('../service/schedule_service.js');



//일정가져오기
router.get('/selectSchedule', function(req, res){
     var month = (req.url).split('=')[1];
     console.log("-MM-")
     console.log(month)
     scheduleService.selectSchedule(month)
        .then(function (data){
            console.log(data);
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
});

//일정저장하기
router.post('/insertSchedule', function(req, res){
  var schedule = req.body;
  console.log(schedule);

  scheduleService.insertSchedule(schedule)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
        res.send(error);
    });

});

module.exports = router;
