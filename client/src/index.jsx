import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Bootstrap, Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import ImageViewer from './components/ImageViewer.jsx';
import Quiz from './components/Quiz.jsx';
import Answers from './components/Answers.jsx';
// var imgData = require('./imagedata.js');
import imageDatas from './imagedata.js'

var photoidx = 0; 


class App extends React.Component {
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
    // console.log(imageAnswers, "FROM INDEX JSX");
    // console.log(imageDatas, "FROM EXTERNAL FILE")
    for (var i=0; i<imageDatas.length; i++){
      (function(i) {
      var image=imageDatas[i];
      $.ajax({
        url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', 
        headers: {
          "Ocp-Apim-Subscription-Key": "2cf65548bee441bf90838571a7621609"
        },
        type: "POST",
        data: JSON.stringify({"url": image.url}),
        contentType: 'application/json',
        success: (data) => {
          console.log(data, "DATA")
          return data
        },
        error: (err) => {
          console.log('err', err);
        }
      })
      .then(data => {
        var mscores = data[0].scores;
        var imgname = image.imagename;
        var url = image.url;
        console.log(url, "URL")

        for (var key in mscores){
          if (mscores[key] < 0.05){
            delete mscores[key]
          }
        };
        var apiobj = {
          id: image.id,
          imagename: imgname,
          apianswer: mscores,
          answer: image.answer, 
          url: url
        };

        console.log(apiobj, "APIBOJ")
        return apiobj;
        //apiresponses.push([imgname, mscores]);
        //console.log(apiresponses, "APIRESPONSES")
      })
      .then(apiobj => {
        // console.log(apiobj, "APIOBJ");
        $.post('/quizrender', apiobj)
      })
      .fail(({responseJSON}) => {
        responseJSON.error.errors.forEach((err) =>
          console.error(err)
        );
      })
    })(i);
    }

    


  //   $.post('/quizrender', imageAnswers)
  //   .then(() =>{
  //      console.log("inserted answers")
  //   })
  //   .fail(({responseJSON}) => {
  //     responseJSON.error.errors.forEach((err) =>
  //       console.error(err)
  //     );
  //   })
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
            
            // console.log(data, "CONTEXTDATA")
            // var userarr = [];
            // // var priarr = [];
            // // var secarr = [];
            // var ansarr = [];
            // // 
            // for (var i=0; i<data.length; i++){
            //   userarr.push(data[i].useranswer);
            //   ansarr.push(data[i].answer);
            //   // var apiobj = data[i].apianswer;
            //   // var sortable = [];
            //   // for (var key in apiobj){
            //   //   var rounded = Math.round(apiobj[key]*100);
            //   //   sortable.push([key, rounded])
            //   // };
            //   // sortable.sort(function(a,b){
            //   //   return b[1] - a[1];
            //   // });
            //   // console.log(sortable, "SORTABLE")
            //   // priarr.push(sortable[0]);
            //   // secarr.push(sortable[1]);
            // }
            // console.log(userarr, "USERARR")
            // console.log(ansarr, "ANSARR")
            // // console.log(priarr, "PRIARR")

            // context.setState({userarr: userarr});
            // // context.setState({priarr: priarr});
            // // context.setState({secarr: secarr});
            // context.setState({ansarr: ansarr});
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
        {this.state.showScore ? <Answers score={this.state.score} photos={imageDatas} answersdata={this.state.answers} /> : null}
      </Row>
      </Grid>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

 // <Answers userarr={this.state.userarr} priarr={this.state.priarr} secarr={this.state.secarr} ansarr={this.state.ansarr} score={this.state.score} photos={imageDatas} answersdata={this.state.answers} /> : null}
 //  {this.state.showScore ? <div >Your score is {this.state.score} out of {this.state.photos.length} </div> : null}
 // <Quiz imagelength={this.state.photos.length} score={this.state.score} onSelect={this.insert.bind(this)} />
 // <button onClick={this.nextImage.bind(this)} >Next </button> 
 // <List items={this.state.items}/>
 // https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tigress_at_Jim_Corbett_National_Park.jpg/220px-Tigress_at_Jim_Corbett_National_Park.jpg