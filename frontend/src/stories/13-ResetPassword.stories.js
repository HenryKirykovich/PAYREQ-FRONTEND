import React from 'react';
import ResetPasswordView from "../components/ResetPassword/ResetPasswordView";

export default {
    title: 'ResetPassword',
};

const apiResponse = {
    "reset": {
        "success": true,
        "forgot": {
            "uid": "kristie.bergamin@payreq.com",
            "id": 41,
            "code": "a8ac1b6a-212e-4745-a8b1-698b2b84c8e8",
        }
    }, "mybillsAccountsOnly": false
}

export const resetPasswordView = () => <ResetPasswordView reset={apiResponse.reset.forgot}/>