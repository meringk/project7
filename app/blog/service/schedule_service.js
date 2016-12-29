var db = require('../../lib/pgDb.js');
var scheduleService = {
    selectSchedule: selectSchedule,
    insertSchedule: insertSchedule
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

//방명록등록
function insertSchedule(param) {

    console.log(param)
    return new Promise(function (resolve, reject) {
        var query = "insert into tb_schedule (sc_event_name, sc_date, sc_gb, sc_regdate, sc_reg_id ) values($1, $2, '003', now(), $3)";
        db.query(query, [param.eventNm, param.eventDate, param.eventRegId])
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

module.exports = scheduleService;