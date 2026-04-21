import React from "react";
import {Modal, Button} from "react-bootstrap";
import {injectIntl} from "react-intl";

const ConfirmDeregisterModal = ({show, onClose, onConfirm, intl}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {intl.formatMessage({id: "deregModalTitle"})}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{intl.formatMessage({id: "deregModalTextLine1"})}</p>
                <p>{intl.formatMessage({id: "deregModalTextLine2"})}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>
                    {intl.formatMessage({id: "forms.generic.cancel.button"})}
                </Button>
                <Button bsStyle="danger" onClick={onConfirm}>
                    {intl.formatMessage({id: "forms.generic.confirm.button"})}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default injectIntl(ConfirmDeregisterModal);
