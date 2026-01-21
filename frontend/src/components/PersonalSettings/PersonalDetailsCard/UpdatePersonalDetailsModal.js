import React, {useState} from "react";
import {LinkButton, Modal, PrimaryButton, RegularText} from "../../common";
import {injectIntl} from "react-intl";
import UpdateDetailsForm from "./UpdateDetailsForm";
import modalStyles from "../../common/Modal/Modal.module.scss"

const SuccessfulUpdate = ({reload}) => {
    return (
        <React.Fragment>
            <Modal.Body>
                <RegularText text="personalSettings.personal.details.updated"/>
            </Modal.Body>
            <Modal.Footer>
                <div className={modalStyles.modalFooter}>
                    <LinkButton label="forms.generic.cancel.button" onClick={reload}/>
                    <PrimaryButton label="forms.generic.ok" onClick={reload}/>
                </div>
            </Modal.Footer>
        </React.Fragment>)
}

function UpdatePersonalDetailsModal({onCancel, show, intl, personalDetails, reload}) {
    const [isFormSumbitted, setIsFormSubmitted] = useState(false)

    return (
        <Modal.Container show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: "personalSettings.personal.details.update"})}</Modal.Title>
            </Modal.Header>

            {!isFormSumbitted && <UpdateDetailsForm personalDetails={personalDetails} onCancel={onCancel}
                                                    setIsFormSubmitted={setIsFormSubmitted}
                                                    />}
            {isFormSumbitted && <SuccessfulUpdate reload={reload}/>}
        </Modal.Container>)
}

export default injectIntl(UpdatePersonalDetailsModal);