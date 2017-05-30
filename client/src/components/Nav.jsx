import React from 'react';
import { Link } from 'react-router-dom';
import About from './About.jsx';

const Nav = () => (

  <div className="Navigation">
    <nav className="navbar navbar-default navbar-fixed-top ">
      <div className="navbar-header">
          <a className="navbar-brand navbar-left" href="/"> Reading Faces </a>
      </div>
      <div className="container-fluid navbar-right">
        <ul className="nav navbar-nav">
          <li> <Link to="/home"> New Quiz </Link> </li>  
          <li> <Link to="/about"> About </Link> </li> 
        </ul>
      </div>
    </nav>
  </div>


)

export default Nav;