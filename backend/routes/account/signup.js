var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var userID = req.body.user.id;
    var userPASSWORD = req.body.user.password;

    // SQL INSERT query for creating new user id and password
    // NEED to add other properties (ex. name, age and other social media login)
    mysqlDB.query('insert into user_account values(?, ?)', [userID, userPASSWORD], function (err, rows, fields) {
        if (!err) {
            res.json({result : 1});
        } else {
            res.json({result : 0});
        }
    });
});

module.exports = router;