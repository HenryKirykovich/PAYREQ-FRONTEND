import React from "react";
import styles from "../paymentHistory/detail/PaymentDetail.module.scss";
import {DefaultButton, PageHeading} from "../common";
import LargeText from "../common/text/LargeText";

const BackActionButton = ({label, linkTo}) => {
    return (
        <div className={styles.buttonContainer}>
            <DefaultButton linkTo={linkTo} label={label} icon="menu-left"/>
        </div>
    )
}

const DocumentError = () => {
    const linkToInbox = "../inbox"

    return (
        <>
            <PageHeading text="inbox.searchResultActions.documentError"/>
            <LargeText text="inbox.searchResultActions.documentNotFound" />
            <BackActionButton linkTo={linkToInbox} label="inbox.actions.returnToInbox"/>
        </>
    );
};

export default DocumentError;
