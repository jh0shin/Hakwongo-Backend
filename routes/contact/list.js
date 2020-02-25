// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.get('/us', function (req, res, next) {    
    // return contact_us
    mysqlDB.query(
        'select * from contact_us',
        function (err, result){
            res.send(result);
    });
});

router.get('/parent', function (req, res, next) {    
    // return contact_parent
    mysqlDB.query(
        'select * from contact_parent',
        function (err, result){
            res.send(result);
    });
});

router.get('/company', function (req, res, next) {    
    // return contact_company
    mysqlDB.query(
        'select * from contact_company',
        function (err, result){
            res.send(result);
    });
});

module.exports = router;