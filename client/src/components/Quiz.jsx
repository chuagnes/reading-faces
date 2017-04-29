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
    console.log("You have selected: ", this.state.selectedOption);
  }

  handleOptionChange(e){
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    return ( 
      <div>

        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <div className="radio"><label><input type="radio" name="emotions" value="joy" checked={this.state.selectedOption === 'joy'} onChange={this.handleOptionChange.bind(this)} /> Joy </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="sorrow" checked={this.state.selectedOption === 'sorrow'} onChange={this.handleOptionChange.bind(this)} /> Sorrow </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="anger" checked={this.state.selectedOption === 'anger'} onChange={this.handleOptionChange.bind(this)} /> Anger </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="surprise" checked={this.state.selectedOption === 'surprise'} onChange={this.handleOptionChange.bind(this)} /> Surprise </label></div>
          
          <button className="btn btn-default" type="submit"> Next </button>
        </form>
        
      </div>
    )
  }

}

export default Quiz; 

//<br /><div >Your score is {this.props.score} out of {this.props.imagelength} </div> 