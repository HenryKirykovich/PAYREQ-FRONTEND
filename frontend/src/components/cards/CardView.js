import React, {useState} from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { DefaultButton, FieldGroup, LinkButton, PageHeading } from "../common";
import styles from "./AddCard.module.scss";
import { buildMaskedNumber, expireMonth } from "../../utils/card-utils";
import DeleteCardModal from "./DeleteCardModal";
import UpdateExpiryModal from "./UpdateExpiryModal";
import TopButtonBar from "../TopButtonBar";

const CardView = ({card, billerId}) => {
    const maskedNumber = buildMaskedNumber(card.scheme, card.last4Digits);
    const expiry = `${expireMonth(card.expireMonth)}/${card.expireYear}`;
    const [editExpirtyModal, setEditExpiryModal] = useState(false);
    const [deleteCardModal, setDeleteCardModal] = useState(false);
    return (
        <div>
            <UpdateExpiryModal show={editExpirtyModal}
                               onCancel={() => setEditExpiryModal(false)}
                               card={card}
                               billerId={billerId}/>
            <DeleteCardModal show={deleteCardModal}
                             onCancel={() => setDeleteCardModal(false)}
                             card={card}
                             billerId={billerId}/>
            <PageHeading text="cards.viewCard.heading"/>
            <TopButtonBar>
                <DefaultButton label="cards.viewCard.back.button" icon="menu-left" linkTo="../cards"/>
            </TopButtonBar>
            <div className={styles.viewCardDetailsContainer}>
                <div>
                    <Cards
                        cvc=""
                        expiry={expiry}
                        name={card.holderName}
                        number={maskedNumber}
                        issuer={card.scheme}
                        preview={true}
                    />
                </div>
            </div>

            <div>
                <FieldGroup fields={[
                    {label: "cards.viewCard.holderName", value: card.holderName},
                    {label: "cards.viewCard.number", value: maskedNumber},
                    {label: "cards.viewCard.expiry", value: expiry},
                ]}/>
                <div className={styles.cardActionsContainer}>
                    <LinkButton data-testid="delete-card-button"
                                label="cards.viewCard.deleteButton"
                                onClick={() => setDeleteCardModal(true)}/>
                </div>
            </div>
        </div>

    );
};

export default CardView;
