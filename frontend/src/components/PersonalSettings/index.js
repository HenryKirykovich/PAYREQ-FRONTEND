import React, {useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import axios from "axios";
import Loading from "../Loading";
import PersonalSettingsView from "./PersonalSettingsView";
import {LOGIN_DETAILS_CARD} from "./personal-details-constants";


const getUserDetail = (setUserDetails, setLoading, setError) => {
    axios.get(`/data/personal/settings`)
        .then(({data}) => {
            setUserDetails(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching personal settings:", error);
            setError(error);
            setLoading(false);
        });
};


function PersonalSettings() {
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();
    const [error, setError] = useState(null);
    const [selectedSection, setSelectedSection] = useState(LOGIN_DETAILS_CARD);

    useEffect(() => {
        if (!userDetails && !error) {
            getUserDetail(setUserDetails, setIsLoading, setError)
        }
    }, [userDetails, error]);

    if (isLoading) return <Loading/>;
    
    if (error) {
        return (
            <div className="alert alert-danger">
                <h4>Error Loading Personal Settings</h4>
                <p>An unexpected error occurred while loading your personal settings. Please try again later.</p>
                <button className="btn btn-primary" onClick={() => {
                    setError(null);
                    setIsLoading(true);
                    setUserDetails(null);
                }}>
                    Retry
                </button>
            </div>
        );
    }
    
    if (!userDetails) return <Loading/>;

    return (
        <PersonalSettingsView initialUserDetails={userDetails}
                              reload={() => setUserDetails(null)}
                              selectedSection={selectedSection}
                              setSelectedSection={setSelectedSection}
        />
    );
}

export default injectIntl(PersonalSettings);