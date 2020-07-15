// api for deleting comment on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;
    var user = req.body.user;
    var time = req.body.time;
    var comment = req.body.comment;

    // send delete query
    mysqlDB.query(
        'update comment set heart = heart + 1 where id = ? and user = ? and time = ? and comment = ?;',
        [Number(id), user, time, comment], function (err, result){
            res.send(result);
    });
});

module.exports = router;