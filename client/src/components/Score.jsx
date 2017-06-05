import React from 'react';

class Score extends React.Component {
  constructor(props){
    super(props)


  }


  render(){

    let { score, photos } = this.state

    return (
      <div><Jumbotron> You got {score} questions right out of {photos.length} </Jumbotron></div> 


    )

  }

}

export default Score