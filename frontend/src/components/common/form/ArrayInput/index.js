import React from "react";
import {injectIntl} from "react-intl";
import {FieldArray} from "formik";

import {Button, ControlLabel, FormGroup, Glyphicon, HelpBlock} from "react-bootstrap";
import {TextInput} from "../../index";

import textInputStyles from "../TextInput/TextInput.module.scss";
import styles from "./ArrayInput.module.scss";
import LinkButton from "../../buttons/_LinkButton";

const RemoveButton = ({onClick, value, ariaLabel, intl}) => (
    <Button bsStyle="link" onClick={onClick}
            aria-label={intl.formatMessage(
                {id: "arrayInput.removeAriaLabel"},
                {removeLabel: intl.formatMessage({id: ariaLabel}), value: value || ""})}>
        <Glyphicon glyph="remove"/>
    </Button>
);

const RemoveButtonPlaceholder = () => <div style={{width: "40px"}}/>;

const Row = ({children}) => <div className={styles.row}>{children}</div>;

const ArrayInput = ({
                        name, groupErrors, errors, values, touched, hint, label, intl, handleChange, handleBlur, maxInputs,
                        ariaLabelIntlPrefix, addLinkLabel, disabled
                    }) => {
    const showError = groupErrors && groupErrors.length > 0;
    return (
            <FormGroup controlId={name} validationState={showError ? "error" : null}>
                <ControlLabel>{intl.formatMessage({id: label})}</ControlLabel>
                {hint && <HelpBlock className={textInputStyles.helpBlock}>{intl.formatMessage({id: hint})}</HelpBlock>}
                <FieldArray
                    name={name}
                    render={arrayHelpers => (
                        <div>
                            {values.map((_, index) => (
                                <Row key={`${name}.${index}`}>

                                    <TextInput key={`${name}.${index}`}
                                               name={`${name}.${index}`}
                                               value={values[index]}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               error={errors && errors[index]}
                                               touched={touched && touched[index]}
                                               ariaLabel={`${ariaLabelIntlPrefix}.${name}.${index}`}
                                               disabled={disabled}
                                    />
                                    {index === 0 ? <RemoveButtonPlaceholder/> :
                                        <RemoveButton onClick={() => arrayHelpers.remove(index)}
                                                      ariaLabel={`${ariaLabelIntlPrefix}.${name}.${index}`}
                                                      value={values[index]}
                                                      index={index} intl={intl}/>}
                                </Row>
                            ))}
                            {values.length < maxInputs && (
                                <LinkButton label={addLinkLabel}
                                            className={styles.addButton}
                                            onClick={() => arrayHelpers.push("")}
                                            icon="plus" />
                                )
                            }
                        </div>
                    )}
                />
                {showError && groupErrors.map(err => <HelpBlock key={err}>{err}</HelpBlock>)}
            </FormGroup>
    )
};

export default injectIntl(ArrayInput);