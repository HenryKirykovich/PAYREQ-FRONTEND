import React, {useEffect, useState} from "react";

import {withRouter} from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import VerifyAccountView from "./VerifyAccountView";


export const getUsername = (setIsLoading, setUsername) => {
    axios.get(`/auth/resend-email`)
        .then(({data}) => {
            setUsername(data.username);
            setIsLoading(false)
        });
};

const onResendVerificationCode = (setSubmitting, setShowResent, setShowMaxResends) => {
    setSubmitting(true);
    setShowResent(false);
    setShowMaxResends(false);

    axios.post(
        `/auth/resend-email`
    )
        .then(({data}) => {
            if(data.success) {
                setShowResent(true);
            } else {
                setShowMaxResends(true);
            }})
        .finally(() => setSubmitting(false));
};



const VerifyAccount = ({history}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState();
    const [isSubmitting, setSubmitting] = useState(false);
    const [showResent, setShowResent] = useState(false);
    const [showMaxResends, setShowMaxResends] = useState(false);

    useEffect(
        () => getUsername(setIsLoading, setUsername),
        [setIsLoading, setUsername]
    );

    if (isLoading) return <Loading />

    return (
        <VerifyAccountView username={username}
                          resend={() => onResendVerificationCode(setSubmitting, setShowResent, setShowMaxResends)}
                          isSubmitting={isSubmitting}
                          showResent={showResent}
                          showMaxResends={showMaxResends}
        />
    );
};

export default withRouter(VerifyAccount);