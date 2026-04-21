import React from "react";
import { Link } from "react-router-dom";

import { Card, LargeText, PageHeading, PrimaryButton, RegularText } from "../../common";
import MobileAppUI from "../../MobileAppUI";
import WelcomeCardView from "../../Dashboard/WelcomeCard/WelcomeCardView";
import styles from "./BillersView.module.scss"
import BrowserUI from "../../BrowserUI";

const BillerCard = ({ biller }) => (
    <Link to={`./billers/${biller.billerActorId}`} aria-label={biller.billerName}>
        <Card hover>
            <div className={styles.billerCard}>
                <div className={styles.logoContainer}>
                    <img src={biller.logoPath} className={styles.logo} alt={`${biller.billerName} logo`} />
                </div>
                <div className={styles.detailsContainer}>
                    <LargeText>{biller.billerName}</LargeText>
                    {biller.pending && (
                        <div className={styles.statusRow}>
                            <LargeText>{biller.pending}</LargeText>
                            <RegularText text="registrations.billers.registeredAccounts.pending"
                                values={{ count: biller.pending }} />
                        </div>
                    )}
                    {biller.active && (
                        <div className={styles.statusRow}>
                            <LargeText>{biller.active}</LargeText>
                            <RegularText text="registrations.billers.registeredAccounts.active"
                                values={{ count: biller.active }} />
                        </div>
                    )}
                </div>
            </div>
        </Card>
    </Link>
);


export default function BillersView({
    billers,
    payerId,
}) {
    return (
        <React.Fragment>
            <PageHeading text="registrations.billers.pageHeading" />
            <MobileAppUI>
                {
                    (billers && billers.length === 0)
                        ? <WelcomeCardView billerId={payerId} />
                        : (
                            <div className={styles.buttonContainer}>
                                <PrimaryButton linkTo="./create" label="registrations.billers.addBiller.button" icon="plus" />
                            </div>
                        )
                }
            </MobileAppUI>
            <BrowserUI>
                <div className={styles.buttonContainer}>
                    <PrimaryButton linkTo={{pathname: "./create"}} label="registrations.billers.addBiller.button" icon="plus" />
                </div>
            </BrowserUI>
            <div className={styles.links}>
                {billers.length > 0 && billers.map(b => <BillerCard key={b.billerName} biller={b} />)}
                {billers.length === 0 && <LargeText text="registrations.billers.subHeading"/>}
            </div>
        </React.Fragment>
    );
}
