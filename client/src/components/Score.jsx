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
      <div>You got {score} questions right out of {photos.length} </div> 
      <p><Link to="/answers"><button className="btn btn-primary btn-sm" > Compare to Microsoft</button> </Link></p>
      </div>

    )

  }

}

export default Score