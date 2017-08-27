var express = require('express');
var router = express.Router();
var uuidv1 = require('uuid/v1');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Users Service' });
  var iUUID = uuidv1();
  console.log(iUUID);    
});

module.exports = router;
    