var member = require('./controller/member_controller');

module.exports = function(app){

    return {
        init: init
    }

    function init(){
        app.use('/member', member);
    }
}