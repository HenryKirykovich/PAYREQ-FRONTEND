import * as React from 'react';

import styles from "./FastFormConfirmationView.module.scss"

import {withRouter} from "react-router-dom";

import {PageHeading, LargeText, RegularText, SecondaryButton, Alert} from "../common";
import VerticalLayout from "../common/layout/VerticalLayout";
import {ALERT_TYPES} from "../common/alerts/Alert";




const FastFormConfirmationView = ({billerId, biller, code, hasMyBills}) => {
    return (
        <div className={styles.container}>
            <VerticalLayout>
                <img className={styles.logo} src={biller.logoPath} alt=""/>
                <PageHeading text="fastForm.registration.confirmation.heading" values={{tagName: biller.tagName}}/>
                <div className={styles.wrapper}>
                <div className={styles.detailText}>
                    <LargeText text="fastForm.registration.confirmation.detail" values={{tagName: biller.tagName}}/>
                </div>

                {hasMyBills === "false" && <div className={styles.buttonResendContainer}>
                    <RegularText text="fastForm.registration.confirmation.mybills.no"/>
                    <div className={styles.linkButton}>
                        <SecondaryButton label="fastForm.registration.confirmation.button.create"
                                         linkTo="/portal/sign-up"/>
                    </div>
                </div>}

                {hasMyBills  === "true" &&
                <div className={styles.buttonResendContainer}>
                    <RegularText text="fastForm.registration.confirmation.mybills.added"/>
                    <div className={styles.linkButton}>
                        <SecondaryButton label="fastForm.registration.confirmation.button.login"
                                    onClick={() => window.location.href = `/`}/>
                    </div>
                </div>}
                <Alert type={ALERT_TYPES.WARNING} className={styles.alert}>
                    <RegularText text="fastForm.registration.confirmation.warning"/>
                </Alert>
                </div>
            </VerticalLayout>
        </div>
    );
};



export default withRouter(FastFormConfirmationView);