import React from "react";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import styles from "./InboxView.module.scss";
import {Card, Label, LargeText, RegularText} from "../common";
import {getBillStatusText, INVOICE_DOCUMENT_TYPES, LABEL_TYPE_BY_STATUS} from "./inbox-constants";
import CardLogoContainer from "./CardLogo";
import {getDateAsUTCFormatted} from "../../utils/date-utils";

const LABEL_TYPE_BY_AUTO_PAYMENT_STATUS = {
    "scheduled": Label.INFO,
    "above-limit": Label.DANGER,
    "failed": Label.DANGER,
};

const BillCardMainBody = injectIntl(({formattedAmountDue, billerCustomerNumber, invoiceNo, billerName, formattedDueDate, address, documentType, intl}) => (
        <div className={styles.mainBody}>
            <LargeText>
                {documentType === INVOICE_DOCUMENT_TYPES.invoice_reminder &&
                <Label text={intl.formatMessage({id: "bill.card.billReminder"})} type={Label.info}/> }  <strong>{formattedAmountDue}</strong> {intl.formatMessage({id: "bill.card.header"}, {formattedDueDate})}
            </LargeText>
            {address && address.toLowerCase() !== "n/a" && <RegularText>{address}</RegularText>}
            <RegularText>{billerName}, {intl.formatMessage({id: "bill.card.customerReference"}, {reference: billerCustomerNumber || invoiceNo})}</RegularText>
        </div>
    )
);

const billStatusLabelText = function (showAsHistoricalText, billStatusText) {
  if (showAsHistoricalText)
      return " ";
  if (billStatusText === "bill.status.payment-due")
      return "*";
  return null;
}

const BillStatusLabel = ({bill}) => {
    const billStatusText = getBillStatusText(bill);
    const typeByAutoPayment = LABEL_TYPE_BY_AUTO_PAYMENT_STATUS[bill.autoPaymentStatus];
    const typeByBillStatus = LABEL_TYPE_BY_STATUS[bill.status];
    //auto payment status takes precedence UNLESS the bill is paid
    const type = bill.status === "paid" ? typeByBillStatus : typeByAutoPayment || typeByBillStatus;
    const showAsHistoricalText = bill.showAsHistorical && "bill.archived";

    return (
        <div className={styles.paymentStatusWrapper}>
            <LargeText>
                <Label text={showAsHistoricalText || billStatusText} type={type}>
                    {billStatusLabelText(showAsHistoricalText, billStatusText)}
                </Label>
            </LargeText>
        </div>
    )
};
const BillCard = ({bill, intl}) => {
    const formattedDueDate = getDateAsUTCFormatted(bill.dueDate)

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
                <BillCardMainBody formattedAmountDue={formattedAmountDue}
                                  formattedDueDate={formattedDueDate}
                                  billerName={bill.billerName}
                                  billerCustomerNumber={bill.billerCustomerNumber}
                                  address={bill.billRef2}
                                  invoiceNo={bill.invoiceNo}
                                  documentType={bill.documentType}
                />
                <BillStatusLabel bill={bill}/>
            </Card>
        </Link>)
};

export default injectIntl(BillCard);
