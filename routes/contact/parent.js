// api for upload contact information for parents

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {

    // data
    var pname = req.body.pname;
    var sname = req.body.sname;
    var hcall = req.body.hcall;
    var address = req.body.address;
    var grade = req.body.grade;
    var school = req.body.school;
    var etc = req.body.etc;

    // return search result
    mysqlDB.query(
        'INSERT INTO contact_parent (pname, sname, hcall, address, grade, school, etc) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [pname, sname, hcall, address, grade, school, etc],
        function (err, result){
            res.send(result);
        }
    );
});

module.exports = router;