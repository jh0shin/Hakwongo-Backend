// file for login checking

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var userID = req.body.user.id;
    var userPASSWORD = req.body.user.password;
    
    // SQL SEARCH query for checking id and password is valid
    // NEEDS to divide when (id exists and pw incorrect) and (id doesn't exist)
    mysqlDB.query('select * from user_account where id=? and pw=?', [userID, userPASSWORD], function (err, rows, fields) {
        if (!err) {
            if (rows[0] != undefined) {
                res.json({result : 1});
            } else {
                res.json({result : 0});
            }
        } else {
            res.send('error: ' + err);
        }
    });
});

module.exports = router;