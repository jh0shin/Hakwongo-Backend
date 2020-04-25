// api for getting comment list from DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;
    var limit = req.body.limit;
    var offset = req.body.offset;

    // Example and explain is in search/name.js

    // return search result
    mysqlDB.query(
        'select * from academy_comment where id = ? order by time desc limit ?, ?',
        [Number(id), Number(offset), Number(limit)], function (err, result){
            res.send(result);
    });
});

module.exports = router;