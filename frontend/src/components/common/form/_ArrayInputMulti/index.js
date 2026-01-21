import React from "react";
import {injectIntl} from "react-intl";

import {ControlLabel, FormGroup, HelpBlock} from "react-bootstrap";

import textInputStyles from "../TextInput/TextInput.module.scss";

const _ArrayInputMulti = ({name, groupErrors, hint, label, intl, children}) => {
    const showError = groupErrors && groupErrors.length > 0;
    return (
            <FormGroup controlId={name} validationState={showError ? "error" : null}>
                {label && <ControlLabel>{intl.formatMessage({id: label})}</ControlLabel>}
                {hint && <HelpBlock className={textInputStyles.helpBlock}>{intl.formatMessage({id: hint})}</HelpBlock>}
                {children}
                {showError && groupErrors.map(err => <HelpBlock key={err}>{err}</HelpBlock>)}
            </FormGroup>
    )
};

export default injectIntl(_ArrayInputMulti);