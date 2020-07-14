// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var id = req.body.id;
    
    // ===========================================================================
    // get exact id and return id hakwon info (all)
    // ===========================================================================

    // changed return search result
    mysqlDB.query(
        'select distinct * from gg_hakwon where id = ' + id + ';',
        function (err, result){
            res.send(result);
        }
    );

});

module.exports = router;