// api for upload simple contact email or kakao id

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {

    // data
    var data = req.body.data

    // return search result
    mysqlDB.query(
        'INSERT INTO contact_us (data) VALUES (?);',
        [data],
        function (err, result){
            res.send(result);
        }
    );
});

module.exports = router;