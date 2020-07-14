var mysql = require('mysql');
var connection = mysql.createConnection({
    // host: '49.50.162.157',
    host: 'localhost',
    port: 3306,
    user: 'jh0shin',
    password: 'hak@won@go1!!',
    database: 'hakwongo',
    charset : 'utf8'
});
var connection2 = mysql.createConnection({
    // host: '49.50.162.157',
    host: 'localhost',
    port: 3306,
    user: 'jh0shin',
    password: 'hak@won@go1!!',
    database: 'hwgo',
    charset : 'utf8'
});

module.exports = connection;
module.exports = connection2;