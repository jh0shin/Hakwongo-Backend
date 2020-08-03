// api for store payment information on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;
    var paytime = req.body.paytime;
    var validtime = req.body.validtime;
    var mid = req.body.mid;

    // store payment info
    mysqlDB.query(
        'insert into payment (user, paytime, validtime, mid) values (?, ?, ?, ?);',
        [user, paytime, validtime, mid], function (err, result){
            res.send(result);
    });
    
    
});

module.exports = router;