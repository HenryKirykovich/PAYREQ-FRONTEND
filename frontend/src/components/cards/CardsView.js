import React from "react";
import { Link } from "react-router-dom";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { PageHeading, PrimaryButton } from "../common";
import styles from "./AddCard.module.scss";
import { buildMaskedNumber, expireMonth } from "../../utils/card-utils";
import { injectIntl } from "react-intl";

const CardsView = ({cards, intl}) => {
    return (
        <React.Fragment>
            <PageHeading text="cards.listScreen.heading"/>

            <div className={styles.actionButtonsContainer}>
                <PrimaryButton data-testid="add-card-button"
                               label="cards.listScreen.addButtonLabel"
                               icon="plus"
                               linkTo={{pathname: "./cards/create"}}
                               disabled={false}
                />
            </div>

            <div className={styles.cardsContainer} data-testid="cards-view-cards">
                {cards.map(card => (
                    <div className={styles.cardPreview}>
                        <Link to={`./cards/${card.id}`}>
                            <Cards
                                cvc=""
                                expiry={`${expireMonth(card.expireMonth)}/${card.expireYear}`}
                                name={card.holderName}
                                number={buildMaskedNumber(card.scheme, card.last4Digits)}
                                issuer={card.scheme}
                                preview={true}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default injectIntl(CardsView);
