import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Bootstrap, Grid, Row, Col, Jumbotron} from 'react-bootstrap';
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
      $('input[name="emotions"]').attr('checked', false);
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
      <Grid>
      <Row className="center"><h1>Can You Read Faces? </h1></Row>
      <Row> <h3> Microexpressions are brief, involuntary facial movements that reveal underlying emotions. They are often subtle and difficult to observe. With training, one can pick up facial expression patterns. Spend no more than a few seconds on each one. </h3></Row>
      <Row>
        <Col style={{float: 'center'}} md={4}>
        <ImageViewer image={this.state.currentPhoto}/>
        </Col>
        <Col style={{float: 'right'}} md={4}>
        {this.state.showScore ? null : <Quiz onSelect={this.insert.bind(this)} />}
        </Col>
      </Row>

      <Row>
        {this.state.showScore ? <Answers score={this.state.score} photos={imageData} answersdata={this.state.answers} /> : null}
      </Row>
      </Grid>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

 //  {this.state.showScore ? <div >Your score is {this.state.score} out of {this.state.photos.length} </div> : null}
 // <Quiz imagelength={this.state.photos.length} score={this.state.score} onSelect={this.insert.bind(this)} />
 // <button onClick={this.nextImage.bind(this)} >Next </button> 
 // <List items={this.state.items}/>
 // https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tigress_at_Jim_Corbett_National_Park.jpg/220px-Tigress_at_Jim_Corbett_National_Park.jpg