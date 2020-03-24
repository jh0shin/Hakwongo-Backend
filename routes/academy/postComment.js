// api for posting comment on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var user = req.body.user;
    var comment = req.body.comment;
    var time = req.body.time;

    // return search result
    mysqlDB.query(
        'insert into academy_comment (name, user, comment, time) values (?, ?, ?, ?);',
        [name, user, comment, time], function (err, result){
            res.send(result);
    });
});

module.exports = router;