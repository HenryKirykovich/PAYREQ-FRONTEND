import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack'

import {FormattedDate, FormattedNumber, injectIntl} from "react-intl";
import {
    PageHeading,
    Label,
    LinkButton,
    DefaultButton,
    Card,
    DangerButton
} from "../../common";
import FieldGroup from "../../common/FieldGroup";
import styles from "./RegistrationView.module.scss"
import RegularText from "../../common/text/RegularText";
import LargeText from "../../common/text/LargeText";
import UpdateEmailRegistrationModal from "../email/UpdateEmailRegistrationModal";
import DeregisterConfirmationModal from "./DeregisterConfirmationModal";
import {CARD_SCHEME_LABELS} from "../../payments/payment-constants";
import UpdateXeroRegistrationModal from "../xero/UpdateXeroRegistrationModal";

import RegistrationDetailsCard from "./Cards/RegistrationDetailsCard";
import {isMonetaryDocument} from "../../../utils/document-utils";
import {getDateAsUTCFormatted} from "../../../utils/date-utils";
import BrowserUI from "../../BrowserUI";
import UpdateReckonRegistrationModal from "../reckon/UpdateReckonRegistrationModal";
import UpdateMyobRegistrationModal from "../myob/UpdateMyobRegistrationModal"

const canEdit = registration => registration.status === "active" || registration.status === "pending";

const EmailLabel = ({registration, detail, intl}) => {
    if (!canEdit(registration)) return null;

    if (detail.isValid) {
        return registration.status === "active" ? (
            <Label type={Label.SUCCESS} text="registration.view.status.active" values={{
                date: intl.formatDate(detail.activatedTime, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })
            }
            }/>) : null;
    } else {
        return <Label type={Label.WARNING} text="registration.view.emailPendingVerification"/>
    }
};

const ActionButtons = ({registration}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.buttonBar}>
            <DefaultButton icon="menu-left" label="forms.generic.back.button"
                           linkTo={`../${registration.billerActorId}`}/>
            {canEdit(registration) && (
                <div className={styles.deregisterContainer}>
                    <RegularText text="registration.view.deregister.bill.info"/>
                    <DangerButton label="registration.view.deregister.button" onClick={() => setShowModal(true)}/>
                </div>
            )}

            <DeregisterConfirmationModal show={showModal}
                                         onCancel={() => setShowModal(false)}
                                         registration={registration}/>

        </div>
    )
};

const RegistrationEmailsCard = ({registration, onResendVerificationEmail, intl}) => {
    const [isResending, setIsResending] = useState();
    const [resendResult, setResendResult] = useState({id: null, message: null});
    const [showModal, setShowModal] = useState(false);

    if (!registration.details) return null;

    return (
        <Card heading="registration.view.registeredEmailsHeading">
            {registration.details.map(d => (
                <div className={styles.registeredEmailsRow}>
                    <LargeText>{d.registrationValue}</LargeText>
                    <LargeText><EmailLabel registration={registration} detail={d} intl={intl}/></LargeText>
                    {!d.isValid && resendResult.id !== d.id && canEdit(registration) && (
                        <LinkButton label="registration.view.resendVerificationEmail"
                                    disabled={isResending}
                                    onClick={() => onResendVerificationEmail(d.id, setIsResending, setResendResult)}
                        />
                    )}
                    {resendResult.id === d.id && <RegularText text={resendResult.message}/>}
                </div>
            ))}

            {canEdit(registration) && (
                <DefaultButton label="registration.view.addRemoveEmail.button" onClick={() => setShowModal(true)}/>
            )}

            <UpdateEmailRegistrationModal show={showModal}
                                          onCancel={() => setShowModal(false)}
                                          registration={registration}
            />
        </Card>
    )
};

const RegistrationXeroCard = ({registration, intl}) => {
    const [showModal, setShowModal] = useState(false);

    if (!registration.xeroaccounts || registration.xeroaccounts.length === 0) return null;

    const selectedAccount = registration.xeroaccounts.find(({id}) => id === registration.channelRef5);
    if (!selectedAccount) return null;
    const accountCode = selectedAccount.accounts.find(({code}) => code === registration.channelRef2);

    return (
        <Card heading="registration.view.registeredXeroHeading">

            <FieldGroup className={styles.xeroFieldGroup} fields={[
                {label: "registrations.createXero.organisation.label", value: selectedAccount.name},
                {label: "registrations.createXero.accountCode.label", value:  accountCode ? accountCode.displayName : intl.formatMessage({id: "registrations.createXero.accountCode.notFound"}, {accountCode: registration.channelRef2})},
                {label: "registrations.createXero.tax.label", value: intl.formatMessage({id: "registrations.createXero.tax." + registration.channelRef1.toLowerCase()})},
                {label: "registrations.createXero.invoiceStatus.label", value: intl.formatMessage({id: "registrations.createXero.invoiceStatus." + registration.channelRef3.toLowerCase()})},
                {label: "registrations.createXero.amountPayable.label", value: intl.formatMessage({id: "registrations.createXero.amountPayable." + registration.channelRef4.toLowerCase()})}
                ]
            }/>

            {canEdit(registration) && (
                <DefaultButton label="registration.view.editXeroDetails.button" onClick={() => setShowModal(true)}/>
            )}

            <UpdateXeroRegistrationModal show={showModal}
                                          onCancel={() => setShowModal(false)}
                                          registration={registration}
            />
        </Card>
    )
};

const RegistrationMyobCard = ({registration, intl}) => {
    const [showModal, setShowModal] = useState(false);
    if (!registration.myobaccounts || registration.myobaccounts.length === 0) return null;
    const selectedAccount = registration.myobaccounts.find(({id}) => id === registration.channelRef2);
    return (
        <Card heading="registration.view.registeredMyobHeading">

            <FieldGroup className={styles.xeroFieldGroup} fields={[
                {label: "registrations.createMyob.business.label", value: selectedAccount ? selectedAccount.name : intl.formatMessage({id: "registrations.createMyob.organisation.notFound"}, {organisation: registration.channelRef2})},
                {
                    label: "registrations.createMyob.tax.label",
                    value: intl.formatMessage({id: "registrations.createXero.tax." + registration.channelRef1.toLowerCase()})
                },
                {
                    label: "registrations.createMyob.amountPayable.label",
                    value: intl.formatMessage({id: "registrations.createXero.amountPayable." + registration.channelRef3.toLowerCase()})
                },
            ]
            }/>

            {canEdit(registration) && (
                <DefaultButton label="registration.view.editXeroDetails.button" onClick={() => setShowModal(true)}/>
            )}

            <UpdateMyobRegistrationModal show={showModal}
                                         onCancel={() => setShowModal(false)}
                                         registration={registration}
            />
        </Card>
    )
}

//fix the update card
const RegistrationReckonCard = ({registration, intl}) => {
    const [showModal, setShowModal] = useState(false);

    if (!registration.reckonaccounts || registration.reckonaccounts.length === 0) return null;

    const supplierDetails = registration.reckonvendors.find(({id}) => id === registration.channelRef1);
    const supplierTerms = registration.supplier && registration.supplier.terms;
    const accountCode = registration.reckonaccounts.find(({id}) => id === registration.channelRef2);
    const taxCode = registration.reckontaxcodes.find(({id}) => id === registration.channelRef3);

    return (
        <Card heading="registration.view.registeredReckonHeading">

            <FieldGroup className={styles.xeroFieldGroup} fields={[
                {label: "registrations.createReckon.supplier.label", value: supplierDetails ? supplierDetails.name : intl.formatMessage({id: "registrations.createReckon.supplier.notFound"}, {supplierCode: registration.channelRef1})},
                {label: "registrations.createReckon.supplierTerms.label", value: supplierTerms ? supplierTerms : intl.formatMessage({id: "registrations.createReckon.supplierTerms.label"})},
                {label: "registrations.createReckon.accountCode.label", value: accountCode ? accountCode.name : intl.formatMessage({id: "registrations.createReckon.accountCode.notFound"}, {accountCode: registration.channelRef2})},
                {label: "registrations.createReckon.taxCode.label", value: taxCode ? taxCode.name : intl.formatMessage({id: "registrations.createReckon.taxCode.notFound"}, {taxCode: registration.channelRef3})},
                {label: "registrations.createReckon.amount.label", value: intl.formatMessage({id: "registrations.createXero.amountPayable." + registration.channelRef4.toLowerCase()})}
            ]
            }/>

            {canEdit(registration) && (
                <DefaultButton label="registration.view.editXeroDetails.button" onClick={() => setShowModal(true)}/>
            )}

            <UpdateReckonRegistrationModal show={showModal}
                                           onCancel={() => setShowModal(false)}
                                           registration={registration}
            />
        </Card>
    )
};


const AutoPaymentsCard = ({registration, autoPayment, intl}) => {
    return (
        <Card heading="registration.view.autoPayment.heading">
            {autoPayment && (
                <React.Fragment>
                    <FieldGroup className={styles.detailsContainer}>
                        <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.card"})}
                                          value={CARD_SCHEME_LABELS[autoPayment.scheme] + " ***" + autoPayment.last4Digits}/>
                        <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.paymentDay"})}
                                          value={intl.formatMessage({id: "autoPayment.form.paymentDay." + autoPayment.paymentDay})}/>
                    </FieldGroup>
                    <Link to={`../../../auto-payments/${autoPayment.id}`}>
                    <RegularText text="registration.view.autoPayment.link" />
                    </Link>
                </React.Fragment>
            )}
            {!autoPayment && (
                <DefaultButton linkTo={{
                    pathname: "../../../auto-payments/create",
                    state: {billerActorId: registration.billerActorId, accountNumber: registration.accountNumber}
                }} label="cards.createAutoPayment.buttonLabel"/>
            )}
        </Card>
    )
};


const BillCard = ({lastBill, intl}) => {
    const pageProps = window.innerWidth < 1000 ? {width: window.innerWidth - 100} : {};
    return (
        <Card heading="registration.view.lastBill.heading" shadow={false}>
            {lastBill ?
                <React.Fragment>
                    <div className={styles.billSummary}>
                        {isMonetaryDocument(lastBill.documentType) &&
                        <LargeText text="registration.view.lastBill.summary"
                                   values={{
                                       // eslint-disable-next-line
                                       amount: <FormattedNumber value={lastBill.amountDue} style="currency" currency={lastBill.currencyCode}/>,
                                       date: getDateAsUTCFormatted(lastBill.dueDate)
                                   }}/>}

                        {!isMonetaryDocument(lastBill.documentType) &&
                        <LargeText text="registration.view.lastBill.documentSummary"
                                   values={{
                                       // eslint-disable-next-line
                                       date: <FormattedDate value={new Date(lastBill.receivedTime)}/>
                                   }}/>}
                        <BrowserUI>
                            <Link to={`../../../inbox/${lastBill.id}`}>
                                {intl.formatMessage({id: "registration.view.viewBill.button"})}
                            </Link>
                        </BrowserUI>
                    </div>
                    <Document file={`/data/invoices/detail/${lastBill.id}`}
                              loading={intl.formatMessage({id: "registration.view.billPreviewLoading"})}
                              error={intl.formatMessage({id: "registration.view.billPreview.error"})}
                    >
                        <Page pageNumber={1} renderTextLayer={false} {...pageProps} />
                    </Document>
                </React.Fragment>
                :
                <RegularText text="invoice.document.pdf.noLatestBill"/>
            }
        </Card>
    );
};

const RegistrationView = ({registration, lastBill, autoPayment, payable, onResendVerificationEmail, intl}) => (
        <React.Fragment>
            <PageHeading text="registration.view.pageHeading" values={{accountNumber: registration.accountNumber}}/>
            <ActionButtons registration={registration}/>
            <div className={styles.pageContainer}>
                <div className={styles.registrationDetailsContainer}>
                    <RegistrationDetailsCard registration={registration} intl={intl}/>
                    <RegistrationEmailsCard registration={registration}
                                            intl={intl}
                                            onResendVerificationEmail={onResendVerificationEmail}/>
                    <RegistrationXeroCard registration={registration}
                                          intl={intl}/>
                    <RegistrationReckonCard registration={registration}
                                            intl={intl}/>
                    <RegistrationMyobCard registration={registration}
                                          intl={intl}/>
                    {(registration.status === "active" || registration.status === "pending") && payable && (
                        <AutoPaymentsCard registration={registration} autoPayment={autoPayment} intl={intl}/>
                    )}
                </div>
                <div className={styles.billDetailsContainer}>
                    <BillCard lastBill={lastBill} intl={intl}/>
                </div>
            </div>
        </React.Fragment>
    )
;

export default injectIntl(RegistrationView);
