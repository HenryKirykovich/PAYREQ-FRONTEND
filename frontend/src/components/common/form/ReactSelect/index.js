import { useField } from "formik";
import React from 'react'
import {injectIntl} from "react-intl";
import Select from "react-select";
import {ControlLabel, HelpBlock} from "react-bootstrap";
import styles from "./ReactSelect.module.scss";
import FormGroup from "react-bootstrap/lib/FormGroup";

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].value === nameKey) {
            return myArray[i];
        }
    }
}

const Index = ({label, ...props}) => {
    // This isn't an input, so instead of using the values in 'field' directly,
    // we'll use 'meta' and 'helpers'.

    const [field, meta, helpers] = useField(props);

    const { name, hint, placeholder, options, defaultValue, disabled, className, children, intl} = props;
    const { touched, error } = meta;
    const { setValue } = helpers;
    const showError = touched && error;

    return (
        <FormGroup className={className} controlId={name} validationState={showError ? "error" : null}>
            {label && <ControlLabel>{intl.formatMessage({id: label})}</ControlLabel>}
            {hint && <HelpBlock className={styles.helpBlock}>{intl.formatMessage({id: hint})}</HelpBlock>}
            <Select
                options={options}
                name={field.name}
                defaultValue={search(defaultValue, options)}
                onChange={(option) => setValue(option.value)}
                placeholder={intl.formatMessage({id: placeholder})}
                instanceId={props.iid}
                className={styles.selectInput}
                isDisabled={disabled}
            />
            {showError && <HelpBlock>{intl.formatMessage({id: error})}</HelpBlock>}
            {children}
        </FormGroup>
    );
};

export default injectIntl(Index);