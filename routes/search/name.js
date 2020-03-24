// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var hk_name = req.body.hakwonName;

    // log search data
    mysqlDB.query(
        'insert into searchlog (time, keyword) values (?, ?);',
        [Date().toString(), hk_name], function(err, result){}
    );

    // return search result
    mysqlDB.query(
        'select * from hk_gs where binary hname like ? limit 200',
        ["%" + hk_name + "%"], function (err, result){
            res.send(result);
    });
});

module.exports = router;