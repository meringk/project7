var member = require('./test/controller/member_controller'),
    main = require('./main/controller/main_controller'),
    schedule = require('./blog/controller/schedule_controller'),
    blog = require('./blog/controller/blog_controller'),
    study = require('./study/controller/study_controller'),
    write = require('./write/controller/write_controller');

module.exports = function(app){

    return {
        init: init
    }

    function init(){
        app.use('/member', member);
        app.use('/', main);
        app.use('/schedule',schedule);
        app.use('/blog',blog);
        app.use('/study',study);
        app.use('/write',write);
    }
}