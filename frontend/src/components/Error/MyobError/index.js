import React from "react";
import styles from "./MyobError.module.scss";
import LoginCard from "../../Login/LoginCard";
import {DefaultButton, LargeText} from "../../common";
import {useAppState} from "../../../state";

const MyobError = () => {
    const [{biller}] = useAppState();
    return <div className={styles.container}>
        <div className={styles.centerDiv}>
            <LoginCard heading="myobError.error.heading" headingContainerStyles={styles.headingContainer} >
                <LargeText text="myobError.error.text" className={styles.errorMessage}/>
                <DefaultButton label="myobError.error.backButton" onClick={() => window.location.href = `/customer#/biller/${biller.id}/settings/connections`}/>
            </LoginCard>
        </div>
    </div>;
}


export default MyobError;
