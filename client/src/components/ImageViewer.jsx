import React from 'react';

const ImageViewer = ({image}) => (
  <div>
    <img src={`../../images/${image}`}></img>
  </div>
)

export default ImageViewer;