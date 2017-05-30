import React from 'react';

const ImageViewer = ({image}) => (
  <div className="image-viewer"
        style={{ background: "url('"+ image.url +"')" }}>
  </div>
)

export default ImageViewer;

 // <img src={`./images/${image}`}></img>

/*

 <div >
    <img className="image-viewer" src={image.url}></img>
  </div>

*/