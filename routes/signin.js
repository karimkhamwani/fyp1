var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/dyt';



router.get('/signin', function(req, res, next) {
// res.render('index', { title: 'do you think?' , name :'Home'});
  //res.sendFile(__dirname + '/hello.html');
  res.render('sign');
    //return res.redirect('index');

    display();
});

router.post('/signin/successfull', function(req,res){
//get values
var uname = req.body.username;
var pass = req.body.password;
var state = req.body.em;

//res.send(createAccount());
_newuser(uname ,pass,state);
res.send('<b> Account created<b>');
});
//creating new user
//a = uname , b=pass , c =state/Country
function _newuser(a, b, c) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connection establisted');
            var collection = db.collection('login');
            var user = {
                username : a,
                password : b,
                CountryProvince : c
            }
            collection.insert(user, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
            db.close();

        }

    });

}
module.exports = router;
