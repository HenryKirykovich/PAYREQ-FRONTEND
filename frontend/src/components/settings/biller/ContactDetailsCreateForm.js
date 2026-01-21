import React from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom'

import {VerticalLayout} from "../../common";
import ContactDetailsForm from "./ContactDetailsForm";

const onSubmit = (billerId, values, setSubmitting, history) => {
    setSubmitting(true);
    axios.post(
        `/data/settings/contact-details/${billerId}`,
        values
    )
        .then(({data}) => history.push({pathname: "./view", state: {data}}))
        .finally(() => setSubmitting(false));
};

const ContactDetailsCreateForm = ({billerId, history}) => (
    <VerticalLayout half>
        <ContactDetailsForm onSubmit={(values, {setSubmitting}) => onSubmit(billerId, values, setSubmitting, history)}/>
    </VerticalLayout>
);

export default withRouter(ContactDetailsCreateForm);