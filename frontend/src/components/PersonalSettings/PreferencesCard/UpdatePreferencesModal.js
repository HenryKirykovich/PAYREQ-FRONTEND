import React, {useState} from "react";
import {LinkButton, Modal, PrimaryButton, RegularText} from "../../common";
import {injectIntl} from "react-intl";
import UpdateBillerPrefForm from './UpdateBillerPrefForm'
import UpdatePayerPrefForm from './UpdatePayerPrefForm'
import modalStyles from "../../common/Modal/Modal.module.scss"

const SuccessfulUpdate = ({hasLanguageChanged, reload}) => {
    const onClose = () => {
        if (hasLanguageChanged) {
            return window.location.reload();
        } else {
            return reload();
        }
    }
    return (
        <React.Fragment>
            <Modal.Body>
                <RegularText text="personalSettings.preferences.updated"/>
            </Modal.Body>
            <Modal.Footer>
                <div className={modalStyles.modalFooter}>
                    <LinkButton onClick={onClose} label="forms.generic.cancel.button"/>
                    <PrimaryButton label="forms.generic.ok" onClick={onClose}/>
                </div>
            </Modal.Footer>
        </React.Fragment>)
}

function UpdatePreferencesModal({onCancel, show, isBiller, preferences, intl, reload}) {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [hasLanguageChanged, setHasLanguageChanged] = useState(false)
    return (
        <Modal.Container show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: "personalSettings.preferences.update"})}</Modal.Title>
            </Modal.Header>

            {isBiller && !isSubmitted && <UpdateBillerPrefForm onCancel={onCancel}
                                                               preferences={preferences}
                                                               setIsSubmitted={setIsSubmitted}
                                                               setHasLanguageChanged={setHasLanguageChanged}/>}

            {!isBiller && !isSubmitted && <UpdatePayerPrefForm onCancel={onCancel}
                                                               preferences={preferences}
                                                               setIsSubmitted={setIsSubmitted}
                                                               setHasLanguageChanged={setHasLanguageChanged}/>}

            {isSubmitted && <SuccessfulUpdate reload={reload} hasLanguageChanged={hasLanguageChanged}/>}

        </Modal.Container>
    )
}

export default injectIntl(UpdatePreferencesModal)