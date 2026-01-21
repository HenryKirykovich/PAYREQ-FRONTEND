import React from "react";
import {injectIntl} from "react-intl";
import styles from "./LargeText.module.scss"

const LargeText = ({className, text, values = {}, intl, children, ...rest}) => (
    <p className={[styles.text, className].join(' ')} {...rest}>{text ? intl.formatMessage({id: text}, values) : children}</p>
);

export default injectIntl(LargeText);