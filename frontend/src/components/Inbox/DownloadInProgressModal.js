import {Modal, PrimaryButton, RegularText} from "../common";
import {DATE_PARTS} from "./inbox-constants";
import React from "react";
import {injectIntl} from "react-intl";


const DownloadInProgressModal = ({show, job, onPrimaryAction, onCancel, intl}) => {

    return (
    <Modal show={show}
           title="inbox.download.in.progress.modal.header"
           buttonLabel="inbox.download.in.progress.modal.button"
           onCancel={onCancel}
           onPrimaryAction={onPrimaryAction}
           PrimaryButtonComponent={PrimaryButton}>
        {job && <RegularText text="inbox.download.in.progress.modal.text"
                             values={{startTime: intl.formatDate(job.startDate, DATE_PARTS)}}/>}
    </Modal>);
};

export default injectIntl(DownloadInProgressModal);