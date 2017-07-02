import React from 'react';

const About = () => (
  <div className="container">
  <div className="answerbox">
  <a href="https://github.com/chuagnes/reading-faces"><img className="fork" style={{position: 'absolute', zIndex: 1031, top: 0, left: 0, border: 0}} src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></img></a>
  <div className="row aboutheader"> About: </div>
  <div className="strip"></div>
  <div style={{ fontSize: 20, margin: 0 }} className="row">
    <p style={{marginTop: 10, marginBottom: 20}}><em> Reading Faces </em> trains you to recognize underlying emotions, which are often subtle and flash for a brief moment. </p>
    <p style={{marginTop: 20, marginBottom: 20}}> In his research, <a href="http://www.paulekman.com/micro-expressions/"> Dr. Paul Ekman </a> identified 7 emotions which are universal to all 
    people, no matter their culture. Each of these emotions have tell-tale signs. For example, a "surprised" face is indicated by raised eyebrows and widened eyes. </p>
    <p style={{marginTop: 20, marginBottom: 20}}> Machines can also be trained to measure physical signs of emotions. Although <a href="https://azure.microsoft.com/en-us/services/cognitive-services/emotion/">Microsoft's Emotions API</a> performs well on expressive faces, it isn't perfect when it comes to micro-expressions. 
    Microsoft's Emotions API marks most micro-expressions as "neutral."
    </p>
  </div>
  <div className="row aboutheader"> Built with: </div>
  <div className="strip"></div>
  <div style={{ fontSize: 20, margin: 0 }} className="row">
    <p> React / React Router / React-Dropzone / Webpack
    <br /> Microsoft Cognitive Services Emotions API
    <br /> CSS / Bootstrap / Google Fonts  
    <br />  MongoDB / Mongoose 
    <br /> AWS S3 / Heroku 
    <br /> Node / Express 
    </p>
  </div>

  <div className="row aboutheader"> Contact: </div>
  <div className="strip"></div>
  <div style={{ fontSize: 20, margin: 0 }} className="row">
    <p> Agnes Chu </p>
    <p> <a href="https://www.linkedin.com/in/agnes-chu-95809213"><img className="logo" src="https://maxcdn.icons8.com/Share/icon/p1em/Logos//linkedin1600.png"></img></a>
    <a href="mailto:agnes.p.chu@gmail.com"><img className="maillogo" src="http://images.clipartpanda.com/email-icon-vector-office-icons-mail-free-stock-vector.jpg"></img></a>
    <a href="https://github.com/chuagnes"><img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSi-MBWa14Y7OCE836FtlW4McAxmodOJ0Q4zRBNz_RQiHu58D7-F5IK1_S"></img></a>
    </p>
    
  </div>


  </div>
  </div>
)

export default About