import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import ImageViewer from './components/ImageViewer.jsx';
import Quiz from './components/Quiz.jsx';
// var imgData = require('./imagedata.js');
// import imageData from './imagedata.js'

var imageData = [
  "Agnes Chu.jpg",
"Airyque Ervin.jpg",
"Alex Liang.jpg",
"Ali Elgiadi.jpg",
"Anthony Wong.jpg",
"Bariz Sudhanshu.jpg",
"Bill Beedle.jpg",
"Charles Kim.jpg",
"Chris Keating.jpg",
"David Gould.jpg",
"Doug Cox.jpg",
"Drew Bedford-Hart.jpg",
"Gunpreet Singh.jpg",
"He Liu.jpg",
"Jack Ren.jpg",
"Jeff Chen.jpg",
"Jim Lee.jpg",
"Joe Zizzo.jpg"
]

var photoidx = 0; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPhoto: imageData[0],
      photos: imageData, 
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  nextImage(){
    // this.setState({photoidx: photoidx++});
    photoidx++; 
    if (photoidx < imageData.length){
      this.setState({currentPhoto: imageData[photoidx]})
    } else {
      alert("Reached End of Photos")
    }
 
    
  }

  insert(option){
    console.log(`${option} was selected`);
    console.log(this.state.currentPhoto)
  }

  render () {
    return (<div>
      <h1>Headshot </h1>
      <ImageViewer image={this.state.currentPhoto}/>
      <Quiz onSelect={this.insert.bind(this)} />
      <button onClick={this.nextImage.bind(this)} >Next </button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

 
 // <List items={this.state.items}/>
 // https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tigress_at_Jim_Corbett_National_Park.jpg/220px-Tigress_at_Jim_Corbett_National_Park.jpg