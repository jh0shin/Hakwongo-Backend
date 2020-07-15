// api for main search

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;

    var query = 'select * from gg_class where id = ' + id + ';';

    // changed return search result
    mysqlDB.query(
        query, function (err, result){
            res.send(result);
        }
    );

});

module.exports = router;