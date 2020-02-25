// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.get('/', function (req, res, next) {
    var hk_name = req.body.hakwonName;
    
    var result1 = [];
    var result2 = [];
    var result3 = [];

    // return contact_us
    mysqlDB.query(
        'select * from contact_us',
        function (err, result){
            result1 = result;
    });

    // return contact_parent
    mysqlDB.query(
        'select * from contact_parent',
        function (err, result){
            result2 = result;
    });

    // return contact_company
    mysqlDB.query(
        'select * from contact_company',
        function (err, result){
            result3 = result;
    });

    res.send([result1, result2, result3]);
});

module.exports = router;