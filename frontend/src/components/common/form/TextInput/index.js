import React from "react";
import {injectIntl} from "react-intl";
import {ControlLabel, FormControl, InputGroup, FormGroup, HelpBlock} from "react-bootstrap";
import styles from "./TextInput.module.scss"

/**
 * must provide either a label or an ariaLabel if no label is visible on screen
 */
const TextInput = ({name, label, ariaLabel, internationalisedLabel = true, hint, placeholder, value, onChange, onBlur, error, touched, disabled, type = "text", intl, addon, children}) => {
    const showError = touched && error;
    const formControl = <FormControl className={styles.textInput} type={type} value={value} onChange={onChange} onBlur={onBlur}
                                     disabled={disabled} placeholder={placeholder ? intl.formatMessage({id: placeholder}) : null}
                                     aria-label={ariaLabel ? intl.formatMessage({id: ariaLabel}) : null}
    />;
    return (
        <FormGroup controlId={name} validationState={showError ? "error" : null}>
            {label && <ControlLabel>{internationalisedLabel ? intl.formatMessage({id: label}) : label}</ControlLabel>}
            {hint && <HelpBlock className={styles.helpBlock}>{internationalisedLabel ? intl.formatMessage({id: hint}) : hint}</HelpBlock>}
            {addon && (
                <InputGroup>
                    <InputGroup.Addon>{addon}</InputGroup.Addon>
                    {formControl}
                </InputGroup>
            )}
            {!addon && formControl}
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
            {children}
        </FormGroup>
    );
};

export default injectIntl(TextInput);