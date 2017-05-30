var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  imagename: String,
  apianswer: Object,
  useranswer: String, 
  answer: String, 
  url: String
});

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

Quiz.reset = function(field){
   Quiz.update({ field: {$exists: true}}, {$unset: {field: ""}}, {multi: true})
   console.log("reset quiz")
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
