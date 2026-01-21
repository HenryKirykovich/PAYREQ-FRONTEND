import React from "react";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import styles from "./InboxView.module.scss";
import {Card, Label, LargeText, RegularText} from "../common";
import {getBillStatusText, LABEL_TYPE_BY_STATUS} from "./inbox-constants";
import CardLogoContainer from "./CardLogo";



const CreditNoteCardMainBody = injectIntl(({formattedAmountDue, billerCustomerNumber, invoiceNo, billerName, formattedDueDate, documentType, intl}) => (
        <div className={styles.mainBody}>
            <LargeText>
                <strong>{formattedAmountDue}</strong> {intl.formatMessage({id: "creditNote.card.header"}, {formattedDueDate})}
            </LargeText>
            <RegularText>{billerName}, {intl.formatMessage({id: "bill.card.customerReference"}, {reference: invoiceNo})}</RegularText>
        </div>
    )
);

const StatusLabel = ({bill}) => {
    const text = getBillStatusText(bill);
    const typeByBillStatus = LABEL_TYPE_BY_STATUS[bill.status];
    return (
        <LargeText>
            <Label text={text} type={typeByBillStatus} />
        </LargeText>
    )
};

const CreditNoteCard = ({bill, intl}) => {
    const formattedDueDate = intl.formatDate(new Date(bill.dueDate))

    const formattedAmountDue = intl.formatNumber(bill.minAmountDue || bill.amountDue, {
        style: "currency",
        currency: bill.currencyCode
    });
    const ariaLabel = intl.formatMessage({id: "bill.card.ariaLabel"}, {
        formattedAmountDue,
        formattedDueDate,
        billerName: bill.billerName
    });
    return (
        <Link to={`./inbox/${bill.id}`}
              aria-label={ariaLabel}>
            <Card hover className={styles.card}>
                <CardLogoContainer logoPath={bill.logoPath} billerName={bill.billerName}/>
                <CreditNoteCardMainBody formattedAmountDue={formattedAmountDue}
                                  formattedDueDate={formattedDueDate}
                                  billerName={bill.supplierName}
                                  billerCustomerNumber={bill.billerCustomerNumber}
                                  invoiceNo={bill.invoiceNo}
                                  documentType={bill.documentType}
                />
                <StatusLabel bill={bill}/>
            </Card>
        </Link>)
};

export default injectIntl(CreditNoteCard);
