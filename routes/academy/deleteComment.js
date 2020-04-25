// api for deleting comment on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;
    var user = req.body.user;
    var comment = req.body.comment;
    var time = req.body.time;

    // send delete query
    mysqlDB.query(
        'delete from academy_comment where id=? and user=? and comment=? and time=?;',
        [Number(id), user, comment, time], function (err, result){
            res.send(result);
    });
});

module.exports = router;