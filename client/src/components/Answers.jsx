import React from 'react';
import {Bootstrap, Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import $ from 'jquery';


class Answers extends React.Component {
  constructor(props){
    super(props)

    this.state={ answers: [] }

  }

  componentWillMount(){
    var context = this;
    $.get('/score', function(data){
        context.setState({answers: data})
    })
  }

  render(){

    var userans = [], correctans = [], apians = [];

    const parse = function(data){

      //sort the data, which was returned asynch, by id
      data = data.sort(function(a,b){
        return a.id - b.id
      })

      for (var i=0; i<data.length; i++){
        userans.push(data[i].useranswer);
        correctans.push(data[i].answer);

        // rank the api sentiments 
        var apiobj = data[i].apianswer;
        var sortable = [];
        for (var key in apiobj){
          var rounded = Math.round(apiobj[key]*100);
          sortable.push([key, rounded])
        };
        sortable.sort(function(a,b){
          return b[1] - a[1];
        });

        sortable.forEach(function(sentiment, idx){
          var text = sentiment[0] + ': ' + sentiment[1] + '%';
          sortable[idx] = text 
        })

        apians.push(sortable)
      }
    }

    parse(this.state.answers)

    return (
      <div className="container"> 
      <div className="answerbox">

      <div className="table-responsive">
        <table className="answerstable">
        <thead>
            <th> </th>
            <th> Answer </th>
            <th> Your Response </th>
            <th> Microsoft's Response<sup>1</sup> </th>   
        </thead>
        
        {this.state.answers.map((ans, idx) => 
              <tbody>
              <tr>
               <td rowSpan={9}> <img className="mini" src={ans.url}></img> </td>
               <td rowSpan={9}> {correctans[idx]} </td>
               <td rowSpan={9}> {userans[idx]} </td>
               <td className="ts"> {apians[idx][0]} </td>
              </tr> 
              <tr>
                <td className="sr"> {apians[idx][1]} </td>
              </tr>
              <tr>
                <td className="sr"> {apians[idx][2]} </td>
              </tr>
              <tr>
                <td className="sr"> {apians[idx][3]} </td>
              </tr>
              <tr>
                <td className="sr"> {apians[idx][4]} </td>
              </tr>
              <tr>
                <td className="sr"> {apians[idx][5]} </td>
              </tr>
              <tr>
                <td className="sr"> {apians[idx][6]} </td>
              </tr>
              <tr>
                <td className="sr"> {apians[idx][7]} </td>
              </tr>
              <tr>
                <td className="bs"> {apians[idx][8]} </td>
              </tr>
        </tbody>

            )}
          
          

            
          
        </table>
      </div>

      <div><p><sup>1</sup> 
        <a href="https://azure.microsoft.com/en-us/services/cognitive-services/emotion/">Microsoft's Cognitive Services Emotion API </a>
        evaluates each face based upon 7 emotions, which are identified by<a href="http://www.paulekman.com/micro-expressions/"> Dr. Paul Ekman's </a>
        research as cross-culturally universal to all people, and adds an additional "neutral" emotion. The emotion scores are normalized to sum to one.  
        As you'll notice, Microsoft's Emotions API considers "neutral" to be the dominant emotion for a majority of the micro-expressions, which are subtle. 
        However, Microsoft does give us its thoughts on the second-most dominant emotion. For the purposes of scoring Microsoft's Emotions API on micro-expressions, we can consider 
        both the most-dominant and second-most dominant emotion. 
      </p>
      </div>


      </div>
      </div>
  )
  }
}

export default Answers;

