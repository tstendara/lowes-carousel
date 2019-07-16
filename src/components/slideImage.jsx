import React from "react";
import styles from "../style/main.less";
// import "../style/ajax-loader.gif";

const SlideImage = props => (
  <div class={styles['slide-image']}>
    <img src={props.src} alt={props.alt} />
  </div>
);

export default SlideImage;
