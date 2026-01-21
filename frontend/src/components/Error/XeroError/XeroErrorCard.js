import React from 'react';
import styles from "./XeroError.module.scss";
import {LargeText} from "../../common";
import {injectIntl} from "react-intl";
import LoginCard from "../../Login/LoginCard";

const XeroErrorCard = ({code, history,intl}) => {
    return (
        <div className={styles.container}>
            <div className={styles.centerDiv}>
                <LoginCard heading="xeroError.error.heading" headingContainerStyles={styles.headingContainer} >
                    <LargeText text="xeroError.error.text" values={{code: code}}/>
                </LoginCard>
                   </div>
            </div>
    )
}

export default injectIntl(XeroErrorCard);
