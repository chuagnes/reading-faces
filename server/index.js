var express = require('express');
var items = require('../database');
var request = require('request');
var fs = require('fs');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// app.get('/', function(req, res){
//   res.render('/')
// })

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

