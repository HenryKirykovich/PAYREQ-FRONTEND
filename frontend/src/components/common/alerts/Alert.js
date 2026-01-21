import React from "react";
import {injectIntl} from "react-intl";
import {Alert as BootstrapAlert} from "react-bootstrap";
import  styles from "./AlertDanger.module.scss"
import PropTypes from 'prop-types';

export const ALERT_TYPES = {DANGER: "danger", WARNING: "warning", INFO: "info", SUCCESS: "success"}

const Alert = ({value, type, intl, children, values, className}) => {
    return (
        <div className={`${styles.alertMargin} ${className}`}>
            <BootstrapAlert key={value} bsStyle={type}>
                {value && intl.formatMessage({id: value}, values)}
                {children}
            </BootstrapAlert>
        </div>
    );
};

Alert.propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    values: PropTypes.object
};

export default injectIntl(Alert);