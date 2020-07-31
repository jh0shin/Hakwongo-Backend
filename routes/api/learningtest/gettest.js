// api for get recent test results

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;

    // return if payment info is existed
    mysqlDB.query(
        'select * from learningtest where user=?;',
        [user], function (err, result){
            res.send(result);
    });
    
});

module.exports = router;