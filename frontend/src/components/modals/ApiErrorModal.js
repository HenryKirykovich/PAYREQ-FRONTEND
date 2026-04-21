import React from "react";
import {Modal, Button} from "react-bootstrap";

const ApiErrorModal = ({show, onRefresh}) => {
    return (
        <Modal show={show} bsSize="small" backdrop="static">
            <Modal.Header>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>An unknown error has occurred.</p>
                <p>Please refresh and try again.</p>
                <p>If the error continues, contact <a href="mailto:support@payreq.com?subject=Payreq Support Enquiry">support@payreq.com</a></p>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="primary" onClick={onRefresh}>
                    <span className="glyphicon glyphicon-refresh"></span> Refresh
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ApiErrorModal;
