var express = require('express');
var superagent = require('superagent')
var path = require('path');
var Index = require('../database');
var Quiz = require('../database/models/quiz')
var request = require('request');
var fs = require('fs');
const bodyParser = require('body-parser');
var multer = require('multer');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.config.json'); // from root file
const config = require('../config/default.json')['Microsoft'];
const s3 = new AWS.S3();

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5248800 },
})

app.post('/upload', upload.single('imgfile'), (req, res) => {
  s3.upload({
    Bucket: 'readingfaces',
    Key: Math.random()+req.file.originalname, 
    Body: req.file.buffer,
    ACL: 'public-read', 
  }, (err, data) => { 
    if (err){
      return res.status(400).send(err);
    } else {
      superagent
      .post('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize')
      .send({ "url": data.Location }) 
      .set({ "Ocp-Apim-Subscription-Key": config.key, Accept: 'application/json' })
      .end(function(err, agentres){
        if (err){
          console.error(err, "error")
        } else {
          var body = [data.Location, req.file.originalname, agentres.body]
          res.send(body);
        }
      })
    }
  })
})


// clears out "your answer" and seeds db
app.get('/newquiz', function(req, res){
  Quiz.update({ useranswer: {$exists: true}}, {$set: {useranswer: ""}}, {multi: true})
  console.log("resetting quiz")
  Quiz.find()
  .sort({ id: 1})
  .exec(function(err, data){
    res.send(data)
  }) 
})

// updates user's answers as he/she goes through quiz 
app.post('/quiz', function(req, res){
  console.log(req.body.answer, "IMGNAME");
  if (req.body.answer === "false" || req.body.answer === ""){
    req.body.answer = "None given"
  }
  Quiz.updateAns(req.body.imagename, req.body.answer)
  res.end();
})

app.get('/score', function(req, res){
  Quiz.find()
  .exec(
      function(err, data){
        console.log(data)
        if (err) throw err;
        res.send(data);
  })

})

//adds new image to the database
app.post('/newimage', function(req, res){
  console.log(req.body, "WHAT IS THE REQUEST?")
  Quiz.count(function(err, data){
    req.body["id"] = data+1;
    // console.log(req.body, "OBJ TO CREATE")
    Quiz.create(req.body, function(err, obj){
      if (err){
        console.error(err, "Error adding image to quiz")
      } else {
        res.status(200).end()
      }
    })
  })


})


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

