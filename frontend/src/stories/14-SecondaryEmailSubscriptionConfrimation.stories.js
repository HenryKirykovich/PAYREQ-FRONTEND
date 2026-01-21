import React from 'react';
import EmailSubscriptionVerificationCancelled from "../components/EmailSubscriptionVerification/EmailSubscriptionVerificationCancelled";
import EmailSubscriptionVerificationConfirmed
    from "../components/EmailSubscriptionVerification/EmailSubscriptionVerificationConfirmed";
import {InviteConfirmation, NoInviteFound} from "../components/EmailSubscriptionVerification/index";


export default {
    title: 'Secondary Email Subscription Confirmation',
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

export const emailSubscriptionVerification = () => {
    return <InviteConfirmation invite={invite} showError={false}/>
}

export const emailSubscriptionVerificationWithError = () => {
    return <InviteConfirmation invite={invite} showError={true}/>
}

export const emailSubscriptionVerificationNoInvite = () => {
    return <NoInviteFound/>
}

export const emailSubscriptionVerificationCancelled = () => {
    return <EmailSubscriptionVerificationCancelled/>
}

export const emailSubscriptionVerificationConfirmed = () => {
    return <EmailSubscriptionVerificationConfirmed/>
}
