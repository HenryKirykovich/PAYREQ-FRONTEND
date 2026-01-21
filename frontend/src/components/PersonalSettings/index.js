import React, {useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import axios from "axios";
import Loading from "../Loading";
import PersonalSettingsView from "./PersonalSettingsView";
import {LOGIN_DETAILS_CARD} from "./personal-details-constants";


const getUserDetail = (setUserDetails, setLoading) => {
    axios.get(`/data/personal/settings`)
        .then(({data}) => {
            setUserDetails(data);
            setLoading(false);
        })
};


function PersonalSettings() {
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();
    const [selectedSection, setSelectedSection] = useState(LOGIN_DETAILS_CARD);

    useEffect(() => {
        if (!userDetails) {
            getUserDetail(setUserDetails, setIsLoading)
        }
    }, [userDetails]);

    if (isLoading || !userDetails) return <Loading/>;

    return (
        <PersonalSettingsView initialUserDetails={userDetails}
                              reload={() => setUserDetails(null)}
                              selectedSection={selectedSection}
                              setSelectedSection={setSelectedSection}
        />
    );
}

export default injectIntl(PersonalSettings);