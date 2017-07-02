import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
const superagent = require('superagent/lib/client')
import {Bootstrap, Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import ImageViewer from './ImageViewer.jsx';
import Quiz from './Quiz.jsx';
import About from './About.jsx';
import Answers from './Answers.jsx';
// import imageDatas from '../imagedata.js'
import Nav from './Nav.jsx';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';
import Modal from 'react-modal'
import Score from './Score.jsx'

var photoidx = 0; 

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPhoto: '',
      photos: [], 
      score: 0,
      showScore: false, 
      answers: []
    }
  }

  componentWillMount() {
    var context = this;
    superagent
    .get('/newquiz')
    .end(function(err, res){
      if (err){
        console.error(err, "DB call error")
      } else {
        context.setState({ photos: res.body, currentPhoto: res.body[0] })
      }
    })
    photoidx = 0; 
  }

  insert(option){
    console.log(`${option} was selected`);
    $.post('/quiz', {
      answer: option, 
      imagename: this.state.currentPhoto.imagename
    })
    .then(() =>{
      photoidx++; 
        if (photoidx < this.state.photos.length){
          this.setState({currentPhoto: this.state.photos[photoidx]})
        } else {
          var score = 0;
          var context = this;
          $.get('/score', function(data){
              data.forEach(function(q){
              if (q.answer === q.useranswer){
                score++
              }
            }) 
            context.setState({score: score}) 
            context.setState({answers: data});
          })

          this.setState({showScore: true});
        }
    })
    .fail(({responseJSON}) => {
        responseJSON.error.errors.forEach((err) =>
          console.error(err)
        );

    })
  }

  render () {

    const { from } = this.props.location.state || '/'

    return (
      <div>

        <Modal 
          isOpen={this.state.showScore}
          contentLabel="Score Popup"
          style={customStyles}
        >

        <Score score={this.state.score} photos={this.state.photos} answersdata={this.state.answers} />

        </Modal>

        <div className="container">
          <div className="row quizheader">
          "Reading Faces" Quiz
          </div> 
          <div className="row quiz-viewer">
            <div className="quiz-image col-md-9">
              <ImageViewer image={this.state.currentPhoto}/>
            </div>
            <div className="quiz col-md-3">
              <p> {photoidx} / {this.state.photos.length} </p>
              <Quiz onSelect={this.insert.bind(this)} />
            </div>
          </div>
        </div>


    </div>
    )
  }
}

export default Base

