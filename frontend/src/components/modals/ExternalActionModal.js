import React, {useState} from "react";
import {Modal, Button, FormControl} from "react-bootstrap";
import {injectIntl} from "react-intl";

const ExternalActionModal = ({show, onClose, onSave, intl}) => {
    const [actionDescription, setActionDescription] = useState("");

    const handleSave = () => {
        onSave(actionDescription);
        setActionDescription("");
    };

    const handleClose = () => {
        setActionDescription("");
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {intl.formatMessage({id: "externalAction.modalTitle"})}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <label className="col-md-4 control-label">
                            {intl.formatMessage({id: "externalAction.actionDescriptionLabel"})}
                        </label>
                        <div className="col-md-8">
                            <FormControl
                                type="text"
                                value={actionDescription}
                                onChange={(e) => setActionDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>
                    {intl.formatMessage({id: "forms.generic.cancel.button"})}
                </Button>
                <Button bsStyle="primary" onClick={handleSave} disabled={!actionDescription.trim()}>
                    {intl.formatMessage({id: "forms.generic.save.button"})}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default injectIntl(ExternalActionModal);
