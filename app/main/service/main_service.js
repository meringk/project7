var db = require('../../lib/pgDb.js');
var mainService = {
    insertGuestSubmit: insertGuestSubmit,
    selectGuestBookList:selectGuestBookList,
    selectGuestBookListMore:selectGuestBookListMore
}

//방명록조회
function selectGuestBookList() {
    return new Promise(function (resolve, reject) {
        var query = 'select * from tb_guest order by g_idx desc limit 5';
        db.query(query)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

//방명록조회
function selectGuestBookListMore(g_idx) {
    return new Promise(function (resolve, reject) {
        var query = 'select * from tb_guest where g_idx < $1 order by g_idx desc limit 5';
        db.query(query, [g_idx])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

//방명록등록
function insertGuestSubmit(param) {
    return new Promise(function (resolve, reject) {
        var query = 'insert into tb_guest values($1, $2, now())';
        console.log(query);
        db.query(query, [param.ip, param.message])
            .then(function () {
                var query2 = 'select * from tb_guest';
                return db.query(query2);
            })
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


module.exports = mainService;