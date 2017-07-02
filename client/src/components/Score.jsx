import React from 'react';
import { Link } from 'react-router-dom'


class Score extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    let { score, photos } = this.props

    return (
      <div>
      <div style={{ fontSize: 20 }}>You got {score} {score === 1 ? 'question' : 'questions'} right out of {photos.length} </div> 
      <p style={{textAlign: 'center'}}><Link to="/answers"><button className="compare-button" > Compare to Microsoft</button> </Link></p>
      </div>

    )
  }
}

export default Score

