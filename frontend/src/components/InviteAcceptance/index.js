import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import InviteAcceptanceView from "./InviteAcceptanceView";
import Loading from "../Loading";
import axios from "axios";
import {LargeText} from "../common";

const getInviteDetails = (code, userId, setIsLoading, setInviteResponse) => {
    axios.get("/auth/invite", {
        params: {userId, code}
    })
        .then(({data}) => setInviteResponse(data))
        .finally(() => setIsLoading(false))
}

const InviteAcceptance = ({match: {params: {userId, inviteCode}}}) => {
    const [inviteResponse, setInviteResponse] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => getInviteDetails(inviteCode, userId, setIsLoading, setInviteResponse), [inviteCode, userId])

    if (isLoading) return <Loading/>

    if (!inviteResponse.invite) return <LargeText text="inviteAcceptance.loadingError"/>

    return (
        <InviteAcceptanceView invite={inviteResponse.invite}/>
    )
}

export default withRouter(InviteAcceptance);