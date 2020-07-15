// api for posting comment on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;
    var user = req.body.user;
    var time = req.body.time;
    var comment = req.body.comment;    

    // return search result
    mysqlDB.query(
        'insert into comment (id, user, comment, time, heart) values (?, ?, ?, ?, 0);',
        [Number(id), user, comment, time], function (err, result){
            res.send(result);
    });
});

module.exports = router;