var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'do you think?' , name :'Home'});
  //res.sendFile(__dirname + '/hello.html');
  //res.render('signin');
    //return res.redirect('index');
});


module.exports = router;
