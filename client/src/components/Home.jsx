import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';
import Base from './Base.jsx';
import About from './About.jsx';
import Answers from './Answers.jsx';
import Nav from './Nav.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render () {

    return (
    <BrowserRouter>
    <div>
      <Nav />
  
      
      <Route exact path='/home' component={Base} />
      <Route path='/about' component={About} />
      <Route path='/answers' component={Answers} />

         
    </div>
    </BrowserRouter>
    )
  }
}

export default Home