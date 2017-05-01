import React from 'react';

const ImageViewer = ({image}) => (
  <div>
    <img src={image.url}></img>
  </div>
)

export default ImageViewer;

 // <img src={`./images/${image}`}></img>