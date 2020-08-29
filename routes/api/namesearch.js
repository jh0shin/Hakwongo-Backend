// api for main search

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var limit = req.body.limit;
    var offset = req.body.offset;
    var name = req.body.name;
    
    // ===========================================================================
    // limit : the number of items in one page
    // offset : starting index of search result
    //     ex) 10 items per page and want to get second page,
    //         (index starting from 0)
    //         limit is 10 and offset is (limit * (index)) = 10 * 1 = 10

    // If there is 15 result and limit is 10, offset is 10,
    // 11st ~ 15th items returned.

    // If there is 15 result and limit is 10, offset is 20,
    // return empty set.
    // ===========================================================================

    var query = 'select distinct id, name, addr, founder, callnum from gg_hakwon where name like \'%' + name + '%\'';
    query += ' limit ' + offset + ', ' + limit + ';';

    // changed return search result
    mysqlDB.query(
        query, function (err, result){
            res.send(result);
        }
    );

});

module.exports = router;