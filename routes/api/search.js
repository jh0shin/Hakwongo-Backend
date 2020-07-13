// api for main search

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var limit = req.body.limit;
    var offset = req.body.offset;
    var addr = req.body.addr;
    var subject = req.body.subject;
    var age = req.body.age;
    
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

    // search data log
    // mysqlDB.query(
    //     'insert into searchlog (time, keyword) values (?, ?);',
    //     [Date().toString(), name], function(err, result){}
    // );

    // changed log search data
    // mysqlDB.query(
    //     'insert into searchlog (time, keyword, sido, gungu, subject, grade, lowprice, highprice) values (?, ?, ?, ?, ?, ?, ?, ?);',
    //     [Date().toString(), name, sido, gungu, subject, grade, lowprice, highprice], function(err, result) {}
    // );

    // return search result
    // mysqlDB.query(
    //     'select * from hk_gs where binary hname like ? limit ?, ?;',
    //     ["%" + name + "%", Number(offset), Number(limit)], function (err, result){
    //         res.send(result);
    // });

    var query = 'select * from hwgo';

    if (addr != '') query += ('where binary addr like \'%' + addr + '%\'');
    if (subject != '') query += ' and part3 like \'%' + subject + '%\'';
    if (age != '') query += ' and part3 like \'%' + age + '%\'';
    query += ' limit ' + offset + ', ' + limit + ';';

    // changed return search result
    mysqlDB.query(
        query, function (err, result){
            res.send(result);
        }
    );

});

module.exports = router;