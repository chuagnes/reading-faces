import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';
import Home from './components/Home.jsx';
// import Base from './components/Base.jsx';
// import About from './components/About.jsx';

// import Answers from './components/Answers.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render () {

    const LandingPage = () => (
      <div>
        <div><img className="home-cover" src='https://media.giphy.com/media/RjlBDmRh4gpvW/giphy.gif' /></div>
        <div className="home-text">
          
          <p className="home-header">Micro·Expressions</p> 
          <p className="home-subheader">Our faces make brief, involuntary movements that reveal how we feel. These microexpressions are often subtle and difficult to observe. Take a quiz and compare your results to an AI machine that has been trained with thousands of photos!   </p>
         
          <p><Link to='/home'><button className="home-button">Read Faces! </button></Link></p>
        </div>

      </div>

    )

    return (
    <div>
        
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />

        

    </div>
    )
  }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));

// componnt will mount---inserts into db

// // console.log(imageAnswers, "FROM INDEX JSX");
//     // console.log(imageDatas, "FROM EXTERNAL FILE")
//     for (var i=0; i<imageDatas.length; i++){
//       (function(i) {
//       var image=imageDatas[i];
//       $.ajax({
//         url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', 
//         headers: {
//           "Ocp-Apim-Subscription-Key": "2cf65548bee441bf90838571a7621609"
//         },
//         type: "POST",
//         data: JSON.stringify({"url": image.url}),
//         contentType: 'application/json',
//         success: (data) => {
//           console.log(data, "DATA")
//           return data
//         },
//         error: (err) => {
//           console.log('err', err);
//         }
//       })
//       .then(data => {
//         var mscores = data[0].scores;
//         var imgname = image.imagename;
//         var url = image.url;
//         console.log(url, "URL")

//         for (var key in mscores){
//           if (mscores[key] < 0.05){
//             delete mscores[key]
//           }
//         };
//         var apiobj = {
//           id: image.id,
//           imagename: imgname,
//           apianswer: mscores,
//           answer: image.answer, 
//           url: url
//         };

//         console.log(apiobj, "APIBOJ")
//         return apiobj;
//         //apiresponses.push([imgname, mscores]);
//         //console.log(apiresponses, "APIRESPONSES")
//       })
//       .then(apiobj => {
//         // console.log(apiobj, "APIOBJ");
//         $.post('/quizrender', apiobj)
//       })
//       .fail(({responseJSON}) => {
//         responseJSON.error.errors.forEach((err) =>
//           console.error(err)
//         );
//       })
//     })(i);
//     }

  //   $.post('/quizrender', imageAnswers)
  //   .then(() =>{
  //      console.log("inserted answers")
  //   })
  //   .fail(({responseJSON}) => {
  //     responseJSON.error.errors.forEach((err) =>
  //       console.error(err)
  //     );
  //   })

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

  // nextImage(){
  //   // this.setState({photoidx: photoidx++});
  //   photoidx++; 
  //   if (photoidx < imageData.length){
  //     this.setState({currentPhoto: imageData[photoidx]})
  //   } else {
  //     alert("Reached End of Photos")
  //   }
    
  // }

 // <Answers userarr={this.state.userarr} priarr={this.state.priarr} secarr={this.state.secarr} ansarr={this.state.ansarr} score={this.state.score} photos={imageDatas} answersdata={this.state.answers} /> : null}
 //  {this.state.showScore ? <div >Your score is {this.state.score} out of {this.state.photos.length} </div> : null}
 // <Quiz imagelength={this.state.photos.length} score={this.state.score} onSelect={this.insert.bind(this)} />
 // <button onClick={this.nextImage.bind(this)} >Next </button> 
 // <List items={this.state.items}/>
 // https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tigress_at_Jim_Corbett_National_Park.jpg/220px-Tigress_at_Jim_Corbett_National_Park.jpg