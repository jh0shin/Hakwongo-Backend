// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var limit = req.body.limit;
    var offset = req.body.offset;
    var sido = req.body.sido;
    var gungu = req.body.gungu;
    var subject = req.body.subject;
    var grade = req.body.grade;
    var lowprice = req.body.lowprice;
    var highprice = req.body.highprice
    
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
    mysqlDB.query(
        'insert into searchlog (time, keyword) values (?, ?);',
        [Date().toString(), name], function(err, result){}
    );

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

    var query = 'select distinct id, name, part1, addr, founder, callnum, teacher, limitsum from hakwon where (binary name like \'%' + name + '%\')';

    if (sido != '') query += (' and binary addr like \'%' + sido + '%\'');
    if (gungu != '') query += ' and addr like \'%' + gungu + '%\'';
    if (subject != '') query += ' and part3 like \'%' + subject + '%\'';
    if (grade != '') query += ' and part3 like \'%' + grade + '%\'';
    if (lowprice != '') query += ' and (totalcost > ' + lowprice + ' or cost > ' + lowprice + ')';
    if (highprice != '') query += ' and (totalcost < ' + highprice + ' or cost < ' + highprice + ')';
    query += ' limit ' + offset + ', ' + limit + ';';

    // changed return search result
    mysqlDB.query(
        query, function (err, result){
            res.send(result);
        }
    );

});

module.exports = router;