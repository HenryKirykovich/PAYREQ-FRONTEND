import React from "react";
import {injectIntl} from "react-intl";
import {Modal, Button} from "react-bootstrap";

const ConfirmDisconnectModal = ({show, intl, titleId, messageId, onConfirm, onCancel}) => (
    <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>{intl.formatMessage({id: titleId})}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p dangerouslySetInnerHTML={{__html: intl.formatMessage({id: messageId})}}/>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onCancel}>
                {intl.formatMessage({id: "connections.cancel"})}
            </Button>
            <Button bsStyle="danger" onClick={onConfirm}>
                {intl.formatMessage({id: "connections.disconnect"})}
            </Button>
        </Modal.Footer>
    </Modal>
);

export default injectIntl(ConfirmDisconnectModal);
