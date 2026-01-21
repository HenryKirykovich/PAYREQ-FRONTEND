import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom'

import {VerticalLayout, PageHeading} from "../../common";
import Loading from "../../Loading";
import ForwardingRulesForm from "./ForwardingRulesForm";

const onSubmit = (billerId, id, values, setSubmitting, history) => {
    setSubmitting(true);
    axios.put(
        `/data/settings/forwarding-rules/${billerId}/edit/${id}`,
        values
    )
        .then(() => history.push("../view"))
        .finally(() => setSubmitting(false));
};

export const getFowardingRule = (billerId, id, setIsLoading, setForwardingRule) => {
    axios.get(`/data/settings/forwarding-rules/${billerId}/edit/${id}`)
        .then(({data}) => {
            setForwardingRule(data);
            setIsLoading(false)
        });
};

const ForwardingRulesEditForm = ({billerId, id, history}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [forwardingRule, setForwardingRule] = useState();
    useEffect(
        () => getFowardingRule(billerId, id, setIsLoading, setForwardingRule),
        [billerId, id, setIsLoading, setForwardingRule]
    );

    if (isLoading) return <Loading/>;
    return (
        <VerticalLayout half>
            <PageHeading text="settings.forwardingRules.editForm.page.heading"/>
            <ForwardingRulesForm
               initialValues={forwardingRule.initialValues}
                options={forwardingRule.options}
                onSubmit={(values, {setSubmitting}) => onSubmit(billerId, id, values, setSubmitting, history)}/>
        </VerticalLayout>
    );
};

export default withRouter(ForwardingRulesEditForm);