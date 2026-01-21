import React from "react";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";

import styles from "./_DangerButton.module.scss"

const _DangerButton = ({type = "button", disabled, label, onClick, intl, isSubmitting}) => (
        <button className={"btn " + styles.button}
                type={type}
                disabled={disabled || isSubmitting}
                onClick={onClick}>
            {intl.formatMessage({id: label})}
            {isSubmitting && <div className={styles.loader}/>}
        </button>
    )
;

_DangerButton.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func
};

export default injectIntl(_DangerButton);