import React from "react";
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {injectIntl} from "react-intl";

const DateInput = ({name, label, value, onChange, onBlur, error, touched, className, intl}) => {
    const showError = touched && error;
    return (
        <FormGroup controlId={name} validationState={showError ? "error" : null} className={className}>
            <ControlLabel>{intl.formatMessage({id: label})}</ControlLabel>
            <FormControl type="date" value={value || ""} onChange={onChange} onBlur={onBlur} placeholder="yyyy-mm-dd"/>
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
        </FormGroup>
    );
};


DateInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

export default injectIntl(DateInput);