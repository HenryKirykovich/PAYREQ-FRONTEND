import React from "react";
import {FormattedDate, FormattedNumber, FormattedTime, injectIntl} from "react-intl";
import {CSVLink} from "react-csv";
import {Table, SecondaryButton, RegularText} from "../../common";
import {getTimeZone} from "../../../utils/date-utils";
import { CARD_SCHEME_LABELS, SETTLEMENT_STATUSES } from "../../payments/payment-constants";

const isAllSameCurrency = reportRows => {
    const allCurrencies = reportRows.map(({currencyCode}) => currencyCode);
    const uniqueCurrencies = new Set(allCurrencies);
    return uniqueCurrencies.size === 1
};

const settlementStatusLabel = (settlementStatus, intl) => {
  switch (settlementStatus) {
    case SETTLEMENT_STATUSES.failed:
      return "reports.billPayments.gatewayTransactionStatus.failed";
    case SETTLEMENT_STATUSES.declined:
      return "reports.billPayments.gatewayTransactionStatus.declined";
    case SETTLEMENT_STATUSES.cancelled:
      return "reports.billPayments.gatewayTransactionStatus.cancelled";
    case SETTLEMENT_STATUSES.settlementComplete:
      return "reports.billPayments.gatewayTransactionStatus.settlementComplete";
    default:
      return "reports.billPayments.gatewayTransactionStatus.pending";
  }
};

const ReportTable = ({intl, reportRows, total, billerPaymentProcessor}) => {
    if (reportRows.length === 0) return <RegularText text="reports.billPayments.noResults"/>;
    const isPayreqProcessor = billerPaymentProcessor?.processorId === "payreq";
    const headerLabels = [
        "reports.billPayments.paymentDate",
        "reports.billPayments.customerName",
        "reports.billPayments.contactId",
        "reports.billPayments.cardScheme",
        "reports.billPayments.reference",
        "reports.billPayments.invoiceNumber",
        "reports.billPayments.gatewayTransactionId",
        ...(isPayreqProcessor ? [
            "reports.billPayments.gatewayTransactionStatus",
            "reports.billPayments.gatewayTransactionSettledAt"
        ] : []),
        "reports.billPayments.baseAmount",
        "reports.billPayments.surcharge",
        "reports.billPayments.totalPaid"
    ];
    return (
        <React.Fragment>
            <Table headerLabels={headerLabels}
                   rows={reportRows.map(
                       ({invoiceNo, baseAmount, customerName, paymentDate, reference, gatewayTransactionId, surchargeAmount, totalInclSurcharge, currencyCode, contactId, cardScheme, gatewayTransactionStatus, gatewayTransactionStatusUpdatedAt}) => {
                           const paymentDateObj = new Date(paymentDate);
                           const transactionStatusLabel = settlementStatusLabel(gatewayTransactionStatus);
                           const settledAtObj = gatewayTransactionStatus === SETTLEMENT_STATUSES['settlementComplete'] && gatewayTransactionStatusUpdatedAt ? new Date(gatewayTransactionStatusUpdatedAt) : null;
                           return [
                               <span><FormattedDate value={paymentDateObj}/> <FormattedTime value={paymentDateObj}/></span>,
                               customerName,
                               contactId,
                               CARD_SCHEME_LABELS[cardScheme] ? CARD_SCHEME_LABELS[cardScheme] : cardScheme ,
                               reference,
                               invoiceNo ? invoiceNo : intl.formatMessage({id: "generic.na"}),
                               gatewayTransactionId,
                               ...(isPayreqProcessor ? [
                                   transactionStatusLabel ? intl.formatMessage({id: transactionStatusLabel}) : (gatewayTransactionStatus || intl.formatMessage({id: "generic.na"})),
                                   settledAtObj ? <span><FormattedDate value={settledAtObj}/> <FormattedTime value={settledAtObj}/></span> : intl.formatMessage({id: "generic.na"})
                               ] : []),
                               // eslint-disable-next-line
                               baseAmount ? <FormattedNumber value={baseAmount} style="currency" currency={currencyCode}/> : intl.formatMessage({id: "generic.na"}),
                               // eslint-disable-next-line
                               <FormattedNumber value={surchargeAmount} style="currency" currency={currencyCode}/>,
                               // eslint-disable-next-line
                               <FormattedNumber value={totalInclSurcharge} style="currency" currency={currencyCode}/>
                           ]
                       }
                   )}
                   footer={isAllSameCurrency(reportRows) && [
                       "", "", "", "", "", "", "",
                       ...(isPayreqProcessor ? ["", ""] : []),
                       "", "Total",
                       <FormattedNumber
                           value={total}
                           // eslint-disable-next-line
                           style="currency" currency={reportRows[0].currencyCode}/>]}
            >
            </Table>
            <CSVLink
                filename={`bill-payments-${new Date().getTime()}.csv`}
              data={reportRows.map(row => ({
                ...row,
                paymentDate: new Date(row.paymentDate).toLocaleString("en-au", {timeZone: getTimeZone()}),
                ...(isPayreqProcessor && row.gatewayTransactionStatus === SETTLEMENT_STATUSES['settlementComplete'] && row.gatewayTransactionStatusUpdatedAt ? {
                  gatewayTransactionSettledAt: new Date(row.gatewayTransactionStatusUpdatedAt).toLocaleString("en-au", {timeZone: getTimeZone()})
                } : {}),
                ...(isPayreqProcessor && !row.gatewayTransactionStatus ? {
                  gatewayTransactionStatus: "Pending"
                } : {})
              }))}
              headers={[
                {label: "Payment Date", key: "paymentDate"},
                {label: "Customer Name", key: "customerName"},
                {label: "Contact ID", key: "contactId"},
                {label: "Card Scheme", key: "cardScheme"},
                {label: "Reference", key: "reference"},
                {label: "Invoice No", key: "invoiceNo"},
                {label: "Gateway Transaction ID", key: "gatewayTransactionId"},
                ...(isPayreqProcessor ? [
                    {label: "Gateway Transaction Status", key: "gatewayTransactionStatus"},
                    {label: "Gateway Transaction Settled At", key: "gatewayTransactionSettledAt"}
                ] : []),
                {label: "Base Amount", key: "baseAmount"},
                {label: "Surcharge", key: "surchargeAmount"},
                {label: "Total Paid", key: "totalInclSurcharge"}
              ]}>
                <SecondaryButton label="generic.download" icon="download"/>
            </CSVLink>
        </React.Fragment>
    )
};

export default injectIntl(ReportTable);
