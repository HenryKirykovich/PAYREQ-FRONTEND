import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link, withRouter} from "react-router-dom";

import Loading from "../Loading";
import {FieldGroup, Number, PageHeading, SecondaryButton, LinkButton, DefaultButton} from "../common";
import {CARD_SCHEME_LABELS} from "../payments/payment-constants";
import styles from "./AutoPaymentsView.module.scss";
import DeleteAutoPaymentModal from "./DeleteAutoPaymentModal";
import TopButtonBar from "../TopButtonBar";
import {getCurrencySymbol} from "../../utils/currency-utils";

const getAutoPayment = (billerId, id, setAutoPayment) => {
    axios.get(`/data/auto-payments/${billerId}/${id}`)
        .then(({data}) => setAutoPayment(data.autoPayment));
};

const AutoPayment = ({match: {params: {id}}, billerId, intl}) => {
    const [autoPayment, setAutoPayment] = useState();
    const [deleteAutoPaymentModal, setDeleteAutoPaymentModal] = useState(false);

    useEffect(
        () => getAutoPayment(billerId, id, setAutoPayment),
        [billerId, id, setAutoPayment]
    );

    if (!autoPayment) return <Loading/>;

    return (
        <div>
            <PageHeading text="autoPayment.view.heading"/>
            <TopButtonBar>
                <DefaultButton label="autoPayment.view.backButton" icon="menu-left" linkTo="../auto-payments"/>
            </TopButtonBar>
            <FieldGroup className={styles.detailsContainer}>
                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.biller"})}
                                  value={autoPayment.billerName}/>
                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.accountNumber"})}
                                  value={autoPayment.accountNumber}/>
                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.card"})}
                                  value={<Link to={`../cards/${autoPayment.cardId}`}>{CARD_SCHEME_LABELS[autoPayment.scheme] + " ***" + autoPayment.last4Digits}</Link>}/>
                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.amountType"})}
                                  value={intl.formatMessage({id: autoPayment.amountType === "min" ? "autoPayment.form.amountType.min" : "autoPayment.form.amountType.total"})}/>
                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.debitLimit"}, {
                    currencyCode: autoPayment.currencyCode.toUpperCase(),
                    currencySymbol: getCurrencySymbol(autoPayment.currencyCode)
                })}
                                  value={autoPayment.debitLimit || autoPayment.debitLimit === 0 ?
                                      <Number value={autoPayment.debitLimit} type="currency"
                                              currency={autoPayment.currencyCode}/> : intl.formatMessage({id: "autoPayment.view.debitLimit.notSpecified"})}/>
                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.paymentDay"})}
                                  value={intl.formatMessage({id: "autoPayment.form.paymentDay." + autoPayment.paymentDay})}/>

            </FieldGroup>
            <div className={styles.buttonContainer} style={{marginTop: "1rem"}}>
                <SecondaryButton label="forms.generic.edit.button" linkTo={`./${id}/edit`}/>
                <LinkButton label="autoPayment.view.edit.delete"
                            onClick={() => setDeleteAutoPaymentModal(true)}/>
            </div>
            <DeleteAutoPaymentModal show={deleteAutoPaymentModal}
                                    onCancel={() => setDeleteAutoPaymentModal(false)}
                                    autoPayment={autoPayment}
                                    billerId={billerId}/>
        </div>
    )
};

export default withRouter(injectIntl(AutoPayment));
