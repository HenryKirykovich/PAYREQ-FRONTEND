import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {LargeText, PageHeading, RegularText, SecondaryButton} from "../../common"
import Loading from "../../Loading";
import ContactDetails from "./ContactDetails";
import styles from "./ContactDetailsSettings.module.scss"

const NoContactDetails = withRouter(
    ({history}) => {
        return (
            <React.Fragment>
                <RegularText text="settings.contactDetails.notSetup.text"/>
                <SecondaryButton label="settings.contactDetails.create.button"
                                 onClick={() => history.push("./create")}/>
            </React.Fragment>
        );
    }
);

export const getContactDetails = (billerId, setIsLoading, setContactDetails) => {
    axios.get(`/data/settings/contact-details/${billerId}`)
        .then(({data}) => {
            setContactDetails(data);
            setIsLoading(false)
        });
};


const ContactDetailsSettings = ({billerId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactDetails, setContactDetails] = useState();
    useEffect(
        () => getContactDetails(billerId, setIsLoading, setContactDetails),
        [billerId, setIsLoading, setContactDetails]
    );

    if (isLoading) return <Loading/>;
    return (
        <React.Fragment>
            <PageHeading text="settings.contactDetails.heading"/>
            <LargeText text="settings.contactDetails.info"/>
            <div className={styles.container}>
                {contactDetails ? <ContactDetails contactDetails={contactDetails}/> : <NoContactDetails/>}
            </div>
        </React.Fragment>
    )
};

export default ContactDetailsSettings;
