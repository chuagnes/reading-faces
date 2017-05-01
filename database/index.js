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
  id: {type: Number, unique: true},
  imagename: String,
  apianswer: Object,
  useranswer: String, 
  answer: String, 
  url: String
});

// next version, save the user score in User model

var Quiz = mongoose.model('Quiz', quizSchema);

Quiz.insert = function(id, imagename, apianswer, answer, url, useranswer){
  var quiz = new Quiz({
    id: id, 
    imagename: imagename, 
    apianswer: apianswer,
    answer: answer,
    useranswer: useranswer, 
    url: url
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
  console.log(field, "FIELD")
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