// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var hk_name = req.body.hakwonName;

    // return search result
    mysqlDB.query(
        'select * from hk_gs where binary hname like ?',
        ["%" + hk_name + "%"], function (err, result){
            res.send(result);
    });
});

module.exports = router;