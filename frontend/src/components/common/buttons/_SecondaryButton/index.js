import React from "react";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";

import styles from "./_SecondaryButton.module.scss";
import Icon from "../../text/Icon";

const _SecondaryButton = ({type = "button", disabled, label, onClick, icon, intl, linkTo}) => {
    const classNames = "btn " + styles.button;
    const ButtonContent = () => (
        <React.Fragment>
            {icon && <Icon className={styles.buttonIcon} name={icon}/>}
            {intl.formatMessage({id: label})}
        </React.Fragment>
    );

    if (linkTo) {
        return (
            <Link to={linkTo}
                  className={classNames}
                  style={{height: "100%"}}>
                <ButtonContent/>
            </Link>
        )
    };

    return (
        <button className={"btn " + styles.button}
                type={type}
                disabled={disabled}
                onClick={onClick}>
            <ButtonContent/>
        </button>
    );
}

export default injectIntl(_SecondaryButton);