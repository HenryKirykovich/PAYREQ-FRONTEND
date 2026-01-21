import axios from "axios";
import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";

import { usePresentation } from "../../state";
import { goToLoginPath } from "../../utils/login-utils";
import { LEGACY_POST_AXIOS_CONFIG } from "../../utils/form-utils";
import Loading from "../Loading";

import VerifyAccountConfirmationCard from "./VerifyAccountConfirmationCard";

export const getUsername = (setIsLoading, setInvite, code, id) => {
    axios.get(`/auth/verify`, { params: { userId: id, code: code } })
        .then(({ data }) => {
            setInvite(data.invite);
            setIsLoading(false)
        });
};

const onVerifyAccount = (code, userId, email, setSubmitting, setSeverError, isMobileApp) => {
    setSubmitting(true);
    setSeverError(false);

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('userId', userId);

    axios.post(
        `/auth/verify`, params, LEGACY_POST_AXIOS_CONFIG
    )
        .then(({ data }) => {
            if (data.success) {
                if (isMobileApp) {
                    const params = new URLSearchParams("");
                    params.append("email", email);
                    window.location = "payreq:///webapp/emailVerificationCompleted?" + params.toString();
                } else {
                    goToLoginPath(data.context);
                }
            } else {
                setSeverError(true);
            }
        })
        .finally(() => setSubmitting(false));
};

const VerifyAccountConfirmation = ({ match: { params: { code, id } }, history }) => {
    const [serverError, setServerError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [invite, setInvite] = useState();
    const [isSubmitting, setSubmitting] = useState(false);
    const { isMobileApp } = usePresentation();

    useEffect(
        () => getUsername(setIsLoading, setInvite, code, id),
        [setIsLoading, setInvite, code, id]
    );

    if (isLoading) {
        return <Loading />;
    }

    if (!invite) {
        if (isMobileApp) {
            window.location = "payreq:///webapp/invalidInviteReceived";
            return null;
        } else {
            window.location.href = "/portal/customer/login";
        }
    } else {
        return (
            <VerifyAccountConfirmationCard invite={invite}
                isSubmitting={isSubmitting}
                serverError={serverError}
                verifyAccount={() => onVerifyAccount(code, id, invite.email, setSubmitting, setServerError, isMobileApp)}
            />
        );
    }
};

export default injectIntl(withRouter(VerifyAccountConfirmation));
