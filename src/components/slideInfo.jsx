import React from "react";
import SaleInfo from "./saleInfo.jsx";

const SlideInfo = props => (
  <div class="slideInfo">
    <h5>{props.name}</h5>
    <h6>
      <span class="reviewStars">{"\uECE2\uECE2\uECE2\uECE1\uECE0"}</span>
      <span class="smallText">({Math.floor(Math.random() * 250)})</span>
    </h6>
    <h6>$$$$</h6>
    {props.sale ? <SaleInfo sale={props.sale} /> : null}
  </div>
);

export default SlideInfo;
