import React, {useState} from "react";

import {injectIntl} from "react-intl";
import {Link, withRouter} from "react-router-dom";
import {
    Card, DangerButton, DefaultButton, LargeText, LinkButton, Number,
    PageHeading, PrimaryButton, RegularText
} from "../../common";
import styles from "./InvoiceDocumentView.module.scss"
import FieldGroup from "../../common/FieldGroup";

import DeliveredByDetailsCard from "../DeliveredByDetailsCard";
import PdfPreviewCard from "../PdfPreviewCard";
import ReturnToSenderConfirmationModal from "../Modals/ReturnToSenderConfirmationModal";

import {CARD_SCHEME_LABELS} from "../../payments/payment-constants";
import SetBillStatusToPaidConfirmationModal from "../Modals/SetBillStatusToPaidConfirmationModal";

import axios from "axios";
import PropertyMeUpdatePropertyForm from "./PropertyMeUpdatePropertyForm";

import BackToDocumentsButton from "../BackToDocumentsButton";

import {datesEqual, getDateAsUTCFormatted} from "../../../utils/date-utils";
import {showPayNowButton} from "../../../utils/payment-utils";

const LatestJobDownload = ({invoice, intl}) => {
    return (
        <React.Fragment>
            <RegularText className={styles.viewDownloadDiv} text="invoice.view.documentDetails.job" values={{downloadDate: intl.formatDate(invoice.latestDownload.updatedDate, {year: 'numeric', month: 'short', day: 'numeric'})}}/>
            <span><a className={styles.viewDownloadLink} href={`/customer#/biller/${invoice.payerActorId}/job/${invoice.latestDownload.jobId}`}>View Download</a></span>
        </React.Fragment>
    )
}

function getDownloadStatusMessage (intl, invoice, isDownloaded) {
    const {downloadStatus, latestDownload, updatedBy} = invoice;
    switch (true) {
        case ((downloadStatus || isDownloaded) === false):
            return intl.formatMessage({id: "invoice.view.documentDetails.awaitingDownload"});
        case latestDownload != null && latestDownload.jobId != null:
            return <LatestJobDownload intl={intl} invoice={invoice}/>;
        case latestDownload != null:
            return intl.formatMessage({id: "invoice.view.documentDetails.csv"},
                                {downloadDate: intl.formatDate(latestDownload.updatedDate, {year: 'numeric', month: 'short', day: 'numeric'}),
                                updatedBy: updatedBy});
        default:
            return intl.formatMessage({id: "invoice.view.documentDetails.downloaded"});}
}

const PaidBy = ({invoice, intl}) => {
    const {paymentDate, totalInclSurcharge, currencyCode, scheme, cardNumberLastDigits, gatewayTransactionId} = invoice;
    return (
        <React.Fragment>
            <RegularText className={styles.viewDownloadDiv} text="invoice.view.documentDetails.paid.details"
                         values={{paymentDate: intl.formatDate(paymentDate, {year: 'numeric', month: 'short', day: 'numeric'}),
                                  paidAmount: intl.formatNumber(totalInclSurcharge, {style: "currency", currency: currencyCode}),
                                  schemeLabel: CARD_SCHEME_LABELS[scheme],
                                  cardNumberLastDigits: cardNumberLastDigits}}/>
            <RegularText className={styles.paidTxt} text="invoice.view.documentDetails.paid.transaction" values={{gatewayTransactionId: gatewayTransactionId}}/>
        </React.Fragment>
    )
}

const PaymentStatus = ({invoice, intl}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <React.Fragment>
            <RegularText className={styles.viewDownloadDiv} text={"invoice.view.documentDetails.status." + invoice.status}/>
            {invoice.status === "payment-due" &&
                <React.Fragment>
                    {invoice.showAsHistorical &&
                        <span className={styles.archivedWarning} > {intl.formatMessage({id: "invoice.view.documentDetails.status.archived"})}</span>}
                    <span className={styles.updateStatus} > {intl.formatMessage({id: invoice.showAsHistorical ?
                                                                              "invoice.view.documentDetails.status.update.archived-label" : "invoice.view.documentDetails.status.update.label"})}
                        <LinkButton className={styles.setBillToPaidButton} onClick={() => setShowModal(true)}>
                            {intl.formatMessage({id: "invoice.view.documentDetails.status.update.action"})}</LinkButton></span>
                </React.Fragment>
            }
            <SetBillStatusToPaidConfirmationModal show={showModal}
                                                  onCancel={() => setShowModal(false)}
                                                  invoice={invoice} />
        </React.Fragment>
    )
}

function getPaymentStatusMessage(intl, invoice) {
  switch (true) {
    case invoice.gatewayTransactionId != null:
      return <PaidBy intl={intl} invoice={invoice} />;
    case invoice.status === "payment-network-error":
      return <RegularText className={styles.networkError} text="invoice.view.documentDetails.networkError" />;
    case invoice.autoPaymentStatus === "scheduled":
      return (
        <p> {intl.formatMessage({ id: "invoice.view.documentDetails.autoPaymentScheduled" })}
          <Link className={styles.viewDownloadLink}
            to={`/portal/customer/biller/${invoice.payerActorId}/payments/${invoice.invoiceAutoPaymentId}`}>
            {intl.formatMessage({ id: "invoice.view.documentDetails.viewPayment" })}
          </Link>
        </p>);
    case invoice.autoPaymentStatus === "failed":
      return <RegularText className={styles.failedPayment} text="invoice.view.documentDetails.failed" />;
    case invoice.autoPaymentStatus === "above-limit":
    case invoice.autoPaymentStatus === "skipped-above-limit":
      return (
        <p className={styles.textWarning}> {intl.formatMessage({ id: "invoice.view.documentDetails.overLimit" })}
          <Link className={styles.viewDownloadLink} to={`/portal/customer/biller/${invoice.payerActorId}/auto-payments/${invoice.autoPaymentId}`}>
            {intl.formatMessage({ id: "invoice.view.documentDetails.updateLimit" })} </Link>
        </p>);
    default:
      return <PaymentStatus invoice={invoice} intl={intl} />;
  }
}

function canReturnToSender (invoice) {
    return new Date() < new Date(invoice.dueDate) && invoice.showReturnToSender;
}

const ActionButtons = ({invoice}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.buttonBar}>
            <BackToDocumentsButton buttonComponent={DefaultButton}/>
            {canReturnToSender(invoice) && (
                <div className={styles.deregisterContainer}>
                    <RegularText text="invoice.view.returnToSender.button.label"/>
                    <DangerButton label="invoice.view.returnToSender.button" onClick={() => setShowModal(true)}/>
                </div>
            )}

            <ReturnToSenderConfirmationModal show={showModal}
                                             onCancel={() => setShowModal(false)}
                                             invoice={invoice}/>
        </div>
    )
};

const InvoiceDetailsCard = ({invoice, intl, isDownloaded}) => {
    const {id, invoiceNo, billerName, amountDue, currencyCode,
        minAmountDue, dueDate, payable, status, payerActorId, billerCustomerNumber, billRef2,
    dueDateTotal} = invoice;
    return (
        <Card heading="invoice.view.documentDetails.heading">
            <FieldGroup className={styles.detailsContainer}>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.view.documentDetails.invoiceNo.label"})}
                                  value={invoiceNo}/>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.view.documentDetails.mailer.label"})}
                                  value={billerName}/>
                {billRef2 && <FieldGroup.Field label={intl.formatMessage({id: "inbox.tableView.address"})}
                                               value={billRef2}/>}
                <FieldGroup.Field label={intl.formatMessage({id: "inbox.tableView.customerReference"})}
                                  value={billerCustomerNumber}/>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.view.documentDetails.amount.label"})}
                                  value={
                                  // eslint-disable-next-line
                                  <React.Fragment>
                                      <Number value={minAmountDue || amountDue} type="currency" currency={currencyCode}/>
                                      {minAmountDue && minAmountDue !== amountDue &&
                                          <span className={styles.minimumAmount}>
                                              {intl.formatMessage({id: "invoice.view.documentDetails.totalAmount.label"},
                                                                  {totalAmount: intl.formatNumber(amountDue, {style: "currency", currency: currencyCode})})}
                                          </span>}
                                  </React.Fragment>}/>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.view.documentDetails.dueDate.label"})}
                                  value={dueDateTotal ?
                                      // eslint-disable-next-line
                                      <React.Fragment>
                                          {getDateAsUTCFormatted(dueDate)}
                                          {!datesEqual(dueDateTotal, dueDate) &&
                                              <span className={styles.minimumAmount}>
                                                      {intl.formatMessage({id: "invoice.view.documentDetails.totalDueDate.label"},
                                                          {dueDate: getDateAsUTCFormatted(dueDateTotal)})}
                                              </span>}
                                      </React.Fragment>
                                      : intl.formatDate(dueDate)}/>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.view.documentDetails.paymentStatus.label"})}
                                  value={getPaymentStatusMessage(intl, invoice)}/>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.view.documentDetails.downloadStatus.label"})}
                                  value={getDownloadStatusMessage(intl, invoice, isDownloaded)}/>
            </FieldGroup>
            {showPayNowButton(payable, status, dueDate, dueDateTotal) &&
            <div className={styles.payNowButton}>
                <PrimaryButton label={"invoice.view.documentDetails.payNow.button"}
                               linkTo={`/portal/customer/biller/${payerActorId}/inbox/${id}/pay`}
                               className={styles.payNowButtonText}
                />
            </div>}
        </Card>
    )
};

const onSubmitForwardAndSave = (invoice, values, setSubmitting, history) => {
    setSubmitting(true);
    axios.post(
        `/data/invoices/${invoice.payerActorId}/forwarding/lookup-update-and-forward`,
        {"invoice-id": invoice.id,
            status: invoice.forwardingStatus,
            "forwarding-channel-name": invoice.invoiceForwardingRule.name,
            "forwarding-fields": {"forwarding-field-1": values.propertymeProperty}}
    )
        .then(({data}) => {
            if (data.success) {
                history.push({pathname: `./${invoice.id}/forwarding-result`, state: {data}})
            }
        })
        .finally(() => setSubmitting(false));
};

const onSubmitSave = (invoice, values, setSubmitting) => {
    setSubmitting(true);
    axios.post(
        `/data/invoices/${invoice.payerActorId}/forwarding/lookup-update`,
        {"invoice-id": invoice.id,
            "forwarding-channel-name": invoice.invoiceForwardingRule.name,
            "forwarding-fields": {"forwarding-field-1": values.propertymeProperty}}
    )
        .then(({data}) => {
            if (data.success) {
                window.location.reload();
            }
        })
        .finally(() => setSubmitting(false));
};

const InvoiceInfoRequiredForwardingCard = ({invoice, history}) => {
    const {invoiceForwardingResult, invoiceForwardingRule} = invoice;
    return (
        <Card heading="invoice.view.forwarding.title">
            <LargeText text="invoice.view.forwarding.info.heading" values={{displayName: invoiceForwardingResult.displayName}}/>
            <RegularText text="invoice.view.forwarding.info.message" values={{displayName: invoiceForwardingResult.displayName}}/>
            <PropertyMeUpdatePropertyForm onSubmit={(values, {setSubmitting}) => onSubmitForwardAndSave(invoice, values, setSubmitting, history)}
                                          options={invoiceForwardingRule.lookupFields}
                                          submitLabel="invoice.view.forwarding.saveAndForward.button"
                                          initialValues={{propertymeProperty: invoiceForwardingRule.lookupFields.field1.value}}/>
        </Card>
    );
};

const InvoiceFailedForwardingCard = ({invoice, intl, history}) => {
    const {invoiceForwardingResult, invoiceForwardingRule} = invoice;
    return (
        <Card heading="invoice.view.forwarding.title">
            <LargeText text="invoice.view.forwarding.failed.heading" values={{displayName: invoiceForwardingResult.displayName}}/>
            <FieldGroup className={styles.textDanger}>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.view.forwarding.failed.label"})}
                                  value={<span>
                                      {invoiceForwardingResult.errorMessage}
                                      <a className={styles.learnMoreLink} href="https://help.payreq.com/support/solutions/articles/11000091781" target="_blank" rel="noopener noreferrer">{intl.formatMessage({id: "invoice.view.forwarding.failed.link"})}</a></span>}/>
            </FieldGroup>
            <LargeText text="invoice.view.forwarding.details" values={{displayName: invoiceForwardingResult.displayName}} className={styles.marginHeading}/>
            <PropertyMeUpdatePropertyForm onSubmit={(values, {setSubmitting}) => onSubmitForwardAndSave(invoice, values, setSubmitting, history)}
                                          options={invoiceForwardingRule.lookupFields}
                                          submitLabel="invoice.view.forwarding.retry.button"
                                          initialValues={{propertymeProperty: invoiceForwardingRule.lookupFields.field1.value}}/>
        </Card>);
};

const InvoiceForwardedCard = ({invoice, intl}) => {
    const {invoiceForwardingResult, invoiceForwardingRule} = invoice;
    return (
        <Card heading="invoice.view.forwarding.title">
            <RegularText text="invoice.view.forwarding.success" values={{displayName: invoiceForwardingResult.displayName,
                forwardingDate: intl.formatDate(invoiceForwardingResult.forwardDate, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                })}}/>
            <LargeText text="invoice.view.forwarding.details" values={{displayName: invoiceForwardingResult.displayName}}/>
            <PropertyMeUpdatePropertyForm onSubmit={(values, {setSubmitting}) => onSubmitSave(invoice, values, setSubmitting)}
                                          options={invoiceForwardingRule.lookupFields}
                                          submitLabel="invoice.view.forwarding.save.button"
                                          initialValues={{propertymeProperty: invoiceForwardingRule.lookupFields.field1.value}}/>
        </Card>
    );
};

const InvoiceDocumentView = ({invoice, intl, history}) => {
    const [isDownloaded, setIsDownloaded] = useState(invoice.downloadStatus);
    return (
        <React.Fragment>
            <PageHeading text="invoice.view.pageHeading" values={{invoiceNo: invoice.invoiceNo, billerName: invoice.billerName}}/>
            <ActionButtons invoice={invoice}/>
            <div className={styles.pageContainer}>
                <div className={styles.billDetailsContainer}>
                    <InvoiceDetailsCard invoice={invoice} intl={intl} isDownloaded={isDownloaded}/>

                    {invoice.invoiceForwardingResult && invoice.invoiceForwardingResult.status === "failed" &&
                        <InvoiceFailedForwardingCard invoice={invoice} intl={intl} history={history}/>}
                    {invoice.invoiceForwardingResult && invoice.invoiceForwardingResult.status === "awaiting-information" &&
                        <InvoiceInfoRequiredForwardingCard invoice={invoice} history={history}/>}
                    {invoice.invoiceForwardingResult && invoice.invoiceForwardingResult.status === "sent" &&
                        <InvoiceForwardedCard invoice={invoice} intl={intl}/>}

                    <DeliveredByDetailsCard invoice={invoice} intl={intl}/>

                </div>
                <div className={styles.pdfViewContainer}>
                    {<PdfPreviewCard invoice={invoice} intl={intl} title="invoice.view.preview.heading" noDocumentMessage="invoice.document.pdf.noLatestDocument"
                                     setIsDownloaded={setIsDownloaded}/>}
                </div>
            </div>
        </React.Fragment>
    )}
;

export default withRouter(injectIntl(InvoiceDocumentView));
