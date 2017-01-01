var db = require('../../lib/pgDb.js');
var writeService = {
    insertBlogWrite: insertBlogWrite,
    insertStudyWrite: insertStudyWrite
}

//Blog 글등록
function insertBlogWrite(param) {

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
}

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
}


module.exports = writeService;