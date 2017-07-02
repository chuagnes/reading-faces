import React from 'react';
import Dropzone from 'react-dropzone';
const superagent = require('superagent/lib/client')

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imgsentiment: {
        "scores": {
          "anger": '',
          "contempt": '',
          "disgust": '',
          "fear": '',
          "happiness": '',
          "neutral": '',
          "sadness": '',
          "surprise": ''
        }
      }, 
      imgurl: '', 
      imgname: 'testing', 
      selectedOption: 'Select the correct emotion'
    }

    this.onDrop = this.onDrop.bind(this);
    this.addImageToQuiz = this.addImageToQuiz.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }


  onDrop(files, rejectedFiles) {
    var context = this;
    superagent
    .post('/upload')
    .attach('imgfile', files[0])
    .end((err, res) => {
      if (err){
        console.error(err);
      } else {
        console.log(res.body, "RECEIVED RES BODY")
        context.setState({ imgsentiment: res.body[2][0], imgurl: res.body[0], imgname: files[0].name })
      }
      
    })
  }

  addImageToQuiz(e){
    e.preventDefault();
    console.log(this.state.imgname, "IMAGE NAME")

    superagent
    .post('/newimage')
    .send({ "id": '', "imagename": this.state.imgname, "apianswer": this.state.imgsentiment["scores"], "answer": this.state.selectedOption, "useranswer": "", "url": this.state.imgurl })
    .end(function(err, res){
      if (err){
        console.error(err, "Error adding Image to DB")
      } else {
        window.alert("Success! Your image was added to the quiz")
      }
    })
  }

  handleOptionChange(e){
    this.setState({ selectedOption: e.target.value })
    console.log(this.state.selectedOption, "was selected")
  }

  render(){
    var sortable = [];
    
    console.log(this.state.imgsentiment, "sentiment")

    for (var emotion in this.state.imgsentiment["scores"]){
      var propernounEmotion = emotion.slice(0,1).toUpperCase()+emotion.slice(1);
      sortable.push([propernounEmotion, Math.round(this.state.imgsentiment.scores[emotion]*100)])
    }
    sortable.sort(function(a,b){
      return b[1] - a[1]
    })

    console.log(this.state.selectedOption, "SELECTED OPTION")

    return (
      <div className="container">
      <div className="image-uploader" >
        <div className="row">
          <Dropzone className="col-md-8 dropzone" multiple={false} accept="image/*" onDrop={this.onDrop}
           style={{ background: "url('"+ this.state.imgurl +"')" }}>
            { this.state.imgurl === '' ? <div className="placeholder">  Drop/Click to upload image 
            </div> : null } 
          </Dropzone>

          <div className="col-md-5 image-results">
            <div className="row addimgtext">
              Microsoft's Emotion API Analysis
            </div>
            <div className="row">
              <table className="uploadtable">
                <tbody>
                  <tr>
                    <td>{sortable[0][0]}</td>
                    <td>{sortable[0][1]+'%'}</td>
                  </tr>
                  <tr>
                    <td>{sortable[1][0]}</td>
                    <td>{sortable[1][1]+'%'}</td>
                  </tr>
                   <tr>
                    <td>{sortable[2][0]}</td>
                    <td>{sortable[2][1]+'%'}</td>
                  </tr>
                   <tr>
                    <td>{sortable[3][0]}</td>
                    <td>{sortable[3][1]+'%'}</td>
                  </tr>
                   <tr>
                    <td>{sortable[4][0]}</td>
                    <td>{sortable[4][1]+'%'}</td>
                  </tr>
                   <tr>
                    <td>{sortable[5][0]}</td>
                    <td>{sortable[5][1]+'%'}</td>
                  </tr>
                   <tr>
                    <td>{sortable[6][0]}</td>
                    <td>{sortable[6][1]+'%'}</td>
                  </tr>
                   <tr>
                    <td>{sortable[7][0]}</td>
                    <td>{sortable[7][1]+'%'}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          
            <div className="row addimgtext">
              Add your image to the Quiz! 
            </div> 
            <div className="row uploaddrops">
              <form onSubmit={this.addImageToQuiz}>
              <div className="col-md-10 emotion-upload-select">
                <select defaultValue={this.state.selectedOption} onChange={this.handleOptionChange}>
                  <option>Select correct answer</option>
                  <option value="anger"> Anger </option>
                  <option value="contempt"> Contempt </option>
                  <option value="disgust"> Disgust </option>
                  <option value="fear"> Fear </option>
                  <option value="happiness"> Happiness </option>
                  <option value="sadness"> Sadness </option>
                  <option value="surprise"> Surprise </option>
                  <option value="neutral"> Neutral </option>
                </select>
              </div>
            
              <div className="col-md-2">
                <button className="next-button" type="submit"> Add </button>
              </div>
              </form>
          </div>
          
        </div>
      </div>
      </div>
      </div>
    )
  }
}

export default ImageUpload;
