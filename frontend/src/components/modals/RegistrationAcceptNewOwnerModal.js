import React, {useState} from "react";
import {Modal, Button, FormControl, Alert} from "react-bootstrap";

const RegistrationAcceptNewOwnerModal = ({show, onClose, onConfirm}) => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleConfirm = () => {
        if (!name.trim()) {
            setErrorMessage("Name is required");
            return;
        }
        onConfirm(name);
        setName("");
        setErrorMessage("");
    };

    const handleClose = () => {
        setName("");
        setErrorMessage("");
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter New Owner Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <p className="well">
                            Enter the name of the new owner as it appears on the bill.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label className="col-md-4 control-label">
                            New Owner Name
                        </label>
                        <div className="col-md-8">
                            <FormControl
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                placeholder="Enter new owner name"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="col-md-12">
                            <Alert bsStyle="danger">{errorMessage}</Alert>
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Cancel</Button>
                <Button bsStyle="primary" onClick={handleConfirm} disabled={!name.trim()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegistrationAcceptNewOwnerModal;
