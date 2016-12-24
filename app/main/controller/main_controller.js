var express = require('express');
var router = express.Router();
var db = require('../lib/pgDb.js');
var mainService = require('../service/main_service.js');


//게스트북
router.post('/guestSubmit', function(req, res){

  var member = req.body;
  console.log(member);

  memberService.insertGuestSubmit(member)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
      //console.log(error);
      res.send(error);
    });

});