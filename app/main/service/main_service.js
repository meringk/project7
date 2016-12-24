var db = require('../../lib/pgDb.js');
var mainService = {
    insertGuestSubmit: insertGuestSubmit,
    selectGuestBookList:selectGuestBookList
}

//방명록조회
function selectGuestBookList() {
    return new Promise(function (resolve, reject) {
        var query = 'select * from tb_guest';
        db.query(query)
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
        var query = 'insert into tb_guest values($1, $2,  now())';
        
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