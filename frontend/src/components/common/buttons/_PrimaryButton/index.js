import React from "react";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import styles from "./_PrimaryButton.module.scss"
import {Icon} from "../../index";

const _PrimaryButton = ({id, type = "button", disabled, label, onClick, icon, intl, linkTo, isSubmitting, "aria-label": ariaLabel, className, ...rest}) => {
    const classNames = ["btn " + styles.button, className].join(" ");
    const ButtonContent = () => (
        <span className={styles.buttonContent}>
                {icon && <Icon className={styles.icon} name={icon}/>}
            {intl.formatMessage({id: label})}
            {isSubmitting && <div className={styles.loader}/>}
            </span>
    );

    if (linkTo) {
            return (
                <Link id={id}
                      to={linkTo}
                      aria-label={ariaLabel}
                      className={classNames}
                      style={{height: "100%"}}
                      {...rest}>
                    <ButtonContent/>
                </Link>
            )
        };

        return (
            <button id={id}
                    className={classNames}
                    aria-label={ariaLabel}
                    type={type}
                    disabled={disabled || isSubmitting}
                    onClick={onClick}
                    {...rest}>
                <ButtonContent/>
            </button>
        )
    }
;

_PrimaryButton.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    linkTo: PropTypes.object,
    isSubmitting: PropTypes.bool,
};

export default injectIntl(_PrimaryButton);
