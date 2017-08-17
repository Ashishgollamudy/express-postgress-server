var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')(/*options*/)
var credentials = require('../credentials/user.json');

const cn = {
    user: credentials.user,
    password: credentials.password,
    host: 'covelite', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'organization_item_masters'
};

const db = pgp(cn);

var response;


/* GET users listing. */

router.get('/', function(req, res, next) {
        db.one('select * from organization_item_masters_rjr_agg_week_2017_04_23 limit 10', [true])
            .then(function (data) {
                res.send({response:data});
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
});

module.exports = router;
