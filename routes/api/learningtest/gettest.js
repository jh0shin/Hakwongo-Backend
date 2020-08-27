// api for get recent test results

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;
    var limit = req.body.limit;
    var offset = req.body.offset;

    // return if recent test result is existed
    mysqlDB.query(
        'select * from learningtest where user=? order by testtime desc limit ?, ?;',
        [user, Number(offset), Number(limit)], function (err, result){
            res.send(result);
    });
    
});

module.exports = router;