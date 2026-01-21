import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import Loading from "../Loading";
import axios from "axios";
import {LargeText} from "../common";
import ResetPasswordView from "./ResetPasswordView";

const getResetPasswordDetails = (id, code, setIsLoading, setResetPasswordResponse) => {
    axios.get("/auth/forgot/password", {
        params: {id, code}
    })
        .then(({data}) => setResetPasswordResponse(data))
        .finally(() => setIsLoading(false))
}

const ResetPassword = ({match: {params: {id, code}}}) => {
    const [resetPasswordResponse, setResetPasswordResponse] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => getResetPasswordDetails(id, code, setIsLoading, setResetPasswordResponse), [code, id])

    if (isLoading) return <Loading/>

    if (!resetPasswordResponse.forgot) return <LargeText text="resetPassword.loadingError"/>

    return (
        <ResetPasswordView reset={resetPasswordResponse.forgot}/>
    )
}

export default withRouter(ResetPassword);