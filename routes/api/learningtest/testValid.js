// api for check payment information on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../../db_connector');

router.post('/', function (req, res, next) {
    var user = req.body.user;

    // return if payment info is existed
    mysqlDB.query(
        'select * from payment where user=? order by validtime desc;',
        [user], function (err, result){
            res.send(result);
    });
    
});

module.exports = router;