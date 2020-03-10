// api for adding specific academy on my bookmark list on DB server

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    var type = req.body.type;
    var user = req.body.user;
    var name = req.body.name;

    if (type == "add") {
        // add current academy on bookmark list
        mysqlDB.query(
            'insert into academy_bookmark (user, name) values (?, ?);',
            [user, name], function (err, result){
                res.send(result);
        });
    }
    else {
        // delete current academy on bookmark list
        mysqlDB.query(
            'delete from academy_bookmark where user=? and name=?;',
            [user, name], function (err, result) {
                res.send(result);
            }
        );
    }

    
});

module.exports = router;