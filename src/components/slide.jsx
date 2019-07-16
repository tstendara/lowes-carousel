import React from "react";
import SlideImage from "./slideImage.jsx";
import SlideInfo from "./slideInfo.jsx";
import styles from "../style/main.less";

const Slide = props => (
  <div class={styles["slide"]} onClick={props.handleClick}>
    <SlideImage
      src={props.image.src}
      alt={props.image.alt}
      index={props.index}
    />
    <SlideInfo name={props.image.name} sale={props.sale} />
  </div>
);

export default Slide;
