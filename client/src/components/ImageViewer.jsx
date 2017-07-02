import React from 'react';

const ImageViewer = ({image}) => (
  <div className="image-viewer"
        style={{ background: "url('"+ image.url +"')" }}>
  </div>
)

export default ImageViewer;

