import React from "react";
import {injectIntl} from "react-intl";

import styles from "./_DefaultButton.module.scss";
import {Button} from "react-bootstrap";
import {Icon} from "../../index";
import {Link} from "react-router-dom";

const _DefaultButton = ({type = "button", disabled, label, onClick, intl, icon, linkTo, className}) => {
    const classNames = ["btn", "btn-default", className].join(" ");
    const ButtonContent = () => (
        <React.Fragment>
            {icon && <Icon className={styles.icon} name={icon} />}
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
        <Button type={type}
                className={classNames}
                disabled={disabled}
                onClick={onClick}>
            <ButtonContent/>
        </Button>
    )
    ;
};

export default injectIntl(_DefaultButton);
