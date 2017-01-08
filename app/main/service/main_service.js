var db = require('../../lib/pgDb.js');
var mainService = {
    insertGuestSubmit: insertGuestSubmit,
    selectGuestBookList:selectGuestBookList,
    selectGuestBookListMore:selectGuestBookListMore,
    join: join,
    login:login
}

function login(param){
    return new Promise(function (resolve, reject) {
        var query = 'select * from tb_member where m_userid = $1 AND m_passwd = $2';
        db.query(query, [param.id, param.passwd])
            .then(function (data) {      
                console.log(data);    
                console.log("---------------");
                console.log(data[0].m_userid)
                resolve({
                    m_userid: data[0].m_userid,
                    m_username: data[0].m_name
                });
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
function join(param){
    return new Promise(function (resolve, reject) {
        var query = 'insert into tb_member values($1, $2, $3, now())';
        db.query(query, [param.id, param.passwd, param.name])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

//방명록조회
function selectGuestBookList() {
    return new Promise(function (resolve, reject) {
        var query = "select  g_userip, g_content, g_date + interval '9 hours' as g_date, g_idx from tb_guest order by g_idx desc limit 5";
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
        var query = "select g_userip, g_content, g_date + interval '9 hours'  as g_date, g_idx  from tb_guest where g_idx < $1 order by g_idx desc limit 5";
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