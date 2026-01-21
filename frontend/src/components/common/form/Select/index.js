import React from "react";
import {injectIntl} from "react-intl";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import styles from "./Select.module.scss";

const SecondaryOptions = ({options, internationalisedOptions, intl}) => (
    <React.Fragment>
        <option disabled>──────────</option>
        {options.map(({value: val, label}) => <option key={val} value={val}>{internationalisedOptions ? intl.formatMessage({id: label}) : label}</option>)}
    </React.Fragment>
);

const Index = ({name, label, value, placeholder, options, secondaryOptions = null, onChange, onBlur, error, touched, intl, hint, disabled,
                   className, isPlaceholderOptionDisabled = true, children, internationalisedOptions = true,
                   isControlled = false
               }) => {
    const showError = touched && error;

    return (
        <FormGroup className={className} controlId={name} validationState={showError ? "error" : null}>
            {label && <ControlLabel>{intl.formatMessage({id: label})}</ControlLabel>}
            {hint && <HelpBlock className={styles.helpBlock}>{intl.formatMessage({id: hint})}</HelpBlock>}
            <FormControl componentClass="select" defaultValue={isControlled ? undefined : value || ""}
                         value={isControlled ? value : undefined} onChange={onChange} onBlur={onBlur}
                         disabled={disabled} className={styles.selectInput}>
                <option value="" disabled={isPlaceholderOptionDisabled}>{intl.formatMessage({id: placeholder})}</option>
                {options.map(({value: val, label}) => <option key={val} value={val}>{internationalisedOptions ? intl.formatMessage({id: label}) : label}</option>)}
                {secondaryOptions && <SecondaryOptions options={secondaryOptions}
                                                       internationalisedOptions={internationalisedOptions}
                                                       intl={intl}/>}
            </FormControl>
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
            {children}
        </FormGroup>
    );
};

export default injectIntl(Index);