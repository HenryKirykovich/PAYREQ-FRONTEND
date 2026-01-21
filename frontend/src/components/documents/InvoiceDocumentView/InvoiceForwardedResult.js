import React, {useEffect, useState} from "react";
import axios from "axios";

import {withRouter} from "react-router-dom";

import {Card, LinkButton, PageHeading, PrimaryButton, RegularText} from "../../common";
import styles from "./InvoiceForwardedResult.module.scss";

import Loading from "../../Loading";

const onSubmitNext = (invoice, setSubmitting, setNoMoreInvoices, history) => {
    setSubmitting(true);
    axios.get(
        `/data/invoices/${invoice.payerActorId}/forwarding/next-invoice-failed-forwarding?invoice-id=${invoice.id}`
    )
        .then(({data}) => {
            if (data.success) {
                if(data.nextInvoice != null){
                    history.push({pathname: `../${data.nextInvoice}`});
                } else {
                    setNoMoreInvoices(true);
                }
            }
        })
        .finally(() => setSubmitting(false));
};

const getDocument = (invoiceId, setResponse) => {
    axios.get(`/data/invoices/${invoiceId}`)
        .then(({data}) => setResponse(data));
};

const NoMoreFailedForwardingCard = ({invoice}) => {
    return (
        <Card heading="invoice.forwarded.noMore.title">
            <RegularText text="invoice.forwarded.noMore.message"/>
            <LinkButton label="invoice.payroll.view.back.button.label"
                        linkTo={`/portal/customer/biller/${invoice.payerActorId}/inbox`}
                        icon="menu-left"/>
        </Card>
    );
};

const MaxSendsReachedCard = ({invoice}) => {
    return (
        <Card heading="invoice.forwarded.tooMany.title">
            <RegularText text="invoice.forwarded.tooMany.message"/>
            <LinkButton label="invoice.forwarded.backToBill"
                        linkTo={`../${invoice.id}`}
                        icon="menu-left"/>
        </Card>
    );
};

const FailedForwardingCard =  ({invoice}) => {
  return (
      <Card heading="invoice.forwarded.failed.title">
          <RegularText text="invoice.forwarded.failed.message"
                       values={{invoiceNo: invoice.invoiceNo,
                           displayName: invoice.invoiceForwardingResult.displayName}}/>
          <LinkButton label="invoice.forwarded.backToBill"
                      linkTo={`../${invoice.id}`}
                      icon="menu-left"/>
      </Card>);
};

const SuccessfulForwardingCard = ({invoice, isSubmitting, setSubmitting, setNoMoreInvoices, history}) => {
    return (<Card heading="invoice.forwarded.success.title">
        <RegularText text="invoice.forwarded.success.message"
                     values={{invoiceNo: invoice.invoiceNo,
                         displayName: invoice.invoiceForwardingResult.displayName}}/>
        <div className={styles.buttons}>
            <LinkButton label="invoice.forwarded.backToBill"
                        linkTo={`../${invoice.id}`}
                        icon="menu-left"/>
            <PrimaryButton label="invoice.forwarded.success.nextBill"
                           onClick={() => onSubmitNext(invoice, setSubmitting, setNoMoreInvoices, history)}
                           disabled={isSubmitting}/>
        </div>
    </Card>);
};


const InvoiceForwardedResult = ({match: {params: {invoiceId}}, location: {state}, history}) => {
    const [response, setResponse] = useState();
    const [isSubmitting, setSubmitting] = useState(false);
    const [noMoreInvoices, setNoMoreInvoices] = useState( false);

    useEffect(
        () => getDocument(invoiceId, setResponse),
        [invoiceId, setResponse]
    );
    if (!response) return <Loading/>;

    const {invoice} = response;

    return (
        <React.Fragment>
            <PageHeading text="invoice.forwarded.heading"/>
            <div className={styles.pageContainer}>
                <div className={styles.resultDetailsContainer}>
                    {(!noMoreInvoices && !state.data.maxSendsReached && invoice.invoiceForwardingResult.status === "sent") &&
                        <SuccessfulForwardingCard invoice={invoice} setSubmitting={setSubmitting} isSubmitting={isSubmitting}
                                                  setNoMoreInvoices={setNoMoreInvoices} history={history}/>}
                    {(!noMoreInvoices && !state.data.maxSendsReached && invoice.invoiceForwardingResult.status !== "sent") &&
                        <FailedForwardingCard invoice={invoice}/>}
                    {state.data.maxSendsReached && <MaxSendsReachedCard invoice={invoice}/>}
                    {noMoreInvoices && <NoMoreFailedForwardingCard invoice={invoice} />}
                </div>
            </div>

        </React.Fragment>);
};

export default withRouter(InvoiceForwardedResult);
