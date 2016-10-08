var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/dyt';
var assert = require('assert');
var id =0;

router.post('/', function(req, res) {
    var loginStatus = 'yo';

    var uname = req.body.username;
    var pass = req.body.password;
    _validateUser(function(data){
      //console.log(data);
      loginStatus = data.loginStatus;
      id = data.objectid;

      //console.log('id is' , id);
      //console.log(loginStatus);
      if(loginStatus == true){
        //res.redirect();
        //res.end();
        res.render('questions', {objectid :id});
        console.log(loginStatus, id);


        //res.end();
      }else {
        //res.send('invalid')
        //res.end();
        //res.render('error')
        console.log('error')

      }
    },uname,pass); // yaha login ki value change horahi par niche yo hi show karha



});

//checks username password is correct
function _validateUser(callback,a,b) {
  c=a;
  d=b;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null,err);
        findUser(db,function(result){
          db.close();
        //  console.log(result);
          callback(result);
        },c,d);
    });
}

var findUser = function(db, callback,uname,pass) {
  var json = {};
    var cursor = db.collection('login').find({
        username: uname,
        password: pass
    });
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            loginStatus = true;
            id = doc._id;
            //console.log(id);
            json = {
              loginStatus : true,
              objectid : id
            }

        } else {
              loginStatus = false;
            //callback();
            //console.log(loginStatus);
        }
        callback(json);
        });
}


module.exports = router;
//module.exports.objectid = check;
