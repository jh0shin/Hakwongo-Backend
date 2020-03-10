// api for checking specific academy is bookmarked

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;
    var name = req.body.name;

    mysqlDB.query(
        'select user=? and name=? from academy_bookmark;',
        [user, name], function (err, result) {
            res.send(result);
        }
    )
});

module.exports = router;