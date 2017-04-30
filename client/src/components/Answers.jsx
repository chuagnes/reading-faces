import React from 'react';
import {Bootstrap, Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import $ from 'jquery';
// import QuestionEntry from './QuestionEntry.jsx';

var apiarr = [];
var userarr = [];

const Answers = ({score, photos, answersdata}) => (
  <div className="answer"> 
  {answersdata.forEach(function(el, idx){
    apiarr.push(el["apianswer"]);
    userarr.push(el["useranswer"]);
  })}
  <div><Jumbotron> You got {score} questions right out of {photos.length} </Jumbotron></div> 
  
  <div className="table-responsive">
    <table className="table">
    <thead>
      <tr>
        <th> </th>
        <th> Your Answer </th>
        <th> API Answer </th>
      </tr>
    </thead>
    <tbody>
      
        {photos.map((photo, idx) => 
          <tr>
           <td> <img className="mini" src={`./images/${photo}`}></img> </td>
           <td> {userarr[idx]} </td>
           <td> {apiarr[idx]} </td>
          </tr> 
        )}
      
    </tbody>
    </table>
  </div>

  </div>
);

export default Answers;


// {photos.map((photo, idx) => 
//           <QuestionEntry key={photo} photo={photo} useranswer={userarr[idx]} apianswer={apiarr[idx]} />
//         )}