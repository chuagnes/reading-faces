import React from 'react';

const QuestionEntry = ({photo, useranswer, apianswer}) => (
  <div>
    <td>
      <img className="mini" src={`./images/${photo}`}></img>
    </td>
    <td>
      <h1>{apianswer}</h1>
    </td>
    <td>
      <h1>{useranswer}</h1>
    </td>
  </div>

);

export default QuestionEntry;

