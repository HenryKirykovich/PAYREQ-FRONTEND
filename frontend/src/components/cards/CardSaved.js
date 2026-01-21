import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { injectIntl } from "react-intl";
import { PageHeading, LargeText, PrimaryButton, LinkButton } from "../common";
import styles from "./AddCard.module.scss"
import { buildMaskedNumber, expireMonth } from "../../utils/card-utils";

const CardSaved = ({location: {state: {data: {card}}}, billerId, intl}) => {
    return (
        <div className={styles.container}>
            <PageHeading text="cards.cardSaved.heading"/>
            <div className={styles.cardPreview}>
                <Cards
                    cvc=""
                    expiry={`${expireMonth(card.expireMonth)}/${card.expireYear}`}
                    name={card.holderName}
                    number={buildMaskedNumber(card.scheme, card.last4Digits)}
                    issuer={card.scheme}
                    preview={true}
                />
            </div>
            <LargeText text="cards.cardSaved.autoPaymentPrompt"/>
            <div className={styles.actionButtonsContainer}>
                <LinkButton label="cards.cardSaved.backButtonLabel" linkTo="../cards" data-testid="back-to-manage-cards" />
                <PrimaryButton label="cards.createAutoPayment.buttonLabel" linkTo="../auto-payments/create" />
            </div>
        </div>
    );
};

export default injectIntl(CardSaved);
