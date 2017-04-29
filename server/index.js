var express = require('express');
var path = require('path');
var Quiz = require('../database');
var request = require('request');
var fs = require('fs');
const bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/answers', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/dist/answers.html'))
})

app.post('/quizrender', function(req, res){
  Quiz.collection.drop();
  var imageAnswer = req.body;
  for (var key in imageAnswer){
    Quiz.insert(key, imageAnswer[key])
  };
  res.end();

})

app.post('/quiz', function(req, res){
  Quiz.updateAns(req.body.imagename, req.body.answer)
  res.end();
  //Quiz.insert()
})

app.get('/score', function(req, res){
  Quiz.find()
  .exec(
      function(err, data){
        if (err) throw err;
        res.send(data);
  })

})

// app.get('/quiz', function(req, res){
//   res.send(data)
// })

// app.get('/asp', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

