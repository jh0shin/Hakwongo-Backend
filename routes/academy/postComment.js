// api for SEARCH_BY_NAME

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var user = req.body.user;
    var comment = req.body.comment;

    // return search result
    mysqlDB.query(
        'insert into academy_comment (name, user, comment) values (?);',
        [name, user, comment], function (err, result){
            res.send(result);
    });
});

module.exports = router;