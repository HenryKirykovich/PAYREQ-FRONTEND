import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";

import {LinkButton, PrimaryButton} from "../index";
import styles from "./Modal.module.scss"

const _Modal = ({show, onCancel, intl, title, children, onPrimaryAction, PrimaryButtonComponent = PrimaryButton, buttonType = "button",
                buttonLabel, disabled, cancelDisabled = disabled, ...rest}) => {
    const [internalDisabled, setInternalDisabled] = useState();
    return (
        <Modal show={show} onHide={onCancel} {...rest}>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: title})}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <div className={styles.modalFooter}>
                    <LinkButton onClick={onCancel} label="forms.generic.cancel.button" disabled={cancelDisabled !== undefined ? cancelDisabled : internalDisabled}/>
                    <PrimaryButtonComponent label={buttonLabel} disabled={disabled !== undefined ? disabled : internalDisabled} type={buttonType}
                                            onClick={() => {setInternalDisabled(true); onPrimaryAction();}}
                    />
                </div>
            </Modal.Footer>
        </Modal>
    )
};

_Modal.Header = Modal.Header;
_Modal.Title = Modal.Title;
_Modal.Body = Modal.Body;
_Modal.Footer = Modal.Footer;
_Modal.Container = Modal;

_Modal.propTypes = {
    show: PropTypes.bool,
    disabled: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onPrimaryAction: PropTypes.func,
    PrimaryButtonComponent: PropTypes.func,
    buttonType: PropTypes.string,
    buttonLabel: PropTypes.string
};

export default injectIntl(_Modal);
