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
          <div className="radio"><label><input type="radio" name="emotions" value="Joy" checked={this.state.selectedOption === 'Joy'} onChange={this.handleOptionChange.bind(this)} /> Joy </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="Sorrow" checked={this.state.selectedOption === 'Sorrow'} onChange={this.handleOptionChange.bind(this)} /> Sorrow </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="Anger" checked={this.state.selectedOption === 'Anger'} onChange={this.handleOptionChange.bind(this)} /> Anger </label></div>
          <div className="radio"><label><input type="radio" name="emotions" value="Surprise" checked={this.state.selectedOption === 'Surprise'} onChange={this.handleOptionChange.bind(this)} /> Surprise </label></div>
        
          <button className="btn btn-default" type="submit"> Submit </button>
        </form>
        
      </div>
    )
  }

}

export default Quiz; 