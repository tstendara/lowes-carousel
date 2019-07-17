import React from "react";
import SaleInfo from "./saleInfo.jsx";
import styles from "../style/main.less";

const SlideInfo = props => (
  <div className={styles["slide-info"]}>
    <h5 id={`name-item${props.id}`} onClick={props.handleClick}>{props.name}</h5>
    <h6>
      <span className={styles["review-stars"]}>{renderStars(props.reviews[1])}</span>
      <span className={styles["small-text"]}>({props.reviews[0]})</span>
    </h6>
    <h6 className={styles["price-text"]}>$$$$</h6>
    {props.sale ? <SaleInfo sale={props.sale} /> : null}
  </div>
);

const renderStars = (starCount) => {
  let result = '';
  let fullStar = '\uECE2';
  let halfStar = '\uECE1';
  let emptyStar = '\uECE0';
  for (let i = 1; i < 6; i++) {
    let diff = starCount - i;
    if (diff >= 0.6) {
      result += fullStar;
    } else if (diff < 0.6 && diff > 0) {
      result += halfStar;
    } else {
      result += emptyStar;
    }
  }
  return result;
}

export default SlideInfo;
