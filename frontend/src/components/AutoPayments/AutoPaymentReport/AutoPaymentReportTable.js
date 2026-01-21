import React from "react";
import {FormattedDate, injectIntl} from "react-intl";
import {Table, SecondaryButton} from "../../common";
import {CSVLink} from "react-csv";
import {getCurrencySymbol} from "../../../utils/currency-utils";

const DownloadButton = ({reportRows, intl, currency}) => (
    <CSVLink
        filename={`auto-payment-report-${new Date().getTime()}.csv`}
        data={reportRows.map(r => ({...r, belowDebitLimit: r.belowDebitLimit.toString()}))}
        headers={[
            {label: intl.formatMessage({id: "reports.autopayment.accountNumber"}), key: "accountNumber"},
            {label: intl.formatMessage({id: "reports.autopayment.createdDate"}), key: "createdDate"},
            {
                label: intl.formatMessage({id: "autoPayment.form.debitLimit"},
                    {currencyCode: currency.toUpperCase(), currencySymbol: getCurrencySymbol(currency)}),
                key: "debitLimit"
            },
            {label: intl.formatMessage({id: "autoPayment.form.amountType"}), key: "amountType"},
            {label: intl.formatMessage({id: "autoPayment.form.paymentDay"}), key: "paymentDay"},
            {label: intl.formatMessage({id: "reports.autopayment.belowDebitLimit"}), key: "belowDebitLimit"}
        ]}>
        <SecondaryButton label="generic.download" icon="download"/>
    </CSVLink>
);

const BelowLimitCell = ({intl, belowDebitLimit, billId, billerId}) => {
    const billHref = `/customer#/biller/${billerId}/bill/${billId}`;
    return (
        <span style={{color: belowDebitLimit ? "auto" : "red"}}>
            {intl.formatMessage({id: "reports.autopayment.belowDebitLimit." + belowDebitLimit})}
            {billId && <span> - <a href={billHref}
                                   onClick={() => window.location.href = billHref}>view bill {billId}</a></span>}
        </span>
    )
};

const AutoPaymentReportTable = ({reportRows, intl, currency, billerId}) => {
    if (reportRows.length === 0) return null;

    return (
        <React.Fragment>
            <DownloadButton reportRows={reportRows} intl={intl} currency={currency}/>
            <Table
                headerLabels={[
                    "reports.autopayment.accountNumber",
                    "reports.autopayment.createdDate",
                    "autoPayment.form.debitLimit",
                    "autoPayment.form.amountType",
                    "autoPayment.form.paymentDay",
                    "reports.autopayment.belowDebitLimit",
                ]}
                headerLabelValues={{currencyCode: currency.toUpperCase(), currencySymbol: getCurrencySymbol(currency)}}
                rows={reportRows.map(({
                                          accountNumber,
                                          createdDate,
                                          debitLimit,
                                          amountType,
                                          paymentDay,
                                          belowDebitLimit,
                                          billId
                                      }) => {
                    const createdDateObj = new Date(createdDate);
                    return [
                        accountNumber,
                        <FormattedDate value={createdDateObj}/>,
                        debitLimit,
                        intl.formatMessage({id: amountType === "min" ? "autoPayment.form.amountType.min" : "autoPayment.form.amountType.total"}),
                        intl.formatMessage({id: paymentDay === "due-date" ? "reports.autopayment.paymentDay.due-date" : "reports.autopayment.paymentDay.received-date"}),
                        <BelowLimitCell billerId={billerId} billId={billId} belowDebitLimit={belowDebitLimit} intl={intl}/>
                    ];
                })}
            >
            </Table>
        </React.Fragment>
    )
};

export default injectIntl(AutoPaymentReportTable);
