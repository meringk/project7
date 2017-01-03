var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var seApp = require('../../lib/session.js');
var mainService = require('../service/main_service.js');

var g_idx = 0;


//seApp.use(seApp({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// var app = express()
router.set('trust proxy', 1) // trust first proxy
router.use(seApp({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));





//방명록리스트
router.get('/guestList', function(req, res){
   
    console.log("=======SESSION=========");
    console.log(req.session);

     mainService.selectGuestBookList()
        .then(function (data){
            console.log(data);
            //console.log(Object.keys(data).length);
            //console.log(data[Object.keys(data).length-1].g_idx);
            g_idx = data[Object.keys(data).length-1].g_idx;
            //console.log(g_idx);
            res.json(data);
            //data.length();
        })
        .catch(function (err){
            res.json(err);
        });
});

//방명록리스트더보기
router.get('/guestListMore', function(req, res){
     g_idx = (req.url).split('=')[1];
     mainService.selectGuestBookListMore(g_idx)
        .then(function (data){
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
});

//게스트북
router.post('/guestSubmit', function(req, res){
    //console.log("게스트등록");
  var member = req.body;

  mainService.insertGuestSubmit(member)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
      //console.log(error);
        res.send(error);
    });

});



module.exports = router;
