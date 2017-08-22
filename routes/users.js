var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')(/*options*/)
var credentials = require('../credentials/user.json');

const cn = {
    user: credentials.user,
    password: credentials.password,
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'postgres'
};

const db = pgp(cn);

var response;

/* GET users listing. */

router.get('/', function(req, res, next) {
        db.any('select * from users', [true])
            .then(function (data) {
                res.send({response:data});
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
});

// getting a user from userId

router.get('/:userId',(req,res,next) => {
    db.one('select * from users where id =' + req.params.userId)
       .then((data) => {
         res.send({response:data});
    })
    .catch((error) =>{
        res.send({response:'No result found'});
        console.log('ERROR:',error)
    });
});

// creating a user

router.post('/newgame',(req,res,next) => {
    
    const params = {
        id:req.body.id,
        name:req.body.name
    }
    
    db.none('INSERT INTO users(id, name) VALUES(${id}, ${name})',params)
    .then(() => {
        res.send({response:'Added a new user successfully'});
    })
    .catch(error => {
        res.send({response:error.detail});
        console.log(error);
    });
    
});


module.exports = router;
