import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Bootstrap, Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import ImageViewer from './ImageViewer.jsx';
import Quiz from './Quiz.jsx';
import About from './About.jsx';
import Answers from './Answers.jsx';
import imageDatas from '../imagedata.js'
import Nav from './Nav.jsx';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';

var photoidx = 0; 


class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPhoto: imageDatas[0],
      photos: imageDatas, 
      score: 0,
      showScore: false, 
      answers: []
      // userarr: [],
      // apiarr: [],
      // ansarr: []
    }
  }

  componentWillMount() {
    $.get('/newquiz', function(data, status){
        if (status === "success"){
          console.log("Quiz reset")
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
        if (photoidx < imageDatas.length){
          this.setState({currentPhoto: imageDatas[photoidx]})
        } else {
          // alert("Reached End of Photos")
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
          console.log("trying to redirect");
          <Redirect to='/' />
        }
    })
    .fail(({responseJSON}) => {
        responseJSON.error.errors.forEach((err) =>
          console.error(err)
        );

    })
  }

  render () {
    return (
      <BrowserRouter>
      <div>


        <div className="container">
          <div className="row quiz-viewer">
            <div className="quiz-image col-md-8">
              <ImageViewer image={this.state.currentPhoto}/>
            </div>
            <div className="quiz col-md-4">
              <p> {photoidx} / {imageDatas.length} </p>
              <Quiz onSelect={this.insert.bind(this)} />
            </div>
          </div>
        </div>
        
    </div>
    </BrowserRouter>
    )
  }
}

export default Base

// <Nav />
//       <Grid>
      
//       <Row> <h3> </h3></Row>
//       <Row>
//         <Col style={{float: 'center'}} md={8}>
//         <ImageViewer image={this.state.currentPhoto}/>
//         </Col>
//         <Col style={{float: 'right'}} md={4}>
//         {this.state.showScore ? null : <Quiz onSelect={this.insert.bind(this)} />}
//         </Col>
//       </Row>

//       <Row>
//         {this.state.showScore ? <Answers score={this.state.score} photos={imageDatas} answersdata={this.state.answers} /> : null}
//       </Row>
//       </Grid>

//     </div>)