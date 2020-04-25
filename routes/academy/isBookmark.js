// api for checking specific academy is bookmarked

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;
    var id = req.body.id;

    mysqlDB.query(
        'select * from academy_bookmark where user=? and id=?;',
        [user, Number(id)], function (err, result) {
            res.send(result);
        }
    )
});

module.exports = router;