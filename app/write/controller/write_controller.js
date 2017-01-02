var express = require('express');
var router = express.Router();
var db = require('../../lib/pgDb.js');
var writeService = require('../service/write_service.js');

//blog 글저장하기
router.post('/blogWrite', function(req, res){
  var writeParam = req.body;
  console.log(writeParam);

  writeService.insertBlogWrite(writeParam)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
        res.send(error);
    });
});

//study 글저장하기
router.post('/studyWrite', function(req, res){
  var writeParam = req.body;
  console.log(writeParam);

  writeService.insertStudyWrite(writeParam)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
        res.send(error);
    });
});

//study 글 수정하기
router.post('/studyModify', function(req, res){
  var writeParam = req.body;
  console.log(writeParam);

  writeService.updateStudyModify(writeParam)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
        res.send(error);
    });
});


//blog 글 수정하기
router.post('/blogModify', function(req, res){
  var writeParam = req.body;
  console.log(writeParam);

  writeService.updateBlogModify(writeParam)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
        res.send(error);
    });
});



module.exports = router;
