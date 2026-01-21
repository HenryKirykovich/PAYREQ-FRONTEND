import React, {useState} from "react";

import {Modal, RegularText} from "../../common";
import {FormControl, FormGroup} from "react-bootstrap";

const buildRegistrationObjects = textareaValue => textareaValue.split("\n").map(r => {
    const [accountNumber, authfield1] = r.split('\t');
    return {accountNumber, authfield1};
});

const MyBillsAgentExcelLoadModal =
    ({show, onCancel, channel, setRegistrations}) => {
        const [textareaValue, setTextareaValue] = useState();
        if (!show) {
            return null;
        }

        const textareaPlaceholder = channel.useAuthItem1 ?
                                        channel.registrationContactIdField + "…\t" + channel.authItem1Field + "…" :
                                        channel.registrationContactIdField + "…";
        return (
            <Modal show={show}
                   title="registrations.createMyBillsAgent.excelModal.heading"
                   buttonLabel="registrations.createMyBillsAgent.excelModal.button"
                   onCancel={onCancel}
                   onPrimaryAction={() => {
                       setRegistrations(buildRegistrationObjects(textareaValue));
                       onCancel();
                   }}
            >
                <RegularText text="registrations.createMyBillsAgent.excelModal.instruction"/>
                <RegularText text="registrations.createMyBillsAgent.excelModal.instruction.column1"
                             values={{name: channel.registrationContactIdField}}/>
                {channel.useAuthItem1 &&
                    <RegularText text="registrations.createMyBillsAgent.excelModal.instruction.column2"
                                 values={{name: channel.authItem1Field}}/>}

                <FormGroup controlId="formControlsTextarea">
                    <FormControl componentClass="textarea"
                                 placeholder={[textareaPlaceholder, textareaPlaceholder, textareaPlaceholder].join("\n")}
                                 rows="4"
                                 value={textareaValue}
                                 onChange={e => setTextareaValue(e.target.value)}
                    />
                </FormGroup>
            </Modal>
        )
    };

export default MyBillsAgentExcelLoadModal;