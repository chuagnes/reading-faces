var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var quizSchema = mongoose.Schema({
  imagename: String,
  apianswer: String,
  useranswer: String, 
});

// next version, save the user score in User model

var Quiz = mongoose.model('Quiz', quizSchema);

Quiz.insert = function(imagename, apianswer, useranswer){
  var quiz = new Quiz({
    imagename: imagename, 
    apianswer: apianswer,
    useranswer: useranswer
  });
  quiz.save(function(err, data){
    if (err){
      console.log(err);
    } else {
      console.log("successfully added quiz question answer");
    }
  })
}

Quiz.updateAns = function(field, value){
  Quiz.update({imagename: field}, 
    { $set: {useranswer: value} }, 
    function(err, count){
      if (err){
        console.log(err);
      } else {
        console.log(count)
      }
    }
  )
}

module.exports = Quiz;

// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;