import React from "react";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import styles from "./InboxView.module.scss";
import {Card, LargeText, RegularText} from "../common";
import CardLogoContainer from "./CardLogo";

const LetterCardMainBody = injectIntl(({ariaLabel, billerName, billerCustomerNumber, intl}) => (
        <div className={styles.mainBody}>
            <LargeText>{ariaLabel}</LargeText>
            <RegularText>{billerName}, {intl.formatMessage({id: "bill.card.customerReference"}, {reference: billerCustomerNumber})}</RegularText>
        </div>
    )
);

const LetterCard = ({document, intl}) => {
    const formattedReceivedDate = intl.formatDate(new Date(document.receivedTime))
    const ariaLabel = intl.formatMessage({id: "letter.card.ariaLabel"}, {
        formattedReceivedDate,
    });
    return (
        <Link to={`./inbox/${document.id}`}
              aria-label={ariaLabel}>
            <Card hover className={styles.card}>
                <CardLogoContainer logoPath={document.logoPath} billerName={document.billerName}/>
                <LetterCardMainBody formattedReceivedDate={formattedReceivedDate}
                                    ariaLabel={ariaLabel}
                                    billerName={document.billerName}
                                    billerCustomerNumber={document.billerCustomerNumber}
                />
            </Card>
        </Link>)
};

export default injectIntl(LetterCard);