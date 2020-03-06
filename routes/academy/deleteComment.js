// api for deleting comment on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var user = req.body.user;
    var comment = req.body.comment;
    var time = req.body.time;

    // send delete query
    mysqlDB.query(
        'delete from academy_comment where name=? and user=? and comment=? and time=?;',
        [name, user, comment, time], function (err, result){
            res.send(result);
    });
});

module.exports = router;