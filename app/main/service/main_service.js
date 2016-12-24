var db = require('../../lib/pgDb.js');
var memberService = {
    insertGuestSubmit: insertGuestSubmit
}


function insertGuestSubmit(param) {
    return new Promise(function (resolve, reject) {
        var query = 'insert into tb_guest values($1, $2)';
        db.query(query, [param.ip, param.message])
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