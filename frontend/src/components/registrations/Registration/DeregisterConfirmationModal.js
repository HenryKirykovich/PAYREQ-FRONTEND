import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {DangerButton, Modal, RegularText} from "../../common";

const deregister = (registration, history) => {
    axios.post(`/data/payer/registrations/${registration.payerId}/mailer/${registration.billerActorId}/channel/selfservice/deregister/${registration.id}`)
        .then(({data}) => {
            if (data.success) {
                history.push({
                    pathname: `./${registration.id}/deregistered`,
                    state: {registrationId: registration.id}})
            }
        });
};

const DeregisterConfirmationModal =
    ({show, info, onCancel, registration, history}) => {
        if (!show) {
            return null;
        }

        return (
            <Modal show={show}
                   title="registration.view.deregister.button"
                   buttonLabel="registration.view.deregister.button"
                   onCancel={onCancel}
                   onPrimaryAction={() => deregister(registration, history)}
                   PrimaryButtonComponent={DangerButton}
            >
                <RegularText text={info ? info : "registrations.deregister.info"}/>
                <RegularText text="registrations.deregister.areYouSure"/>

            </Modal>

        )
    };

export default withRouter(DeregisterConfirmationModal);