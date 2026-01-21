import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {PageHeading, VerticalLayout} from "../common";
import AutoPaymentForm from "./AutoPaymentForm";
import {getCards} from "../../utils/card-utils";

const getSelectedCard = (cards, state) => {
    if (state && state.data && state.data.card) { //card added during auto payment creation/edit
        return state.data.card.id
    }
    return cards.length === 1 ? cards[0].id : ""
};

const onSubmit = (billerId, history, values, setServerErrors, setSubmitting) => {
    return axios.post(
        `/data/auto-payments/${billerId}`,
        values)
        .then(({data}) => {
            if (data.success === false) {
                setServerErrors(data.errors);
                setSubmitting(false)
            } else {
                history.push({pathname: "./auto-payment-saved", state: {data}})
            }
        })
};

const CreateAutoPayment = ({billerId, location: {state}, history}) => {
    const [cards, setCards] = useState();
    const [serverErrors, setServerErrors] = useState();
    useEffect(() => getCards(billerId, setCards), [billerId]);
    return (
        <VerticalLayout half>
            <PageHeading text="autoPayment.listScreen.createButtonLabel" showInWebview={true}/>
            <AutoPaymentForm billerId={billerId}
                             onSubmit={(values, {setSubmitting}) => onSubmit(billerId, history, values, setServerErrors, setSubmitting)}
                             cards={cards}
                             initialValues={{
                                 cardId: cards && "" + getSelectedCard(cards, state),
                                 billerActorId: state && state.billerActorId,
                                 accountNumber: state && state.accountNumber
                             }}
                             referrerState={state}
                             formErrors={serverErrors}
                             cancelLink="../auto-payments"
                             addCardLink={{
                                 pathname: "../cards/create",
                                 state: {pathOnSuccess: "../auto-payments/create", cancelPath: "../auto-payments/create"}
                             }}
            />
        </VerticalLayout>
    );
};

export default withRouter(CreateAutoPayment);
