import React from "react";
import SlideImage from "./slideImage.jsx";
import SlideInfo from "./slideInfo.jsx";

const Slide = props => (
  <div class="slide">
    <SlideImage src={props.image.src} alt={props.image.alt} index={props.index} />
    <SlideInfo name={props.image.name} sale={props.sale} />
  </div>
);

export default Slide;
