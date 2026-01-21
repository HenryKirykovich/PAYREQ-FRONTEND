import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Card, Icon, Label, LinkButton, PageHeading, TextInput} from "../common";
import styles from "./PaymentHistory.module.scss";
import LargeText from "../common/text/LargeText";
import RegularText from "../common/text/RegularText";
import {injectIntl} from "react-intl";
import {PAYMENT_STATUS_LABEL, PAYMENT_STATUS_LABEL_TYPE} from "../../utils/payment-utils"

const PaymentCard = ({payment, intl}) => {
    const {id, billerCustomerNumber, totalInclSurcharge, baseAmount, currencyCode, status, mailerName, scheduledDate, paymentDate} = payment;
    const paymentAmount = intl.formatNumber(totalInclSurcharge || baseAmount, {style: "currency", currency: currencyCode});
    const actionedDate = paymentDate || scheduledDate;
    const detailLink = `./payments/${id}`;

    return (
        <Link to={detailLink}>
            <Card hover>
                <div className={styles.wrapper}>
                    <div className={styles.paymentCardHeader}>
                        <LargeText text={mailerName} className={styles.cardHeaderText}/>
                        <LargeText text={paymentAmount} className={styles.cardHeaderText}/>
                    </div>
                    <RegularText text="paymentHistory.reference" values={{accountNumber: billerCustomerNumber}} className={styles.accountRef}/>
                    <div className={styles.detailRow}>
                        <div className={styles.paymentDetailRow}>
                            <div className={styles.paymentStatusWrapper}>
                                <LargeText>
                                    <Label text={PAYMENT_STATUS_LABEL[status]} type={PAYMENT_STATUS_LABEL_TYPE[status]}>
                                    </Label>
                                </LargeText>
                            </div>
                            {status === "above-limit" ?
                                <RegularText text="paymentHistory.aboveLimitActionDate" values={
                                    {actionedDate: intl.formatDate(actionedDate, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: '2-digit',
                                        })}}/>
                                :
                            <RegularText text="paymentHistory.actionedDate" values={
                                {actionedDate: intl.formatDate(actionedDate, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: '2-digit',
                                })}}/> }
                        </div>
                        <div className={styles.linkValues}>
                            <LinkButton label="paymentHistory.viewDetails" linkTo={detailLink} className={styles.linkButton}/>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}


const PaymentHistoryView = ({payments, searchTerm, setSearchTerm, setDoSearch, setPage, lastElementRef, intl}) => {
    return (
        <div className={styles.billerContainer}>
            <PageHeading text="paymentHistory.heading"/>
            <LargeText text="paymentHistory.subHeading"/>
            <div className={styles.searchInputContainer}>
                <TextInput key="search"
                           name="search"
                           ariaLabel="accountSelection.search.placeholder"
                           placeholder="accountSelection.search.placeholder"
                           value={searchTerm}
                           onChange={e => {
                               setSearchTerm(e.target.value);
                               setPage(1);
                               setDoSearch(true);
                           }}
                           addon={<Icon name="search"/>}
                />
            </div>
            <div className={styles.paymentHistoryContainer}>
                {payments.length === 0 && <LargeText text="paymentHistory.noPayments"/>}
                <div className={styles.links}>
                    {payments && payments.map((payment, idx) => {
                        if (payments.length === idx + 1) {
                            return <div key={idx} ref={lastElementRef} > <PaymentCard payment={payment} intl={intl}/> </div>
                        } else {
                            return <div key={idx}> <PaymentCard payment={payment} intl={intl}/> </div>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default withRouter(injectIntl(PaymentHistoryView));
