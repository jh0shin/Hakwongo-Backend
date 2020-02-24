var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    // return notice post list
    //mysqlDB.query('select JSON_ARRAYAGG(JSON_OBJECT(\'title\', title, \'time\', time)) from noticelist', function (err, result) {
    mysqlDB.query('select * from noticelist', function (err, result){
        res.send(result);
    });
});

/* // return only current page's row
router.post('/', function (req, res, next) {
    var pageNum = req.body.page.pagenum;
    var totalRow = 0;

    // maximum row in one page (in NoticePage.vue)
    var noticeRowPerPage = 20;

    // Get total post's number
    mysqlDB.query('select count(*) from noticelist', function(err, result) {
        totalRow = result;
    });

    // Get page row list by json array and return with total Row number
    mysqlDB.query('select JSON_ARRAYAGG(JSON_OBJECT(\'title\', , \'time\', time)) from noticelist order by time desc limit ?, ?',
        [noticeRowPerPage * (pageNum-1), noticeRowPerPage], function (err, result) {
            res.json({'totalRow' : totalRow, 'queryArr' : result});
        });
});
*/

module.exports = router;