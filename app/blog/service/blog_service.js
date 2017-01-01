var db = require('../../lib/pgDb.js');
var blogService = {
    selectBlogList : selectBlogList,
    selectBlogContent : selectBlogContent
}

// 글 리스트 조회
function selectBlogList(param) {
    return new Promise(function (resolve, reject) {
        var query = "select cont_num, cont_title, cont_regdate, cont_category FROM tb_blog_board where cont_category = $1";
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
function selectBlogContent(param) {
    return new Promise(function (resolve, reject) {
        var query = "select * from tb_blog_board where cont_category = $1 AND cont_num = $2";
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


module.exports = blogService;