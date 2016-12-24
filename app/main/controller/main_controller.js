var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var mainService = require('../service/main_service.js');

//방명록리스트
router.get('/guestList', function(req, res){
     mainService.selectGuestBookList()
        .then(function (data){
            console.log(data);
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
});

//게스트북
router.post('/guestSubmit', function(req, res){
    console.log("게스트등록");
  var member = req.body;
  console.log(member);

  mainService.insertGuestSubmit(member)
    .then(function(data){
        console.log("data를받아옴");
        res.json(data);
    })
    .catch(function(error){
      //console.log(error);
        res.send(error);
    });

});



module.exports = router;
