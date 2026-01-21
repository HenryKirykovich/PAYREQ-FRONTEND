import React from "react";
import {injectIntl} from "react-intl";
import styles from "./_SecondaryHeading.module.scss";

const _SecondaryHeading = ({text, intl, className}) => (
    <h2 className={[styles.heading, className].join(" ")}>{intl.formatMessage({id: text})}</h2>
);

export default injectIntl(_SecondaryHeading);