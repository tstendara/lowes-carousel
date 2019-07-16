import React from "react";
import "../../dist/style/main.less";

const SlideImage = props => (
  <div class="slide-image">
    <img src={props.src} alt={props.alt} />
  </div>
);

export default SlideImage;
