var db = require('../../lib/pgDb.js');
var memberService = {
    selectMember: selectMember,
    insertMember: insertMember,
    loginMember: loginMember
}

//전체 멤버 조회
function selectMember() {
    return new Promise(function (resolve, reject) {
        var query = 'select * from tb_member';
        db.query(query)
            .then(function (data) {
                // console.log(data);
                resolve(data);
            })
            .catch(function (error) {
                // console.log(error);
                reject(error);
            });
    });
}

function insertMember(member) {
    return new Promise(function (resolve, reject) {
        var query = 'insert into tb_member values($1, $2, $3)';
        db.query(query, [member.id, member.password, member.name])
            .then(function () {
                var query2 = 'select * from tb_member';
                return db.query(query2);
            })
            .then(function (data) {
                resolve(data);
                //res.json(data);
            })
            .catch(function (error) {
                reject(error);
                //console.log(error);
                //res.send(error);
            });
    });
}

function loginMember(loginInfo) {
    return new Promise(function (resolve, reject) {
        var query = 'select * from tb_member where m_userid = $1 AND m_passwd = $2';
        db.one(query, [loginInfo.id, loginInfo.password])
            .then(function (data) {
                //console.log(data);

                resolve({
                    m_userid: data.m_userid,
                    m_username: data.m_username
                });
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

module.exports = memberService;