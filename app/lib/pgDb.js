var pgp = require('pg-promise')();
var connection = require('../resources/properties').dbInfo;
var db = pgp(connection);

module.exports = db;