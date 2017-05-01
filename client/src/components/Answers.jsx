import React from 'react';
import {Bootstrap, Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import $ from 'jquery';
// import QuestionEntry from './QuestionEntry.jsx';

var priarr = [];
var secarr = [];
var userarr = [];
var ansarr = [];

var parse = function(data){
  console.log(data, "DATA");
  for (var i=0; i<data.length; i++){
              userarr.push(data[i].useranswer);
              ansarr.push(data[i].answer);
              var apiobj = data[i].apianswer;
              var sortable = [];
              for (var key in apiobj){
                var rounded = Math.round(apiobj[key]*100);
                sortable.push([key, rounded])
              };
              sortable.sort(function(a,b){
                return b[1] - a[1];
              });
              priarr.push(sortable[0]);
              secarr.push(sortable[1]);
  }
}

const Answers = ({score, photos, answersdata}) => (
  <div className="answer"> 

  <div><Jumbotron> You got {score} questions right out of {photos.length} </Jumbotron></div> 
  {parse(answersdata)}
  <div className="table-responsive">
    <table className="table">
    <thead>
      <tr>
        <th> </th>
        <th> Answer </th>
        <th> Your Answer </th>
        <th> Microsoft's Primary Answer </th>
        <th> Microsoft's Secondary Answer </th>
      </tr>
    </thead>
    <tbody>
      
        {answersdata.map((ans, idx) => 
          <tr>
           <td> <img className="mini" src={ans.url}></img> </td>
           <td> {ansarr[idx]} </td>
           <td> {userarr[idx]} </td>
           <td id="ms"> {priarr[idx]} </td>
           <td id="ms"> {secarr[idx]} </td>
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