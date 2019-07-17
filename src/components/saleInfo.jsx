import React from "react";
import styles from "../style/main.less";

const SaleInfo = props => (
  <>
    <p className={styles["sale-text"]}>{props.sale}</p>
  </>
);

export default SaleInfo;
