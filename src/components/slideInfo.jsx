import React from "react";
import SaleInfo from "./saleInfo.jsx";
import "../../dist/style/main.less";

const SlideInfo = props => (
  <div class="slide-info">
    <h5>{props.name}</h5>
    <h6>
      <span class="review-stars">{"\uECE2\uECE2\uECE2\uECE1\uECE0"}</span>
      <span class="small-text">({Math.floor(Math.random() * 250)})</span>
    </h6>
    <h6>$$$$</h6>
    {props.sale ? <SaleInfo sale={props.sale} /> : null}
  </div>
);

export default SlideInfo;
