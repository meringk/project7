var member = require('./test/controller/member_controller'),
    main = require('./main/controller/main_controller');

module.exports = function(app){

    return {
        init: init
    }

    function init(){
        app.use('/member', member);
        app.use('/main', main);
    }
}