import React from 'react';
import styles from "./SamlUnauthorised.module.scss";
import {LargeText} from "../common";
import {injectIntl} from "react-intl";
import LoginCard from "../Login/LoginCard";

const SamlUnauthorisedCard = ({code, history,intl}) => {
    return (
        <div className={styles.container}>
            <div className={styles.centerDiv}>

                <LoginCard heading="samlUnauthorised.error.heading" headingContainerStyles={styles.headingContainer} >
                    <LargeText text="samlUnauthorised.error.text" values={{code: code}}/>
                </LoginCard>
                   </div>
            </div>
    )
}

export default injectIntl(SamlUnauthorisedCard);
