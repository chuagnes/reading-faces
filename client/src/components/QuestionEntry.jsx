import React from 'react';

const QuestionEntry = ({photo, useranswer, apianswer}) => (
  <div>
    <img src={`./images/${photo}`}></img>
    <h1>{apianswer}</h1>
    <span>{useranswer}</span>
  </div>

);

export default QuestionEntry;

