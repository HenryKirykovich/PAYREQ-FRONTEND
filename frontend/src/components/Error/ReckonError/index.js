import React from "react";
import styles from "./ReckonError.module.scss";
import LoginCard from "../../Login/LoginCard";
import {DefaultButton, LargeText} from "../../common";
import {useAppState} from "../../../state";

const ReckonError = () => {
    const [{biller}] = useAppState();
    return <div className={styles.container}>
        <div className={styles.centerDiv}>
            <LoginCard heading="reckonError.error.heading" headingContainerStyles={styles.headingContainer} >
                <LargeText text="reckonError.error.text" className={styles.errorMessage}/>
                <DefaultButton label="reckonError.error.backButton" onClick={() => window.location.href = `/customer#/biller/${biller.id}/settings/connections`}/>
            </LoginCard>
        </div>
    </div>;
}


export default ReckonError;
