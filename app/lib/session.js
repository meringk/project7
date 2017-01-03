var seApp = require('express-session')();
var sessionInfo = require('../resources/properties').sessionInfo;

console.log(sessionInfo);

seApp.set('trust proxy', 1) // trust first proxy
seApp.use(session(sessionInfo));



module.exports = seApp;