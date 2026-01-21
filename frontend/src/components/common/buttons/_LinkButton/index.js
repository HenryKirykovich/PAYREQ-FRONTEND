import React from "react";
import {Button} from "react-bootstrap";
import {injectIntl} from "react-intl";
import {Icon} from "./../../../common";
import styles from "./_LinkButton.module.scss"
import {Link} from "react-router-dom";

const _LinkButton = ({label, values, onClick, intl, icon, disabled, linkTo, className, children, noIconDecoration = false, ...rest}) => {
    const iconDecorationClass = icon && noIconDecoration && styles.noIconDecoration;
    const classNames = ["btn", styles.button, className, iconDecorationClass].join(" ");
    const ButtonContent = () => (
        <React.Fragment>
            {icon && <Icon className={styles.buttonIcon} name={icon}/>}
            {label && <span>{intl.formatMessage({id: label}, values)}</span>}
            {children}
        </React.Fragment>
    );

    if (linkTo) {
        return (
            <Link to={linkTo}
                  className={classNames}
                  style={{height: "100%", boxShadow: "none"}}
                  {...rest}
            >
                <ButtonContent/>
            </Link>
        )
    }

    return (
        <Button className={classNames} bsStyle="link" onClick={onClick} disabled={disabled} {...rest}>
            <ButtonContent/>
        </Button>
    );
};

export default injectIntl(_LinkButton);
