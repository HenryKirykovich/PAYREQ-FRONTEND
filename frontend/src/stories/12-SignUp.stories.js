import React from 'react';
import InviteAcceptanceView from "../components/InviteAcceptance/InviteAcceptanceView";

export default {
    title: 'SignUp',
};

const apiResponse = {
    "invite": {
        "id": 42,
        "name": "Emile i7 default lang",
        "uid": "emile.raffoul+i7-default@payreq.com",
        "email": "emile.raffoul+i7-default@payreq.com",
        "updatedBy": "emile.raffoul@payreq.com",
        "inviteCode": "f6d924f2-666a-4d0b-aa91-984e470d382b",
        "inviter": {
            "uid": "emile.raffoul@payreq.com",
            "id": 1,
            "name": "Emile Raffoul 111",
            "email": "emile.raffoul@payreq.com"
        }
    }, "mybillsAccountsOnly": false
}

export const inviteAcceptanceView = () => <InviteAcceptanceView invite={apiResponse.invite}/>