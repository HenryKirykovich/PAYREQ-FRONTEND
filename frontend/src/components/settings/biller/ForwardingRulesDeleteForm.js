import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom'

import {PageHeading, SecondaryHeading, LinkButton, DangerButton} from "../../common";
import Loading from "../../Loading";
import styles from "./ForwardingRulesDeleteForm.module.scss";
import ForwardingRule from "./ForwardingRule";

const onSubmit = (billerId, id, setSubmitting, history) => {
    setSubmitting(true);
    axios.post(`/data/settings/forwarding-rules/${billerId}/delete/${id}`)
        .then(() => history.push("../view"))
        .finally(() => setSubmitting(false));
};

export const getFowardingRule = (billerId, id, setIsLoading, setFowardingRule) => {
    axios.get(`/data/settings/forwarding-rules/${billerId}/delete/${id}`)
        .then(({data}) => {
            setFowardingRule(data);
            setIsLoading(false)
        });
};

const ForwardingRulesDeleteForm = ({billerId, id, history}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [forwardingRule, setFowardingRule] = useState();
    const [isSubmitting, setSubmitting] = useState(false);
    useEffect(
        () => getFowardingRule(billerId, id, setIsLoading, setFowardingRule),
        [billerId, id, setIsLoading, setFowardingRule]
    );

    if (isLoading) return <Loading/>;
    return (
        <React.Fragment>
            <PageHeading text="settings.forwardingRules.deleteForm.page.heading"/>
            <div className={styles.ruleWrapper}>
                <ForwardingRule forwardingRule={forwardingRule}
                />
            </div>
            <div className={styles.deleteHeader}>
                <SecondaryHeading text="settings.forwardingRules.delete.text"/>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.buttonWrapper}>
                    <LinkButton label="forms.generic.cancel.button"
                                onClick={() => history.push("../view")}/>
                </div>
                <div className={styles.buttonWrapper}>
                    <DangerButton label="forms.generic.delete.button"
                                  onClick={() => onSubmit(billerId, id, setSubmitting, history)}
                                  isSubmitting={isSubmitting}/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(ForwardingRulesDeleteForm);