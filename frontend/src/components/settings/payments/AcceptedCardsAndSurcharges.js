import {injectIntl} from "react-intl";
import {Button, FormControl, FormGroup, Glyphicon, HelpBlock, InputGroup} from "react-bootstrap";
import {FieldArray} from "formik";
import {RegularText, SecondaryHeading, Select} from "../../common";
import {CARD_SCHEME_LABELS} from "../../payments/payment-constants";
import React from "react";
import {buildSelectOptions} from "../../../utils/form-utils";

import styles from "./AcceptedCardsAndSurcharges.module.scss"

const getFromAcceptedCards = (list, index, key) => list.acceptedCards && list.acceptedCards[index] && list.acceptedCards[index][key];

const SurchargeInput = injectIntl(({index, handleBlur, handleChange, error, touched, intl}) => {
    const showError = touched && error;
    //todo: create a common number input component for the below
    return (
        <FormGroup controlId={`acceptedCards.${index}.surcharge`} validationState={showError ? "error" : null}>
            <InputGroup>
                <FormControl type="number" min={0} max={100} step={0.01} onChange={handleChange}
                             onBlur={handleBlur} defaultValue={0}/>
                <InputGroup.Addon>%</InputGroup.Addon>
            </InputGroup>
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
        </FormGroup>
    )
});

const RemoveButton = ({onClick}) => (
    <Button bsStyle="link" onClick={onClick}>
        <Glyphicon glyph="remove"/>
    </Button>
);

const RemoveButtonPlaceholder = () => <div style={{width: "40px"}}/>;

const AcceptedCardsAndSurcharges = ({handleBlur, handleChange, errors, touched, values, intl}) => (
    <div className={styles.acceptedCardsContainer}>
        <SecondaryHeading text="payments.accepted.cards.label"/>
        <RegularText text="payments.accepted.cards.helpText" />
        <FieldArray
            name="acceptedCards"
            render={arrayHelpers => (
                <div>
                    {values.acceptedCards.map((acceptedCard, index) => (
                        <div key={index} className={styles.cardSchemeSelection}>
                            <div className={styles.cardSchemeSelect}>
                                <Select name={`acceptedCards[${index}].scheme`}
                                        placeholder="payments.cardScheme.select.placeholder"
                                        options={buildSelectOptions(CARD_SCHEME_LABELS)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={getFromAcceptedCards(errors, index, "scheme")}
                                        touched={getFromAcceptedCards(touched, index, "scheme")}
                                />
                            </div>
                            <SurchargeInput handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            index={index}
                                            error={getFromAcceptedCards(errors, index, "surcharge")}
                                            touched={getFromAcceptedCards(touched, index, "surcharge")}/>

                            {index === 0 ? <RemoveButtonPlaceholder/> : <RemoveButton onClick={() => arrayHelpers.remove(index)}/> }
                        </div>
                    ))}
                    <Button className={styles.addCardSchemeBtn} bsStyle="link"
                            onClick={() => arrayHelpers.push({scheme: "", surcharge: 0})}>
                        {intl.formatMessage({id: "payment.cardScheme.add.button"})}
                    </Button>
                </div>
            )}
        />
    </div>
);

export default injectIntl(AcceptedCardsAndSurcharges)
