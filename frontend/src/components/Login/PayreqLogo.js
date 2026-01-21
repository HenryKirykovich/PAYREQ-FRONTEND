import React from "react";
import styles from "./PayreqLogo.module.scss";

import payreqLogo from "../../resources/images/payreq_logo.svg";


const PayreqLogo = ({intl}) => {

    return (
        <div className={styles.payreqLogoContainer}>
            <img className={styles.payreqLogo} src={payreqLogo} alt={intl.formatMessage({id: "login.logo.alt"})}/>
        </div>
    );
};

export default PayreqLogo;
