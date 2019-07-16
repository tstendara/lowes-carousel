import React from "react";
import SlideImage from "./slideImage.jsx";
import SlideInfo from "./slideInfo.jsx";
import styles from "../style/main.less";
import "../style/slide.css";

const Slide = props => (
  <div class={styles["slide"]}>
    <SlideImage
      src={props.image.src}
      alt={props.image.alt}
      id={props.image.id}
      handleClick={props.handleClick}
    />
    <SlideInfo
      name={props.image.name}
      sale={props.sale}
      id={props.image.id}
      handleClick={props.handleClick}
    />
  </div>
);

export default Slide;
