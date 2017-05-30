var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('Not connected to MongoDB. Try running `mongod`');
});

db.once('open', function() {
  console.log('Connected to MongoDB');
});
