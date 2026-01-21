import React, { useState } from "react";

import * as XMLUtils from "../../../utils/xml-utils";
import { Card } from "../../common";
import FieldGroup from "../../common/FieldGroup";
import { HideAndShow } from "./peppol-common";

import styles from "./PeppolCommon.module.scss";

function directDebitText(paymentMeans, intl) {
    const crn = XMLUtils.text(paymentMeans, "./cbc:PaymentID");
    const reference = XMLUtils.text(paymentMeans, "./cac:PaymentMandate/cbc:ID");
    const accountNo = XMLUtils.text(paymentMeans, "./cac:PaymentMandate/cac:PayerFinancialAccount/cbc:ID");

    return (
        <React.Fragment>
            {crn && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.crn.label" }),
                    val: crn
                })}</p>}
            {reference && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.reference.label" }),
                    val: reference
                })}</p>}
            {accountNo && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.accountNo.label" }),
                    val: accountNo
                })}</p>}
        </React.Fragment>
    );
};

function paymentMeansText(crn, accountId, accountIdIsNumber, accountName, intl) {
    return (
        <React.Fragment>
            {crn && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.crn.label" }),
                    val: crn
                })}</p>}
            {accountId && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.payid.label." + accountIdIsNumber }),
                    val: accountId
                })}</p>}
            {accountName && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.acctName.label" }),
                    val: accountName
                })}</p>}
        </React.Fragment>
    );
}

function creditPaymentText(paymentMeans, intl) {
    const financialBranch = XMLUtils.text(paymentMeans, "./cac:PayeeFinancialAccount/cac:FinancialInstitutionBranch/cbc:ID");
    const financialBranchIsNumber = !!parseInt(financialBranch);
    const crn = XMLUtils.text(paymentMeans, "./cbc:PaymentID");
    const accountId = XMLUtils.text(paymentMeans, "./cac:PayeeFinancialAccount/cbc:ID");
    const accountIdIsNumber = !!parseInt(accountId);
    const accountName = XMLUtils.text(paymentMeans, "./cac:PayeeFinancialAccount/cbc:Name");

    if (financialBranchIsNumber)
        return (<FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.acctDetails.label" })}
            value={
                <React.Fragment>
                    {crn && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                        {
                            label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.crn.label" }),
                            val: crn
                        })}</p>
                    }
                    {financialBranch &&
                        <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                            {
                                label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.bsb.label" }),
                                val: financialBranch
                            })}</p>
                    }
                    {accountId && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                        {
                            label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.acctNumber.label" }),
                            val: accountId
                        })}</p>
                    }
                    {accountName && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                        {
                            label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.acctName.label" }),
                            val: accountName
                        })}</p>
                    }
                </React.Fragment>} />)

    return (
        <FieldGroup.Field label={financialBranch}
            value={paymentMeansText(crn, accountId, accountIdIsNumber, accountName, intl)} />
    );
};

function PaymentMeansDetails({ paymentMeansRec: paymentMeans, intl }) {
    const paymentMeansCode = XMLUtils.text(paymentMeans, "./cbc:PaymentMeansCode");
    console.log("paymentMeansCode:", paymentMeansCode);
    switch (paymentMeansCode) {
        case "49":
            return (<FieldGroup.Field
                label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.directDebit.label" })}
                value={directDebitText(paymentMeans, intl)} />);
        case "30":
            return (creditPaymentText(paymentMeans, intl));
        case "10":
            return (<FieldGroup.Field
                label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.cash.label" })}
                value={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentMeans.cash.text" })} />);
        default:
            return null;
    };
};

function PaymentMeansCard({ paymentMeans, intl }) {
    const [showDetails, setShowDetails] = useState(false);

    if (!paymentMeans) {
        return null;
    }

    return (
        <Card heading="peppol.invoice.view.documentDetails.paymentMeans.heading">
            <div style={{ height: showDetails ? "auto" : "25px", overflow: "hidden" }}>
                <FieldGroup className={styles.detailsContainer}>
                    {paymentMeans.map((paymentMean, idx) => <PaymentMeansDetails paymentMeansRec={paymentMean}
                        intl={intl}
                        key={"paymentMeans" + idx} />)}
                </FieldGroup>
            </div>
            <HideAndShow showDetails={showDetails} setShowDetailsFn={setShowDetails} />
        </Card>
    );
};

export default PaymentMeansCard;
