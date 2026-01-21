import React, {useEffect, useState} from "react";
import {PageHeading} from "../../common";
import Loading from "../../Loading";
import axios from "axios";
import ChangeMfaForm from "./ChangeMfaForm";

const getUserSettings = (setUserSettings, setIsLoading) => {
    axios.get(`/data/personal/settings`)
        .then(({data}) => {
            setUserSettings(data);
            setIsLoading(false);
        })
};


const ChangeMfa = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userSettings, setUserSettings] = useState(true);

    useEffect(() => getUserSettings(setUserSettings, setIsLoading), [])

    if (isLoading) return <Loading/>;

    return (
        <React.Fragment>
            <PageHeading text="personalSettings.security.mfa"/>
            <ChangeMfaForm mfa={userSettings.mfa}/>
        </React.Fragment>
    )
};

export default ChangeMfa;