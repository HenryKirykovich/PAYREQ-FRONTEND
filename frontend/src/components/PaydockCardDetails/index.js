import React from "react";
import styles from "../payments/PaymentForm/PaymentForm.module.scss";

const PayDockCardDetails = ({id}) => (
    <div id={id} className={styles.cardEntry}
         widget-style="background-color: #FFFFFF; button-color: rgba(27, 24, 80, 1); text-color: rgb(51, 51, 51); font-size: 15px;"/>
);

export default PayDockCardDetails;