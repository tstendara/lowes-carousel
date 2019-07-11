import React from "react";
import SlideImage from "./slideImage.jsx";
import SlideInfo from "./slideInfo.jsx";

const Slide = props => (
  <div class="slide">
    <SlideImage image={props.image} index={props.index} />
    <SlideInfo sale={props.sale} />
  </div>
);

export default Slide;
