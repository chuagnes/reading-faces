import React from 'react';
import QuestionEntry from './QuestionEntry.jsx'

var apiarr = [];
var userarr = [];

const Answers = ({score, photos, answersdata}) => (
  <div>
  {answersdata.forEach(function(el, idx){
    apiarr.push(el["apianswer"]);
    userarr.push(el["useranswer"]);
  })}
  <div> You scored a {score} out of {photos.length} </div> 
  

  {photos.map((photo, idx) => 
    <QuestionEntry photo={photo} useranswer={userarr[idx]} apianswer={apiarr[idx]} />
  )}
  </div>
);

export default Answers;
