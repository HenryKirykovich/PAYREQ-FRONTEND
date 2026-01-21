import React from 'react';
import VerifyAccountConfirmationCard from "../components/VerifyAccountConfirmation/VerifyAccountConfirmationCard";
import FastFormVerifyView from "../components/FastForm/FastFormVerifyView";


export default {
    title: 'Verify Account Confirmation',
};

const invite = {
    "invite": {
        "id": 891,
        "name": "Thanh  Nguyen",
        "uid": "thanhtest101@yahoo.com",
        "email": "thanhtest101@yahoo.com",
        "updatedBy": "system",
        "inviteCode": "c22ab6d0-d1a5-4075-95f2-795ada02121f",
        "inviter": {}
    }
}

const verify = {
    "success": true,
    "context": {
        "deviceVerificationRequired": false,
        "email": "thanhtest101@yahoo.com",
        "apiOnly": false,
        "mfaActivated": false,
        "username": null,
        "trustedFingerprint": null,
        "status": "pending",
        "language": "en",
        "userId": 891,
        "accountIsMybills": true,
        "mfaRequired": false,
        "accountId": 118864,
        "countryCode": "AU"
    },
    "loginStatus": "user-verification-required"
}

const verified = {
    "success": true,
    "context": {
        "deviceVerificationRequired": false,
        "email": "thanhtest101@yahoo.com",
        "apiOnly": false,
        "mfaActivated": false,
        "username": "thanhtest101@yahoo.com",
        "trustedFingerprint": null,
        "status": "active",
        "language": "en",
        "userId": 891,
        "accountIsMybills": true,
        "mfaRequired": false,
        "accountId": 118864,
        "countryCode": "AU"
    }
}
export const verifyAccountConfirmationCard = () => {
    return <VerifyAccountConfirmationCard invite={invite}/>
}

/* onClick is onVeriryAccount goes to a auth/verify which links to goToLoginPath() cannot make API Call */

