import React from "react";
import {injectIntl} from "react-intl";
import {FormGroup, HelpBlock, Radio} from "react-bootstrap";

const fieldSetStyledAsLabel = {
    maxWidth: "100%",
    marginBottom: "5px",
    fontWeight: "700",
    width: "auto",
    padding: 0,
    fontSize: "inherit",
    borderBottom: "none",

}

const _Radio = ({
                    name, label, value, options, onChange, onBlur, error, touched, intl, hint, disabled,
                    className, children, internationalisedOptions = true, HintComponent
                }) => {
    const showError = touched && error;

    return (
        <FormGroup className={className} controlId={name} validationState={showError ? "error" : null}>
            <fieldset>
                <legend style={fieldSetStyledAsLabel}>{intl.formatMessage({id: label})}</legend>
                {hint && <HelpBlock>{intl.formatMessage({id: hint})}</HelpBlock>}
                {HintComponent && <HintComponent/>}
                {options.map(({value: val, label}) => (
                    <Radio key={val}
                           name={name}
                           value={val}
                           checked={val === value}
                           onChange={onChange}
                           onBlur={onBlur}
                    >
                        {internationalisedOptions ? intl.formatMessage({id: label}) : label}
                    </Radio>
                ))}
            </fieldset>
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
            {children}
        </FormGroup>
    );
};

export default injectIntl(_Radio);