var db = require('../../lib/pgDb.js');
var studyService = {
    selectStudyList : selectStudyList,
    selectStudyContent : selectStudyContent
}

// 글 리스트 조회
function selectStudyList(param) {
    return new Promise(function (resolve, reject) {
        var query = "select cont_num, cont_title, cont_regdate, cont_category FROM tb_study_board where cont_category = $1  order by 1";
        console.log(query);
        db.query(query, [param.categoryCode])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

// 글 컨텐트 조회
function selectStudyContent(param) {
    
    console.log(param.cont_num)
    return new Promise(function (resolve, reject) {
        var query = "select * from tb_study_board where cont_category = $1 AND cont_num = $2";
        db.query(query, [param.categoryCode, param.cont_num])
            .then(function (data) {
                console.log(query);
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


module.exports = studyService;