import {useField} from "formik";
import React from 'react'
import {injectIntl} from "react-intl";
import Select from "react-select";
import {ControlLabel, HelpBlock} from "react-bootstrap";
import styles from "../ReactSelect/ReactSelect.module.scss";
import FormGroup from "react-bootstrap/lib/FormGroup";

const Index = ({label, ...props}) => {
    // This isn't an input, so instead of using the values in 'field' directly,
    // we'll use 'meta' and 'helpers'.

    const [field, meta] = useField(props);
    const {name, hint, placeholder, options, defaultValue, disabled, onChange, className, internationalisedOptions = true,  children, intl} = props;
    const {touched, error} = meta;
    const showError = touched && error;
    return (
        <FormGroup className={className} controlId={name} validationState={showError ? "error" : null}>
            {label && <ControlLabel>{intl.formatMessage({id: label})}</ControlLabel>}
            {hint && <HelpBlock className={styles.helpBlock}>{intl.formatMessage({id: hint})}</HelpBlock>}
            <Select
                isMulti
                options={options.map(({value: val, label}) => {
                    return {value: val, label: internationalisedOptions ? intl.formatMessage({id: label}) : label}
                })}
                name={field.name}
                defaultValue={defaultValue}
                placeholder={intl.formatMessage({id: placeholder})}
                instanceId={props.iid}
                onChange={onChange}
                className={styles.selectInput}
                isDisabled={disabled}
                closeMenuOnSelect={false}
            />
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
            {children}
        </FormGroup>
    );
};

export default injectIntl(Index);
