import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {LargeText, PageHeading, PrimaryButton, RegularText} from "../../common"
import Loading from "../../Loading";
import styles from "./ForwardingRulesSettings.module.scss";
import ForwardingRule from "./ForwardingRule";

const NoForwardingRules = () => {
        return (
            <React.Fragment>
                <RegularText text="settings.forwardingRules.notSetup.text"/>
            </React.Fragment>
        );
    };


export const getForwardingRules = (billerId, setIsLoading, setForwardingRules) => {
    axios.get(`/data/settings/forwarding-rules/${billerId}`)
        .then(({data}) => {
            setForwardingRules(data);
            setIsLoading(false)
        });
};

const ForwardingRulesSettings = ({billerId, history}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [forwardingRules, setForwardingRules] = useState();
    useEffect(
        () => getForwardingRules(billerId, setIsLoading, setForwardingRules),
        [billerId, setIsLoading, setForwardingRules]
    );

    if (isLoading) return <Loading/>;
    return (
        <React.Fragment>
            <PageHeading text="settings.forwardingRules.heading"/>
            <LargeText text="settings.forwardingRules.info"/>
            <div className={styles.createButtonContainer}>
                <PrimaryButton  label="settings.forwardingRules.create.button"
                                 icon="plus"
                                 onClick={() => history.push("./create")}/>
            </div>
            <div className={styles.existingForwardingRules}>
                {forwardingRules ?
                    forwardingRules.map((forwardingRule) => {
                    return (
                        <ForwardingRule forwardingRule={forwardingRule}
                                        showButtons={true}/>
                    ); })

                    : <NoForwardingRules/>}
            </div>
        </React.Fragment>
    )
};

export default withRouter(ForwardingRulesSettings);
