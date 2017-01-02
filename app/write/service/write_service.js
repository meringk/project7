var db = require('../../lib/pgDb.js');
var writeService = {
    insertBlogWrite: insertBlogWrite,
    insertStudyWrite: insertStudyWrite,
    updateStudyModify: updateStudyModify,
    updateBlogModify:updateBlogModify

}

//Blog 글등록
function insertBlogWrite(param) {

    console.log(param)
    return new Promise(function (resolve, reject) {
        var query = "insert into tb_blog_board (cont_category, cont_num, cont_title, cont_content, cont_regdate) values($1, (select max(cont_num)+1 from tb_blog_board), $2, $3, now())";
        db.query(query, [param.category, param.title, param.content])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

//Study 글등록
function insertStudyWrite(param) {

    console.log(param)
    return new Promise(function (resolve, reject) {
        var query = "insert into tb_study_board (cont_category, cont_num, cont_title, cont_content, cont_regdate) values($1, (select max(cont_num)+1 from tb_study_board), $2, $3, now())";
        db.query(query, [param.category, param.title, param.content])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

function updateStudyModify(param){
    return new Promise(function (resolve, reject) {
        var query = "update tb_study_board set cont_category=$1, cont_title=$2, cont_content=$3 where cont_category=$4 and cont_num = $5";
        db.query(query, [param.category, param.title, param.content, param.categoryCode, param.cont_num])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};


function updateBlogModify(param){
    return new Promise(function (resolve, reject) {
        var query = "update tb_blog_board set cont_category=$1, cont_title=$2, cont_content=$3 where cont_category=$4 and cont_num = $5";
        db.query(query, [param.category, param.title, param.content, param.categoryCode, param.cont_num])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};


module.exports = writeService;