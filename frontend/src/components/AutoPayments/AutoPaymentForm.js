import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {Redirect} from "react-router-dom";
import {injectIntl} from "react-intl";
import axios from "axios";

import styles from "./AutoPaymentsView.module.scss"
import {Select, SubmitButton, TextInput, RegularText, LinkButton, Checkbox, AlertDanger} from "../common";
import {CARD_SCHEME_LABELS} from "../payments/payment-constants";
import {buildMaskedNumber, expireMonth,} from "../../utils/card-utils";
import SurchargeList from "../payments/SurchargeList";
import Loading from "../Loading";
import {REGISTRATION_STATUS} from "../registrations/registration-constants";
import {getCurrencySymbol} from "../../utils/currency-utils";
import LargeText from "../common/text/LargeText";
import FieldGroup from "../common/FieldGroup";
import Alert from "../common/alerts/Alert";
import Icon from "../common/text/Icon";

const getBillerDetails = (billers, billerActorId) => billers.find(b => b.id === parseInt(billerActorId));

const getBillers = (billerId, setBillers) => {
    axios.get(`/data/auto-payments/${billerId}/billers`,)
        .then(({data}) => setBillers(data.billers));
};

const getAccounts = regos => {
    const reducer = (accumulator, rego) => {
        if (!accumulator[rego.accountNumber + rego.billerActorId]) {
            accumulator[rego.accountNumber + rego.billerActorId] = rego
        }
        return accumulator;

    };
    const distinctRegosMap = regos.reduce(reducer, {});
    return Object.keys(distinctRegosMap).map(k => distinctRegosMap[k]);
};

const hasMoreRegos = data => data.results.showing[1] < data.results.total;

const getActiveRegos = (billerId, pageNumber, regos, setAccounts, setIsActiveRegosLoading) => {
    axios.get(`/data/payerregistrations`,
        {
            params: {
                payerId: billerId,
                pageNumber,
                status: REGISTRATION_STATUS.active,
            }
        })
        .then(({data}) => {
            const allRegos = [...regos, ...data.results.registrations];
            if (hasMoreRegos(data)) {
                getActiveRegos(billerId, parseInt(pageNumber) + 1, allRegos, setAccounts, setIsActiveRegosLoading)
            } else {
                setAccounts(accounts => getAccounts([...accounts, ...allRegos]));
                setIsActiveRegosLoading(false);
            }
        });
};

const getPendingRegos = (billerId, pageNumber, regos, setAccounts, setIsPendingRegosLoading) => {
    axios.get(`/data/payerregistrations`,
        {
            params: {
                payerId: billerId,
                pageNumber,
                status: REGISTRATION_STATUS.pending,
            }
        })
        .then(({data}) => {
            const allRegos = [...regos, ...data.results.registrations];
            if (hasMoreRegos(data)) {
                getPendingRegos(billerId, parseInt(pageNumber) + 1, allRegos, setAccounts, setIsPendingRegosLoading)
            } else {
                setAccounts(accounts => getAccounts([...accounts, ...allRegos]));
                setIsPendingRegosLoading(false);
            }
        });
};

const schema = Yup.object().shape({
    billerActorId: Yup.string().required("forms.generic.required.label"),
    accountNumber: Yup.string().required("forms.generic.required.label"),
    cardId: Yup.string().required("forms.generic.required.label"),
    amountType: Yup.string().required("forms.generic.required.label"),
    debitLimit: Yup.number().nullable(),
    paymentDay: Yup.string().required("forms.generic.required.label"),
    surchargesAccepted: Yup.boolean().oneOf([true], "forms.generic.required.label"),
    doubleUpWarningAccepted: Yup.boolean().oneOf([true], "forms.generic.required.label"),
    activeOnNextBill: Yup.boolean().oneOf([true], "forms.generic.required.label")
});

const validateAcceptedCard = (intl, billers, cards, values) => {
    if (!values.billerActorId || !values.cardId) {
        return {};
    }
    const biller = getBillerDetails(billers, values.billerActorId);
    const acceptedCards = biller.gateway.billerPaymentSource.map(c => c.providerName);
    const selectedCard = cards.find(c => c.id === parseInt(values.cardId));
    if (acceptedCards.indexOf(selectedCard.scheme) === -1) {
        const schemes = acceptedCards.map(sc => CARD_SCHEME_LABELS[sc]).join(", ");
        return {cardId: intl.formatMessage({id: "autoPayment.form.cardScheme.validation"}, {schemes: schemes})}
    }
    return {};
};

const getBillerAccounts = (accounts, billerActorId) => accounts.filter(r => r.billerActorId === parseInt(billerActorId));

const CardPreview = ({cards, selectedCardId}) => {
    const card = cards.find(c => c.id === parseInt(selectedCardId));
    const maskedNumber = buildMaskedNumber(card.scheme, card.last4Digits);
    const expiry = `${expireMonth(card.expireMonth)}/${card.expireYear}`;
    return (
        <div style={{marginBottom: "5rem"}}>
            <Cards
                cvc=""
                expiry={expiry}
                name={card.holderName}
                number={maskedNumber}
                issuer={card.scheme}
                preview={true}
            />
        </div>
    );
};

const Surcharges = ({billers, values, setFieldValue, setFieldTouched, errors, touched}) => {
    if (!values || !values.billerActorId) return null;
    const billerDetails = getBillerDetails(billers, values.billerActorId);
    return (
        <Checkbox name="surchargesAccepted"
                  value={values.surchargesAccepted}
                  onChange={() => setFieldValue("surchargesAccepted", !values.surchargesAccepted)}
                  onBlur={() => setFieldTouched("surchargesAccepted")}
                  error={errors.surchargesAccepted}
                  touched={touched.surchargesAccepted}
        >
            <div className={styles.surchargeDetails}>
                <SurchargeList cardsAccepted={billerDetails.gateway.billerPaymentSource}/>
            </div>
        </Checkbox>
    );
};

const AddNewCard = ({addCardLink}) => (
    <div style={{display: "flex", alignItems: "baseline"}}>
        <RegularText text="autoPayment.form.card.addNew"/>
        <LinkButton label="autoPayment.form.card.addNew.button" linkTo={addCardLink}/>
    </div>
);

const FormErrors = ({errors, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(e => <li>{intl.formatMessage({id: "autoPayment.form.errors." + e})}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const handleSurcharges = (billerActorId, billers, setIsSurcharging, setFieldValue) => {
    const billerDetails = getBillerDetails(billers, billerActorId);
    const cardsAccepted = billerDetails.gateway.billerPaymentSource;
    const isSurcharging = cardsAccepted.filter(ca => ca.surchargePercentage !== 0).length > 0;
    setIsSurcharging(isSurcharging);
    setFieldValue("surchargesAccepted", !isSurcharging);
};

const AutoPaymentForm = ({billerId, cards, onSubmit, isLoading, initialValues, isCreationForm = true, formErrors, cancelLink, addCardLink, intl, referrerState}) => {
    const [billers, setBillers] = useState();
    const [accounts, setAccounts] = useState([]);
    const [isPendingRegosLoading, setIsPendingRegosLoading] = useState(true);
    const [isActiveRegosLoading, setIsActiveRegosLoading] = useState(true);
    const [isSurcharging, setIsSurcharging] = useState(false);
    const [selectedBiller, setSelectedBiller] = useState();
    useEffect(() => getBillers(billerId, setBillers), [billerId, setBillers]);
    useEffect(() => getActiveRegos(billerId, 1, [], setAccounts, setIsActiveRegosLoading),
        [billerId, setAccounts, setIsActiveRegosLoading]);
    useEffect(() => getPendingRegos(billerId, 1, [], setAccounts, setIsPendingRegosLoading),
        [billerId, setAccounts, setIsPendingRegosLoading]);
    useEffect(() => {
            if (billers && initialValues.billerActorId) {
                handleSurcharges(initialValues.billerActorId, billers, setIsSurcharging, () => {
                });
                setSelectedBiller(billers.find(b => b.id === parseInt(initialValues.billerActorId)));
            }
        },
        [initialValues, billers, setIsSurcharging]);

    if (!cards || !billers || isPendingRegosLoading || isActiveRegosLoading || isLoading) {
        return <Loading/>
    }

    if (cards.length === 0) {
        return <Redirect to={{
            pathname: "../cards/create",
            state: {...referrerState, pathOnSuccess: "../auto-payments/create", cancelPath: "../auto-payments"}
        }}/>
    }

    return (
        <Formik initialValues={{
            billerActorId: "",
            accountNumber: "",
            cardId: cards.length === 1 ? cards[0].id : "",
            amountType: "min",
            debitLimit: null,
            surchargesAccepted: !isCreationForm || !isSurcharging,
            doubleUpWarningAccepted: !isCreationForm,
            activeOnNextBill: !isCreationForm,
            paymentDay: "",
            ...initialValues
        }}
                validate={values => validateAcceptedCard(intl, billers, cards, values)}
                validationSchema={schema}
                onSubmit={onSubmit}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  isSubmitting
              }) => {
                const selectableAccounts = getBillerAccounts(accounts, values.billerActorId);

                return (
                    <form onSubmit={handleSubmit}>
                        {!isCreationForm &&
                        <React.Fragment>
                            <LargeText text="autoPayment.form.editMessage"/>
                            <FieldGroup>
                                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.edit.organisation"})}
                                                  labelClassName={styles.fieldLabel}
                                                  value={values.billerName}/>
                                <FieldGroup.Field label={intl.formatMessage({id: "autoPayment.form.edit.reference"})}
                                                  labelClassName={styles.fieldLabel}
                                                  value={values.accountNumber}/>
                            </FieldGroup>

                            <hr/>
                            <Alert className={styles.infoBox}>
                            <div className={styles.informationContainer}>
                                <Icon name="info-sign" large={true}/>
                                <LargeText text="autoPayment.form.edit.infoBox" />
                            </div>
                            </Alert>
                            <hr/>
                        </React.Fragment>}
                        <Select name="cardId"
                                label="autoPayment.form.card"
                                placeholder="autoPayment.form.card.placeholder"
                                hint="autoPayment.form.card.hint"
                                internationalisedOptions={false}
                                options={cards.map(c => ({
                                    value: c.id,
                                    label: CARD_SCHEME_LABELS[c.scheme] + " ***" + c.last4Digits + " " + c.holderName
                                }))}
                                value={values.cardId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.cardId}
                                touched={touched.cardId}
                        >
                            <AddNewCard addCardLink={addCardLink}/>
                        </Select>
                        {values.cardId && <CardPreview cards={cards} selectedCardId={values.cardId}/>}
                        {isCreationForm &&
                            <Select name="billerActorId"
                                label="autoPayment.form.biller"
                                placeholder="autoPayment.form.biller.placeholder"
                                hint="autoPayment.form.biller.hint"
                                internationalisedOptions={false}
                                options={billers.map(b => ({value: b.id, label: b.mybillsDisplayName}))}
                                value={values.billerActorId}
                                onChange={e => {
                                    handleChange(e);
                                    const accs = getBillerAccounts(accounts, e.target.value);
                                    if (accs.length === 1) {
                                        setFieldValue("accountNumber", "" + accs[0].accountNumber);
                                    } else {
                                        setFieldValue("accountNumber", "");
                                    }
                                    handleSurcharges(e.target.value, billers, setIsSurcharging, setFieldValue);
                                    setSelectedBiller(billers.find(b => b.id === parseInt(e.target.value)));
                                }}
                                onBlur={handleBlur}
                                error={errors.billerActorId}
                                touched={touched.billerActorId}
                        />}

                        {selectableAccounts.length > 0 && selectedBiller && (
                            <React.Fragment>
                                {isCreationForm && <Select name="accountNumber"
                                                           label="autoPayment.form.accountNumber"
                                                           placeholder="autoPayment.form.accountNumber.placeholder"
                                                           hint="autoPayment.form.accountNumber.hint"
                                                           internationalisedOptions={false}
                                                           options={selectableAccounts.map(acc => ({
                                            value: acc.accountNumber,
                                            label: acc.authItem1 + " (account #" + acc.accountNumber + ")"
                                        }))}
                                                           value={values.accountNumber}
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           error={errors.accountNumber}
                                                           touched={touched.accountNumber}
                                                           isPlaceholderOptionDisabled={false}
                                />}

                                <Select key="amountType"
                                        name="amountType"
                                        label="autoPayment.form.amountType"
                                        placeholder="autoPayment.form.amountType.placeholder"
                                        hint="autoPayment.form.amountType.hint"
                                        options={[
                                            {value: "min", label: "autoPayment.form.amountType.min"},
                                            {value: "total", label: "autoPayment.form.amountType.total"}
                                        ]}
                                        value={values.amountType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.amountType}
                                        touched={touched.amountType}
                                />
                                
                                <TextInput key="debitLimit"
                                           name="debitLimit"
                                           label={intl.formatMessage({id: "autoPayment.form.debitLimit"},
                                               {
                                                   currencyCode: selectedBiller.currency.toUpperCase(),
                                                   currencySymbol: getCurrencySymbol(selectedBiller.currency)
                                               })}
                                           placeholder={intl.formatMessage({id: "autoPayment.form.debitLimit.placeholder"}, {currencySymbol: getCurrencySymbol(selectedBiller.currency)})}
                                           hint="autoPayment.form.debitLimit.hint"
                                           type="number"
                                           addon={getCurrencySymbol(selectedBiller.currency)}
                                           value={values.debitLimit}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           error={errors.debitLimit}
                                           touched={touched.debitLimit}
                                />

                                <Select key="paymentDay"
                                        name="paymentDay"
                                        label="autoPayment.form.paymentDay"
                                        placeholder="autoPayment.form.paymentDay.placeholder"
                                        hint="autoPayment.form.paymentDay.hint"
                                        options={[
                                            {
                                                value: "received-date",
                                                label: "autoPayment.form.paymentDay.received-date"
                                            },
                                            {
                                                value: "due-date",
                                                label: "autoPayment.form.paymentDay.due-date"
                                            }
                                        ]}
                                        value={values.paymentDay}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.paymentDay}
                                        touched={touched.paymentDay}
                                />

                            </React.Fragment>
                        )}

                        {isCreationForm && <RegularText text="autoPayment.form.iUnderstandThat"/>}
                        
                        {isCreationForm && (
                            <React.Fragment>
                                {isSurcharging && (
                                    <Surcharges billers={billers}
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                setFieldTouched={setFieldTouched}
                                                errors={errors}
                                                touched={touched}/>
                                )}
                                <Checkbox name="activeOnNextBill"
                                          label="autoPayment.form.activeOnNextBill"
                                          value={values.activeOnNextBill}
                                          onChange={() => setFieldValue("activeOnNextBill", !values.activeOnNextBill)}
                                          onBlur={() => setFieldTouched("activeOnNextBill")}
                                          error={errors.activeOnNextBill}
                                          touched={touched.activeOnNextBill}
                                />
                                <Checkbox name="doubleUpWarningAccepted"
                                          label="autoPayment.form.doubleUpWarning"
                                          value={values.doubleUpWarningAccepted}
                                          onChange={() => setFieldValue("doubleUpWarningAccepted", !values.doubleUpWarningAccepted)}
                                          onBlur={() => setFieldTouched("doubleUpWarningAccepted")}
                                          error={errors.doubleUpWarningAccepted}
                                          touched={touched.doubleUpWarningAccepted}
                                />
                            </React.Fragment>
                        )}
                        <Surcharges billers={billers} selectedBillerId={values.billerActorId}/>
                        <div className={styles.buttonContainerForm}>
                            <LinkButton label="forms.generic.cancel.button" linkTo={cancelLink}/>
                            <SubmitButton type="submit" label="forms.generic.save.button" disabled={isSubmitting}/>
                        </div>
                        {formErrors && <FormErrors errors={formErrors} intl={intl}/>}
                    </form>
                )
            }}
        </Formik>
    );
};

export default injectIntl(AutoPaymentForm);
