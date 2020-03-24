// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var limit = req.body.limit;
    var offset = req.body.offset;
    
    // limit : the number of items in one page
    // offset : starting index of search result
    //     ex) 10 items per page and want to get second page,
    //         (index starting from 0)
    //         limit is 10 and offset is (limit * (index)) = 10 * 1 = 10

    // If there is 15 result and limit is 10, offset is 10,
    // 11st ~ 15th items returned.

    // If there is 15 result and limit is 10, offset is 20,
    // return empty set.

    // log search data
    mysqlDB.query(
        'insert into searchlog (time, keyword) values (?, ?);',
        [Date().toString(), name], function(err, result){}
    );

    // return search result
    mysqlDB.query(
        'select * from hk_gs where binary hname like ? limit ? offset ?;',
        ["%" + name + "%", limit, offset], function (err, result){
            res.send(result);
    });
});

module.exports = router;