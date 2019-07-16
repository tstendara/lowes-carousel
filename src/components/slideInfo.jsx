import React from "react";
import SaleInfo from "./saleInfo.jsx";
import styles from "../style/main.less";

const SlideInfo = props => (
  <div class={styles["slide-info"]}>
    <h5 id={`name-item${props.id}`} onClick={props.handleClick}>{props.name}</h5>
    <h6>
      <span class={styles["review-stars"]}>{"\uECE2\uECE2\uECE2\uECE1\uECE0"}</span>
      <span class={styles["small-text"]}>({Math.floor(Math.random() * 250)})</span>
    </h6>
    <h6 class={styles["price-text"]}>$$$$</h6>
    {props.sale ? <SaleInfo sale={props.sale} /> : null}
  </div>
);

export default SlideInfo;
