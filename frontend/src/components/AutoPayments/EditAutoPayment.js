import React, {useEffect, useState} from "react";
import axios from "axios";

import {PageHeading, VerticalLayout} from "../common";
import AutoPaymentForm from "./AutoPaymentForm";
import {withRouter} from "react-router-dom";
import {getCards} from "../../utils/card-utils";
import {SET_ALERT} from "../../state/reducers/alertReducer";
import {useAppState} from "../../state";

const getSelectedCard = (autoPayment, state) => {
    if (state && state.data.card) { //card added during auto payment creation/edit
        return state.data.card.id
    }
    return autoPayment.cardId;
};

const onSubmit = (billerId, autoPaymentId, dispatch, history, values, successPath, setServerErrors, setSubmitting) => {
    return axios.put(
        `/data/auto-payments/${billerId}/${autoPaymentId}`,
        values)
        .then(({data}) => {
            if (data.success === false) {
                setServerErrors(data.errors);
                setSubmitting(false)
            } else {
                dispatch({type: SET_ALERT, alert: {level: "success", text: "autoPayment.saved.heading"}});
                if (successPath) {
                    history.push(successPath);
                } else {
                    history.push({pathname: `../${autoPaymentId}`, state: {data}})
                }
            }
        })
};

const getAutoPayment = (billerId, id, setAutoPayment) => {
    axios.get(`/data/auto-payments/${billerId}/${id}`,)
        .then(({data}) => setAutoPayment(data.autoPayment));
};

const EditAutoPayment = ({billerId, match: {params: {id}}, location: {state, cancelPath, successPath}, history}) => {
    const [autoPayment, setAutoPayment] = useState();
    const [cards, setCards] = useState();
    const [serverErrors, setServerErrors] = useState();
    const [, dispatch] = useAppState();
    useEffect(() => getCards(billerId, setCards), [billerId]);

    useEffect(
        () => getAutoPayment(billerId, id, setAutoPayment),
        [billerId, id, setAutoPayment]
    );

    const addCardRedirectPath = autoPayment && `../auto-payments/${autoPayment.id}/edit`;
    const cancelLink = cancelPath ? cancelPath : autoPayment && `../${autoPayment.id}`;

    return (
        <VerticalLayout half>
            <PageHeading text="autoPayment.edit.heading"/>
            <AutoPaymentForm billerId={billerId}
                             cards={cards}
                             onSubmit={(values, {setSubmitting}) => onSubmit(billerId, id, dispatch, history, values, successPath, setServerErrors, setSubmitting)}
                             initialValues={{...autoPayment,
                                 cardId: autoPayment && getSelectedCard(autoPayment, state)}}
                             isLoading={!autoPayment}
                             isCreationForm={false}
                             formErrors={serverErrors}
                             cancelLink={cancelLink}
                             addCardLink={autoPayment && {
                                 pathname: "../../cards/create",
                                 state: {pathOnSuccess: addCardRedirectPath, cancelPath: addCardRedirectPath}
                             }}
            />
        </VerticalLayout>
    );
};

export default withRouter(EditAutoPayment);
