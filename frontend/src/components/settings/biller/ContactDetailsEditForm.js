import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom'

import {VerticalLayout} from "../../common";
import ContactDetailsForm from "./ContactDetailsForm";
import Loading from "../../Loading";
import {getContactDetails} from "./ContactDetailsSettings";

const onSubmit = (billerId, values, setSubmitting, history) => {
    setSubmitting(true);
    axios.put(
        `/data/settings/contact-details/${billerId}`,
        values
    )
        .then(({data}) => history.push({pathname: "./view", state: {data}}))
        .finally(() => setSubmitting(false));
};

const ContactDetailsEditForm = ({billerId, history}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactDetails, setContactDetails] = useState();
    useEffect(
        () => getContactDetails(billerId, setIsLoading, setContactDetails),
        [billerId, setIsLoading, setContactDetails]
    );

    if (isLoading) return <Loading/>;
    return (
        <VerticalLayout half>
            <ContactDetailsForm
                initialValues={contactDetails}
                onSubmit={(values, {setSubmitting}) => onSubmit(billerId, values, setSubmitting, history)}/>
        </VerticalLayout>
    );
};

export default withRouter(ContactDetailsEditForm);