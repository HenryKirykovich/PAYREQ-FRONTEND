import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {
    Card,
    DangerButton, DefaultButton,
    LinkButton,
    PageHeading,
    PrimaryButton, RegularText,
    SecondaryButton,
    SecondaryHeading
} from "../../common";
import styles from "./PaymentDetail.module.scss";
import FieldGroup from "../../common/FieldGroup";
import {PAYMENT_STATUS_LABEL, showPayNowButton} from "../../../utils/payment-utils"
import SkipModal from "./SkipModal";
import LargeText from "../../common/text/LargeText";
import AlertDanger from "../../common/alerts/AlertDanger";
import BrowserUI from "../../BrowserUI";
import MobileAppUI from "../../MobileAppUI";


const linkToPayments = "../payments";

const isPaymentScheduled = (paymentStatus) => paymentStatus === "scheduled";
const isPaymentAboveLimit = (paymentStatus) => paymentStatus === "above-limit";
const paymentNetworkError = (paymentStatus) => paymentStatus === "network-error";
const isUpcomingPayment = (status) => (isPaymentScheduled(status) || isPaymentAboveLimit(status));

const PaymentMethodCard = ({payment, intl}) => {
    const {scheme, cardNumberLastDigits} = payment;

    if (cardNumberLastDigits) {
        return (
            <Card className={styles.cardContainer}>
                <SecondaryHeading text="Payment method" className={styles.cardHeadingFirst}/>
                <FieldGroup className={styles.detailsContainer}>
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.paymentMethod.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={intl.formatMessage({id: "paymentHistory.detail.paymentMethod.value"})}/>
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.scheme.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={scheme}/>
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.lastDigits.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={cardNumberLastDigits}/>
                </FieldGroup>
            </Card>
        )
    }

    return null;
}

const PaymentAmount = ({payment, monetaryValues, intl}) => {
    const {baseAmount, totalInclSurcharge, surchargeAmount, gatewaySurchargeFee, gatewaySurchargePercentage} = payment;
    if (totalInclSurcharge && baseAmount && surchargeAmount && surchargeAmount !== 0) {
        //processed payment post moving to autopayment v2 where base amount was captured
        return <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.paymentAmount.label"})}
                                 labelClassName={styles.fieldLabel}
                                 value={intl.formatMessage({id: "paymentHistory.detail.paymentAmount.value"}, monetaryValues)}/>;
    } else if (totalInclSurcharge && surchargeAmount && surchargeAmount !== 0) {
        //processed payment pre moving to autopayment v2 where base amount was captured
        return <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.paymentAmount.label"})}
                                 labelClassName={styles.fieldLabel}
                                 value={intl.formatMessage({id: "paymentHistory.detail.paymentAmountWithSurcharge.value"}, monetaryValues)}/>;
    } else if (totalInclSurcharge) {
        //processed payment without surcharge
        return <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.paymentAmount.label"})}
                                 labelClassName={styles.fieldLabel}
                                 value={monetaryValues["total"]}/>;
    } else if (baseAmount && (gatewaySurchargePercentage !== 0 || gatewaySurchargeFee !== 0)) {
        //payment history in status scheduled, above-limit or skipped with surcharge
        return <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.paymentAmount.label"})}
                                 labelClassName={styles.fieldLabel}
                                 value={intl.formatMessage({id: "paymentHistory.detail.paymentAmountForUpcomingPayment.value"},
                                     {
                                         total: monetaryValues["base"],
                                         surchargePercentage: gatewaySurchargePercentage,
                                     })}/>;
    } else {
            //payment history in status scheduled, above-limit or skipped without surcharge
            return <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.paymentAmount.label"})}
                                     labelClassName={styles.fieldLabel}
                                     value={monetaryValues["base"]}/>;
    }
}
const PaymentOverviewCard = ({payment, monetaryValues, setShowSkipPaymentModal, intl}) => {
    const {mailerName, billerCustomerNumber, status, processedAt, scheduledDate,
        invoiceId, payable, invoiceStatus, dueDate, dueDateTotal, gatewayTransactionId, autoPaymentId} = payment;
    const dateFormat = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    };
    const processedAtFormatted = intl.formatDate(processedAt, dateFormat);
    const scheduledDateFormatted = intl.formatDate(scheduledDate, dateFormat);
    const statusLabel =  PAYMENT_STATUS_LABEL[status] && intl.formatMessage({id: PAYMENT_STATUS_LABEL[status]});

    return (
        <Card className={styles.card}>
            <SecondaryHeading text="Payment overview" className={styles.cardHeadingFirst}/>
            <FieldGroup className={styles.cardContainer}>
                <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.organisation.label"})}
                                  labelClassName={styles.fieldLabel}
                                  value={mailerName}/>
                <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.reference.label"})}
                                  labelClassName={styles.fieldLabel}
                                  value={billerCustomerNumber}/>
                <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.status.label"})}
                                  labelClassName={styles.fieldLabel}
                                  fieldRowClassName={styles.fieldRowStatus}
                                  value={
                                  <div className={styles.status}>
                                      <span>{statusLabel} - </span>
                                      <Link to={`../inbox/${invoiceId}`} className={styles.viewBillLink}>
                                          <RegularText text="paymentHistory.detail.button.viewBill" />
                                      </Link>
                                  </div>}/>
                <PaymentAmount payment={payment} monetaryValues={monetaryValues} intl={intl}/>
                {gatewayTransactionId &&
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.paymentReference.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={gatewayTransactionId}/>}
                {processedAt &&
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.processedDate.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={processedAtFormatted}/>}
                {isUpcomingPayment(status) &&
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.scheduledDate.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={scheduledDateFormatted}/>}
                {autoPaymentId &&
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.createdByAutoPayment.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={intl.formatMessage({id: "forms.generic.true"})}/>}
                {isUpcomingPayment(status) && monetaryValues["limit"] &&
                    <FieldGroup.Field label={intl.formatMessage({id: "paymentHistory.detail.limit.label"})}
                                      labelClassName={styles.fieldLabel}
                                      value={monetaryValues["limit"]}/>}
            </FieldGroup>
            {(isUpcomingPayment(status) || showPayNowButton(payable, invoiceStatus, dueDate, dueDateTotal)) &&
                <div className={styles.paymentOverviewButtons}>
                    <PrimaryButton linkTo={{pathname: `../inbox/${invoiceId}/pay`,
                                            redirectOverride: `../../payments`}}
                                   label="paymentHistory.detail.button.payNow" />
                    <div className={styles.skipLinkButton}>
                        <LinkButton onClick={() => setShowSkipPaymentModal(true)} label="paymentHistory.detail.button.skip"/>
                    </div>
                </div>}

        </Card>
    )
}

const BackActionButton = ({label, linkTo}) => {
    return (
        <div className={styles.buttonContainer}>
            <DefaultButton linkTo={linkTo} label={label} icon="menu-left"/>
        </div>
    )
}

const ActionButtons = ({payment, setShowSkipPaymentModal}) => {
    const {id, status, autoPaymentId, cardNumberLastDigits, invoiceId} = payment;
    const linkToEditAutoPayment = payment && {
        pathname: `../auto-payments/${autoPaymentId}/edit`,
        cancelPath: `../../payments/${id}`,
        successPath: `../../payments/${id}`
    };
    if (isUpcomingPayment(status)) {
        return (
            <div className={styles.buttonContainer}>
                <BrowserUI>
                    <DefaultButton linkTo={linkToPayments} label="paymentHistory.detail.button.back" icon="menu-left"/>
                </BrowserUI>
                <MobileAppUI>
                    <DefaultButton linkTo={`../inbox/${invoiceId}`} label="forms.generic.back.button" icon="menu-left"/>
                </MobileAppUI>
                <SecondaryButton linkTo={linkToEditAutoPayment} label="paymentHistory.detail.button.edit" icon="cog"/>
                <div className={styles.skipButton}>
                    <DangerButton onClick={() => setShowSkipPaymentModal(true)} label="paymentHistory.detail.button.skip"/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.buttonContainer}>
            <BackActionButton linkTo={linkToPayments} label="paymentHistory.detail.button.back"/>
            {autoPaymentId && cardNumberLastDigits &&
                <SecondaryButton linkTo={linkToEditAutoPayment} label="paymentHistory.detail.button.edit" icon="cog"/>}
        </div>
    )
}

const AboveLimitWarning = ({payment, monetaryValues}) => {
    const {status} = payment;

    if (isPaymentAboveLimit(status)) {
        return (
            <div className={styles.aboveLimitAlert}>
                <AlertDanger>
                    <LargeText text="paymentHistory.aboveLimit.warning.heading" />
                    <RegularText text="paymentHistory.aboveLimit.warning.action" values={{amount: monetaryValues["base"]}} />
                </AlertDanger>
            </div>
        )
    }

    return null;
}

const NetworkError = ({payment}) => {
    const {status} = payment;

    if (paymentNetworkError(status)) {
        return (
            <div className={styles.aboveLimitAlert}>
                <AlertDanger>
                    <LargeText text="paymentHistory.aboveLimit.networkError.heading" />
                    <RegularText text="paymentHistory.aboveLimit.networkError.action" />
                </AlertDanger>
            </div>
        )
    }

    return null;
}

const PaymentDetailCards = ({payment, setShowSkipPaymentModal, intl}) => {
    const {baseAmount, totalInclSurcharge, surchargeAmount, debitLimit, currencyCode} = payment;
    const monetaryValues = {total: intl.formatNumber(totalInclSurcharge || 0, {style: "currency", currency: currencyCode}),
        base: intl.formatNumber(baseAmount || 0, {style: "currency", currency: currencyCode}),
        surcharge: intl.formatNumber(surchargeAmount || 0, {style: "currency", currency: currencyCode}),
        limit: debitLimit && intl.formatNumber(debitLimit, {style: "currency", currency: currencyCode})};

    return (
        <React.Fragment>
            <AboveLimitWarning payment={payment} monetaryValues={monetaryValues}/>
            <NetworkError payment={payment}/>
            <PaymentOverviewCard payment={payment} monetaryValues={monetaryValues}
                                 setShowSkipPaymentModal={setShowSkipPaymentModal} intl={intl}/>
            <PaymentMethodCard payment={payment} intl={intl}/>
        </React.Fragment>
    )
}


const PaymentDetailView = ({payment, intl}) => {
    const [showSkipPaymentModal, setShowSkipPaymentModal] = useState(false);

    if(!payment) {
        return (
            <div className={styles.detailsContainer}>
                <PageHeading text="paymentHistory.detail.heading"/>
                <LargeText text="paymentHistory.detail.notFound" />
                <BackActionButton linkTo={linkToPayments} label="paymentHistory.detail.button.backToPayments"/>
            </div>
        )
    }

    return (
        <div className={styles.detailsContainer}>
            <PageHeading text="paymentHistory.detail.heading"/>
            <ActionButtons payment={payment} setShowSkipPaymentModal={setShowSkipPaymentModal}/>
            <PaymentDetailCards payment={payment} setShowSkipPaymentModal={setShowSkipPaymentModal} intl={intl}/>
            <SkipModal show={showSkipPaymentModal}
                       onCancel={() => setShowSkipPaymentModal(false)}
                       paymentId={payment.id}
            />
        </div>
    )
}

export default withRouter(PaymentDetailView);
