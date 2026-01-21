import React from "react";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";
import styles from "./_PageHeading.module.scss"
import {usePresentation} from "../../../../state";

const _PageHeading = ({text, values, intl, showInWebview = false}) => {
    const { isMobileApp } = usePresentation();
    if (!showInWebview && isMobileApp) return null;
    return (
        <h1 id="pageHeading" className={"page-heading " + styles.heading}>{intl.formatMessage({id: text}, values)}</h1>
    )
};

_PageHeading.propTypes = {
    text: PropTypes.string,
    values: PropTypes.object,
    showInWebview: PropTypes.bool
};

export default injectIntl(_PageHeading);
