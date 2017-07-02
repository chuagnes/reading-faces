import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';
import Base from './components/Base.jsx';
import About from './components/About.jsx';
import Nav from './components/Nav.jsx'
import Answers from './components/Answers.jsx';
import ImageUpload from './components/ImageUpload.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

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
      <Nav />
        <Route exact path='/' component={LandingPage} />
        <Route path='/about' component={About} />
        <Route exact path='/home' component={Base} />
        <Route path='/answers' component={Answers} />
        <Route path='/analyze' component={ImageUpload} />

        

    </div>
    )
  }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));


 