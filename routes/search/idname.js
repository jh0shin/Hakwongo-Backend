// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;
    
    // ===========================================================================
    // get exact id and return id hakwon info (only like search result)
    // ===========================================================================

    // changed return search result
    mysqlDB.query(
        'select distinct id, name, part1, addr, founder, callnum, teacher, limitsum from hakwon where id = ' + id, function (err, result){
            res.send(result);
        }
    );

});

module.exports = router;