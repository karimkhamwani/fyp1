var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/dyt';
var assert = require('assert');
var user = require('../routes/user');
var ObjectId = require('mongodb').ObjectID;

router.post('/', function(req, res) {
    //console.log('id from question', user.objectid);
    var _objectid = req.body.objectid;
    var _title = req.body.title;
    var _description = req.body.description;
    var _date = getdate();
    var _username = null;
    //res.send('done');
    //getting username
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.status(400).send();
        } else {
            var collection = db.collection('login');

            var cursor = collection.find({
                _id: ObjectId(_objectid)
            });
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    // var result = doc._id;
                    _username = doc.username;
                    //console.log('username', _username);
                    _insertquestions();
                    res.send('done');
                    //res.render('')
                } else {

                }
            });
        }
    });

function _insertquestions(){
    MongoClient.connect(url,function(err,db){
      if(err){
        res.status(400).send();
      }
      else {
        var collection = db.collection('panel');
        var question = {
          title : _title,
          description : _description,
          date : _date,
          askedby : _username,
          userid : _objectid
        }
        collection.insert(question,function(err,result){
          if(err){
            res.status(400).send();
          }
          else {
            console.log(result);
          }
        });
      }
    });
  }


});

router.get('/allquestions/:objectid', function(req, res) {
    var id = req.params.objectid;
    //res.send(id);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err)
        } else {
            var collection = db.collection('panel')
            var cursor = collection.find({
                _id: ObjectId(id)
            });
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    res.render('discussion', {
                        title: 'Discussion',
                        results : doc
                    });
                    console.log(doc);
                }
            });
        }
    });
});






function getdate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    return today = mm + '/' + dd + '/' + yyyy;
}



router.get('/allquestions', function(req, res, next) {
    //res.render('allquestions', {
      //  title: 'Welcome to all questions',
        //results : test
    //});

    MongoClient.connect(url, function(err,db){
      if(err){
        console.log(err)
      }else {
        var collection = db.collection('panel');
        collection.find({}).toArray(function(err, result) {
            if (err) {
                console.log(err)
            } else if (result.length) {
                //console.log(result);
                //res.send(result);
                res.render('allquestions', {
                  results : result,
                  title :'All questions'
                });
            } else {
                console.log('no result found');

            }
        });
      /*  var cursor = collection.find({});

        cursor.each(function(err, doc) {


            assert.equal(err, null);
            if (doc != null) {
                // var result = doc._id;
              //  _username = doc.username;

                //console.log(doc);
                console.log(doc);
                //res.setHeader('Content-Type','application/json');
                res.render('allquestions', {
                  results : doc,
                  title :'Hello'
                });
            }
        }); */
      }
    });
});



module.exports = router;
