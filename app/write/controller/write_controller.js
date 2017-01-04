var express = require('express');
var aws = require('aws-sdk');
var path = require('path');
var multer  = require('multer')
var router = express.Router();
var db = require('../../lib/pgDb.js');
var writeService = require('../service/write_service.js');

aws.config.loadFromPath(path.resolve(__dirname,'../../resources/awsConfig.json'));
const s3 = new aws.S3();

router.use(multer({
    dest:__dirname+'/uploads/'
}).any());

router.post('/upload', function(req,res){

    var file = req.files[0];
    var params = {
            Bucket: 'mering',
            ACL: 'public-read', 
            Key:file.originalname,
            ContentType: file.mimetype,
            Body: JSON.stringify(file),
            StorageClass: 'REDUCED_REDUNDANCY'
     };
    s3.upload(params, (err, data) => {
        if(err){
            console.log(err);
            return res.end();
        }
    });
});



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
