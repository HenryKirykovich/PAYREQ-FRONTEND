import React from 'react';
import EmailConnectionVerificationCancelled from "../components/EmailSubscriptionVerification/EmailSubscriptionVerificationCancelled";
import EmailConnectionVerificationConfirmed
    from "../components/EmailSubscriptionVerification/EmailSubscriptionVerificationConfirmed";
import {InviteConfirmation, NoInviteFound} from "../components/EmailSubscriptionVerification/index";


export default {
    title: 'Secondary Email Connection Confirmation',
};

const invite = {
    "registrationValue": "blahblah@payreq.com",
    "deactivatedTime": null,
    "payerRegistrationId": 21480,
    "lastUpdatedTime": "2022-10-05T03:02:54Z",
    "verificationCode": "71dd0b3c-b114-47e9-a7ad-987472ce9999:1664938974887",
    "createdTime": "2022-10-05T03:02:54Z",
    "updatedBy": "cl322322322@gmail.com",
    "status": 1,
    "id": 3864,
    "billerName": "Demo Council",
    "activatedTime": null
}

export const emailConnectionVerification = () => {
    return <InviteConfirmation invite={invite} showError={false}/>
}

export const emailConnectionVerificationWithError = () => {
    return <InviteConfirmation invite={invite} showError={true}/>
}

export const emailConnectionVerificationNoInvite = () => {
    return <NoInviteFound/>
}

export const emailConnectionVerificationCancelled = () => {
    return <EmailConnectionVerificationCancelled/>
}

export const emailConnectionVerificationConfirmed = () => {
    return <EmailConnectionVerificationConfirmed/>
}
