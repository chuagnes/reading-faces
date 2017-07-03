var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var url = process.env.MONGOLAB_URI || 'mongodb://localhost/test';

mongoose.connect(url)

var db = mongoose.connection;

db.on('error', function() {
  console.log('Not connected to MongoDB. Try running `mongod`');
});

db.once('open', function() {
  console.log('Connected to MongoDB');
});
