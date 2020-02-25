// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.get('/', function (req, res, next) {    
    var data;

    // return contact_us
    mysqlDB.query(
        'select * from contact_us',
        function (err, result){
            data = result;
    });

    // return contact_parent
    mysqlDB.query(
        'select * from contact_parent',
        function (err, result){
            data.concat(result);
    });

    // return contact_company
    mysqlDB.query(
        'select * from contact_company',
        function (err, result){
            data.concat(result);
    });

    res.send([result1, result2, result3]);
});

module.exports = router;