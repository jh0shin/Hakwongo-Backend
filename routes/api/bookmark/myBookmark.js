// api for getting specific user's bookmark list from DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;
    var limit = req.body.limit;
    var offset = req.body.offset;

    // example in search/name.js

    // return search result
    mysqlDB.query(
        'select * from bookmark where user = ? limit ?, ?',
        [user, Number(offset), Number(limit)], function (err, result){
            res.send(result);
    });
});

module.exports = router;