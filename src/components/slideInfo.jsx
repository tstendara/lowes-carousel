import React from "react";
import SaleInfo from "./saleInfo.jsx";

const SlideInfo = props => (
  <div class="slideInfo">
    <h5>this is an item and it is really cool of course</h5>
    <h6>STARS from REVIEWS</h6>
    <h6>$$$$</h6>
    {props.sale ? <SaleInfo sale={props.sale} /> : null}
  </div>
);

export default SlideInfo;
