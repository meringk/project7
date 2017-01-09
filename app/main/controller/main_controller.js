var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var mainService = require('../service/main_service.js');
var session = require('express-session');

var g_idx = 0;

router.use(session({
    secret:'secrett',
    resave:false,
    saveUninitialized: false
}));

router.get('/loginSession', function(req, res){
    console.log(req.session)
    res.json(req.session);
});

router.post('/login', function(req, res){
    var param = req.body;
    mainService.login(param)
        .then(function (data){
            req.session.m_userid    = data.m_userid;
            req.session.m_username  = data.m_username;
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
})

router.post('/join', function(req, res){
    var param = req.body;
    mainService.join(param)
        .then(function (data){
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
})



//방명록리스트
router.get('/guestList', function(req, res){
    console.log(req.session.user_id);

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
         console.log(req.session)
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
