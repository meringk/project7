var express = require('express'),
    path = require('path'),
    multer = require('multer'),
    multerS3 = require('multer-s3')
    router = express.Router();

const AWS = require('aws-sdk');
var db = require('../../lib/pgDb.js');
var writeService = require('../service/write_service.js');

AWS.config.loadFromPath(path.resolve(__dirname, '../../resources/awsConfig.json'));

const s3 = new AWS.S3();

let storage = multerS3({
    s3: s3,
    bucket: 'mering',
    acl: 'public-read',
    storageClass: 'REDUCED_REDUNDANCY',
    metadata: function (req, file, cb) {
        
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        var date = new Date();
        var d = date.getDate(),
            h = date.getHours(),
            s = date.getSeconds();
        var folderNm = d+""+h+""+s
        let path1 = folderNm + '/' + file.originalname;
        cb(null, path1);
    }
});

var upload = multer({ storage: storage });

router.use(multer({
    storage: storage
}).any());

router.post('/upload', upload.single('FILE_TAG'), function (req, res) {

    res.send(req.files);
});


//blog 글저장하기
router.post('/blogWrite', function (req, res) {
    var writeParam = req.body;
    console.log(writeParam);

    writeService.insertBlogWrite(writeParam)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            res.send(error);
        });
});

//study 글저장하기
router.post('/studyWrite', function (req, res) {
    var writeParam = req.body;
    console.log(writeParam);

    writeService.insertStudyWrite(writeParam)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            res.send(error);
        });
});

//study 글 수정하기
router.post('/studyModify', function (req, res) {
    var writeParam = req.body;
    console.log(writeParam);

    writeService.updateStudyModify(writeParam)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            res.send(error);
        });
});


//blog 글 수정하기
router.post('/blogModify', function (req, res) {
    var writeParam = req.body;
    console.log(writeParam);

    writeService.updateBlogModify(writeParam)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            res.send(error);
        });
});




module.exports = router;
