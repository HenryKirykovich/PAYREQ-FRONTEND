import React from "react";
import {Card, DefaultButton, LargeText, PrimaryButton} from "../common";
import styles from "./MailUploaded.module.scss"
import {useAppState} from "../../state";


const MailUploaded = ({location}) => {
    const [{biller}] = useAppState()
    const jobIds = location.state.data.jobids;

    return <Card heading="mailUploaded.heading" className={styles.card}>
        <LargeText text="mailUploaded.message" values={{jobIds: jobIds.join(", ")}} />
        <div className={styles.buttons}>
            <DefaultButton label="mailUploaded.backButton" icon="menu-left" linkTo="./"/>
            <PrimaryButton label="mailUploaded.viewButton" className={styles.viewButton} onClick={() => window.document.location = `/portal/customer/biller/${biller.id}/jobs`}/>
        </div>
    </Card>
}

export default MailUploaded;
