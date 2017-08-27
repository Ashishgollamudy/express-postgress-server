var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')(/*options*/)
var credentials = require('../credentials/user.json');
var uuidv1 = require('uuid/v1');

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
                res.send(data);
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            });
});

// getting a user from userId

router.get('/Id/:userId',(req,res,next) => {
    db.one('select * from users where uuid =' + "'" + req.params.userId + "'")
       .then((data) => {
         res.send(data);
    })
    .catch((error) =>{
        res.send({response:'No result found'});
        console.log('ERROR:',error)
    });
});

// creating a user

router.post('/newuser',(req,res,next) => {
    
    const params = {
        uuid:uuidv1(),
        name:req.body.name,
        designation:req.body.designation
    }
    
    db.none('INSERT INTO users(uuid, name , designation) VALUES(${uuid}, ${name},${designation})',params)
    .then(() => {
        res.send({response:'Added a new user successfully'});
    })
    .catch(error => {
        res.send({response:error.detail});
        console.log(error);
    });
    
});

// delete user

router.post('/deleteuser',(req,res,next) => {
    
    db.none('delete from users where uuid =' + "'" +  req.body.uuid + "'")
    .then(() => {
        res.send({response:'Delete Item successfully'});
    })
    .catch(error => {
        res.send({response:error.detail});
        console.log(error);
    })
})

// search

router.post('/search',(req,res,next) => {

   var name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    
    db.any('select * from users WHERE name like' + 
           "'" + name + "%'")
    .then((data) => {
        res.send(data);
    })
    .catch((error) =>{
        res.send({response:'No result found'});
        console.log(req.query.name.charAt(0).toUpperCase());
    });
});
        

module.exports = router;
