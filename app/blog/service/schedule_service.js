var db = require('../../lib/pgDb.js');
var scheduleService = {
    selectSchedule: selectSchedule
}

//방명록조회
function selectSchedule(month) {
    return new Promise(function (resolve, reject) {
        var query = "select * FROM tb_schedule where TO_CHAR(sc_date, 'mm') = $1";
        db.query(query, [month])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

module.exports = scheduleService;