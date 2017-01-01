var member = require('./test/controller/member_controller'),
    main = require('./main/controller/main_controller'),
    schedule = require('./blog/controller/schedule_controller'),
    write = require('./write/controller/write_controller');

module.exports = function(app){

    return {
        init: init
    }

    function init(){
        app.use('/member', member);
        app.use('/', main);
        app.use('/schedule',schedule);
        app.use('/write',write);
    }
}