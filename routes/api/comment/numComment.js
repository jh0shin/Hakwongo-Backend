// api for getting comment list from DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;

    // Example and explain is in search/name.js

    // return number of comment
    mysqlDB.query(
        'select COUNT(*) from comment where id = ?',
        [Number(id)], function (err, result){
            res.send(result);
    });
});

module.exports = router;