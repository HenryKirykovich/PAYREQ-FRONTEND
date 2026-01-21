import React from "react";
import {injectIntl} from "react-intl";
import {Alert} from "react-bootstrap";
import  styles from "./AlertDanger.module.scss"

//this will be deprecated and user Alert instead
const AlertDanger = ({value, intl, children, values}) => {
    return (
        <div className={styles.alertMargin}>
            <Alert key={value} className={styles.danger}>
                {value && intl.formatMessage({id: value}, values)}
                {children}
            </Alert>
        </div>
    );
};

export default injectIntl(AlertDanger);