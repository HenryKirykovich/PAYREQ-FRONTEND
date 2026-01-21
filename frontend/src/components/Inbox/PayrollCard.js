import React from "react";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import styles from "./InboxView.module.scss";
import {Card, LargeText, RegularText} from "../common";
import CardLogoContainer from "./CardLogo";

const PayrollCardMainBody = injectIntl(({ariaLabel, billerName, intl}) => (
        <div className={styles.mainBody}>
            <LargeText>{ariaLabel}</LargeText>
            <RegularText>{billerName}</RegularText>
        </div>
    )
);

const PayrollCard = ({document, intl}) => {
    const formattedReceivedDate = intl.formatDate(new Date(document.receivedTime))
    const ariaLabel = intl.formatMessage({id: "payroll.card.ariaLabel"}, {
        description: document.description,
        formattedReceivedDate,
    });
    return (
        <Link to={`./inbox/${document.id}`}
              aria-label={ariaLabel}>
            <Card hover className={styles.card}>
                <CardLogoContainer logoPath={document.logoPath} billerName={document.billerName}/>
                <PayrollCardMainBody formattedReceivedDate={formattedReceivedDate}
                                     ariaLabel={ariaLabel}
                                     billerName={document.billerName}
                />
            </Card>
        </Link>)
};

export default injectIntl(PayrollCard);