import React, {useState} from "react";
import {injectIntl} from "react-intl";
import modalStyles from "../../common/Modal/Modal.module.scss";
import {LinkButton, Modal, PrimaryButton, RegularText} from "../../common";
import UpdateEmailDetailsForm from "./UpdateEmailDetailsForm";

const SuccessfulUpdate = ({serverMsg, intl, onCancel}) => {
    return(
        <React.Fragment>
            <Modal.Body>
                <RegularText>{intl.formatMessage({id: "personalSettings.email.changed"}, {email: serverMsg})}</RegularText>
            </Modal.Body>
            <Modal.Footer>
                <div className={modalStyles.modalFooter}>
                    <LinkButton onClick={onCancel} label="forms.generic.cancel.button"
                                disabled={false}/>
                    <PrimaryButton label="forms.generic.ok" onClick={() => window.location.reload()}/>
                </div>
            </Modal.Footer>
        </React.Fragment>)
}

function UpdateEmailModal({onCancel, show, intl}) {
    const [isUpdateComplete, setIsUpdateComplete] = useState(false)
    const [serverMsg, setServerMsg] = useState("");

    return (
        <Modal.Container show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: "personalSettings.email.update"})}</Modal.Title>
            </Modal.Header>
            {!isUpdateComplete && <UpdateEmailDetailsForm setServerMsg={setServerMsg}
                                                          setIsUpdateComplete={setIsUpdateComplete}
                                                          onCancel={onCancel}/>}
            {isUpdateComplete && <SuccessfulUpdate serverMsg={serverMsg}
                                                   intl={intl}
                                                   onCancel={onCancel}/>}

        </Modal.Container>)
}

export default injectIntl(UpdateEmailModal);

