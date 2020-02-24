// api for upload contact information for company

var express = require('express');
var router = express.Router();

var mysqlDB = require('../../db_connector');

router.post('/', function (req, res, next) {
    
    // data
    var cname = req.body.cname;
    var name = req.body.name;
    var lcall = req.body.lcall;
    var hcall = req.body.hcall;
    var email = req.body.email;
    var location = req.body.location;
    var etc = req.body.etc;

    // return search result
    mysqlDB.query(
        'INSERT INTO contact_company (cname, name, lcall, hcall, email, location, etc) VALUE(?, ?, ?, ?, ?, ?, ?);',
        [cname, name, lcall, hcall, email, location, etc],
        function (err, result){
            res.send(result);
        }
    );
});

module.exports = router;