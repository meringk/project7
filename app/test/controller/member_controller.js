var express = require('express');
var router = express.Router();
var db = require('../lib/pgDb.js');
var memberService = require('../services/member_service.js');


//전체조회
router.get('/', function(req, res){
  //res에다가 결과를 넣어줄거다.
    console.log('members');

    // memberService.selectMember(function(data){
    //     console.log('data : ', data);
    // });

     memberService.selectMember()
        .then(function (data){
           // console.log(data);
            res.json(data);
        })
        .catch(function (err){
           // console.log(err);
           res.json(err);
        });
});


//가입
router.post('/', function(req, res){

  var member = req.body;
  console.log(member);

  memberService.insertMember(member)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
      //console.log(error);
      res.send(error);
    });
    
//   var query = 'insert into tb_member values($1, $2, $3)';
//   db.query(query, [id, password, name])
//     .then(function(){
    
// 	var query2 = 'select * from tb_member';
// 	db.query(query2)
// 		.then(function(data){
// 			res.json(data);
// 		})
// 		.catch(function(error){
// 			res.send(error);
// 		});
//     })
//     .catch(function(error){
//       //console.log(error);
//       res.send(error);
//     });

});


//로그인
router.post('/login', function(req, res){
    console.log("login진입");
    var loginInfo = req.body;
     memberService.loginMember(loginInfo)
        .then(function (data){
            console.log(data);
            res.json(data);
        })
        .catch(function (err){
           // console.log(err);
           res.json(err);
        });
});



module.exports = router;
