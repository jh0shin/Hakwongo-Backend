// api for getting comment list from DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var name = req.body.name;

    // return search result
    mysqlDB.query(
        'select * from academy_comment where binary name = ?',
        [name], function (err, result){
            res.send(result);
    });
});

module.exports = router;