import React from "react";
import {injectIntl} from "react-intl";
import {Checkbox, FormGroup, HelpBlock} from "react-bootstrap";

const CheckboxInput = ({name, label, value, onChange, onBlur, error, touched, intl, children, disabled}) => {
    const showError = touched && error;
    return (
        <FormGroup controlId={name}
                   validationState={showError ? "error" : null}>
            <Checkbox name={name}
                      checked={value}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      disabled={disabled}
                      style={disabled ? {color: "grey"} : {}}>
                {label && intl.formatMessage({id: label})}
                {children}
            </Checkbox>
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
        </FormGroup>
    );
};

export default injectIntl(CheckboxInput);