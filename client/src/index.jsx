import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ImageViewer from './components/ImageViewer.jsx';
import Quiz from './components/Quiz.jsx';
import Answers from './components/Answers.jsx';
// var imgData = require('./imagedata.js');
// import imageData from './imagedata.js'

var imageData = [
  "Agnes Chu.jpg",
"Airyque Ervin.jpg"
]

var imageAnswers = {
  "Agnes Chu.jpg": "joy",
"Airyque Ervin.jpg": "anger",
}

var photoidx = 0; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPhoto: imageData[0],
      photos: imageData, 
      score: 0,
      showScore: false, 
      answers: []
    }
  }

  componentWillMount() {
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
    $.post('/quizrender', imageAnswers)
    .then(() =>{
       console.log("inserted answers")
    })
    .fail(({responseJSON}) => {
      responseJSON.error.errors.forEach((err) =>
        console.error(err)
      );
    })
  }

  // nextImage(){
  //   // this.setState({photoidx: photoidx++});
  //   photoidx++; 
  //   if (photoidx < imageData.length){
  //     this.setState({currentPhoto: imageData[photoidx]})
  //   } else {
  //     alert("Reached End of Photos")
  //   }
    
  // }

  insert(option){
    console.log(`${option} was selected`);
    $.post('/quiz', {
      answer: option, 
      imagename: this.state.currentPhoto
    })
    .then(() =>{
      photoidx++; 
        if (photoidx < imageData.length){
          this.setState({currentPhoto: imageData[photoidx]})
        } else {
          // alert("Reached End of Photos")
          var score = 0;
          var context = this;
          $.get('/score', function(data){
              data.forEach(function(q){
              if (q.apianswer === q.useranswer){
                score++
              }
            }) 
            context.setState({score: score}) 
            context.setState({answers: data}) 
          })
          this.setState({showScore: true});
        }

      //need to reset radio button
    })
    // render the score. 
    // .then(() => {

    // })
    .fail(({responseJSON}) => {
        responseJSON.error.errors.forEach((err) =>
          console.error(err)
        );

    })
  }

  render () {
    return (<div>
      <h1>Headshot </h1>
      <ImageViewer image={this.state.currentPhoto}/>
      <Quiz onSelect={this.insert.bind(this)} />
      {this.state.showScore ? <Answers score={this.state.score} photos={imageData} answersdata={this.state.answers} /> : null}


    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

 //  {this.state.showScore ? <div >Your score is {this.state.score} out of {this.state.photos.length} </div> : null}
 // <Quiz imagelength={this.state.photos.length} score={this.state.score} onSelect={this.insert.bind(this)} />
 // <button onClick={this.nextImage.bind(this)} >Next </button> 
 // <List items={this.state.items}/>
 // https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tigress_at_Jim_Corbett_National_Park.jpg/220px-Tigress_at_Jim_Corbett_National_Park.jpg