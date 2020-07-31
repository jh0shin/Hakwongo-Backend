// api for store learning test result on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;
    var testtime = req.body.testtime;
    var result = req.body.result;

    // store test result
    mysqlDB.query(
        'insert into learningtest (user, testtime, result) values (?, ?, ?);',
        [user, testtime, result], function (err, result){
            res.send(result);
    });
    
});

module.exports = router;