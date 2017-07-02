import React from 'react';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    }
  }

  handleFormSubmit(e){
    e.preventDefault();
    this.props.onSelect(this.state.selectedOption);
    this.setState({selectedOption: false});
  }

  handleOptionChange(e){
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    return ( 
      <div>
        <p> </p>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <div className="radio"><label><input type="radio" name="emotions" value="happiness" checked={this.state.selectedOption === 'happiness'} onChange={this.handleOptionChange.bind(this)} /> Happiness </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="sadness" checked={this.state.selectedOption === 'sadness'} onChange={this.handleOptionChange.bind(this)} /> Sadness </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="anger" checked={this.state.selectedOption === 'anger'} onChange={this.handleOptionChange.bind(this)} /> Anger </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="surprise" checked={this.state.selectedOption === 'surprise'} onChange={this.handleOptionChange.bind(this)} /> Surprise </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="contempt" checked={this.state.selectedOption === 'contempt'} onChange={this.handleOptionChange.bind(this)} /> Contempt </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="fear" checked={this.state.selectedOption === 'fear'} onChange={this.handleOptionChange.bind(this)} /> Fear </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="disgust" checked={this.state.selectedOption === 'disgust'} onChange={this.handleOptionChange.bind(this)} /> Disgust </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="neutral" checked={this.state.selectedOption === 'neutral'} onChange={this.handleOptionChange.bind(this)} /> Neutral </label></div>
          <button className="next-button" type="submit"> Next </button> 
        </form>
        
      </div>
    )
  }

}

export default Quiz; 

//<br /><div >Your score is {this.props.score} out of {this.props.imagelength} </div> 