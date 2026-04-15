import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom'

import {VerticalLayout, PageHeading, SecondaryButton, LargeText} from "../../common";
import ForwardingRulesForm from "./ForwardingRulesForm";
import loaderStyles from "../../Loading/Loader.module.scss";
import styles from "./ForwardingRulesCreateForm.module.scss";

const onSubmit = (billerId, values, setSubmitting, history) => {
    setSubmitting(true);
    axios.post(
        `/data/settings/forwarding-rules/${billerId}`,
        values
    )
        .then(({data}) => history.push({pathname: "./view", state: {data}}))
        .finally(() => setSubmitting(false));
};

export const getCreateForwardingRulesValues = (billerId, setIsLoading, setCreateForwardingRulesVals) => {
    axios.get(`/data/settings/forwarding-rules/create/${billerId}`)
        .then(({data}) => {
            setCreateForwardingRulesVals(data);
            setIsLoading(false)
        });
};


const Loading = () => (
    <div className={styles.loadingContainer}>
        <div className={loaderStyles.loadingContainer}>
            <div className={loaderStyles.loader}/>
            <h4>Syncing PropertyMe Suppliers...</h4>
        </div>
        <h4>It may take several minutes to complete the first sync</h4>
    </div>
);

const ForwardingRulesCreateForm = ({billerId, history}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [createForwardingRulesVals, setCreateForwardingRulesVals] = useState();
    useEffect(
        () => getCreateForwardingRulesValues(billerId, setIsLoading, setCreateForwardingRulesVals),
        [billerId, setIsLoading, setCreateForwardingRulesVals]
    );

    if (isLoading) return <Loading/>;
    return (
        <VerticalLayout half>
            <PageHeading text="settings.forwardingRules.createForm.page.heading"/>
            {createForwardingRulesVals.connections ?
                <ForwardingRulesForm onSubmit={(values, {setSubmitting}) => onSubmit(billerId, values, setSubmitting, history)}
                                     options={createForwardingRulesVals}/>
            : <div>
                    <LargeText text="settings.forwardingRules.createForm.no.connection.heading" />
                    <SecondaryButton label="settings.forwardingRules.createForm.no.connection.button"
                                onClick={() => window.location.href = `/portal/customer/biller/${billerId}/settings/connections`}/>

              </div>}
        </VerticalLayout>)
};

export default withRouter(ForwardingRulesCreateForm);