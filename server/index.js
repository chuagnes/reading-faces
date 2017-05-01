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

// inserts apianswers into db on the page load 
app.post('/quizrender', function(req, res){

  var apiobj = req.body;
  var id = apiobj.id; 
  var imgname = apiobj.imagename;
  var mscores = apiobj.apianswer;
  var answer = apiobj.answer;
  var url = apiobj.url;
  console.log(url, "URLLLLLLL")
  // console.log(imgname, "IMGNAME")
  Quiz.insert(id, imgname, mscores, answer, url)
  res.end();
})


app.post('/quiz', function(req, res){
  console.log(req.body.answer, "IMGNAME");
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



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

// app.post('/quizrender', function(req, res){
//   Quiz.collection.drop();
//   var imageAnswer = req.body;
//   for (var key in imageAnswer){
//     Quiz.insert(key, imageAnswer[key])
//   };
//   res.end();

// })