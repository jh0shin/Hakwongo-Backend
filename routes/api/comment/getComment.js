// api for getting comment list from DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;
    var limit = req.body.limit;
    var offset = req.body.offset;
    var order = req.body.order;

    // Example and explain is in search/name.js

    if (order == "time") {
        // return order by time
        mysqlDB.query(
            'select * from comment where id = ? order by time desc limit ?, ?',
            [Number(id), Number(offset), Number(limit)], function (err, result){
                res.send(result);
        });
    }
    else if (order == "heart") {
        // return order by heart
        mysqlDB.query(
            'select * from comment where id = ? order by heart desc limit ?, ?',
            [Number(id), Number(offset), Number(limit)], function (err, result){
                res.send(result);
        });
    }
});

module.exports = router;