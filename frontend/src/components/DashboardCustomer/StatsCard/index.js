import React, {useEffect, useState} from "react";
import {FieldGroup} from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";
import {injectIntl} from "react-intl";
import styles from "./SupportDetailsCard.module.scss";
import axios from "axios";
import {useAppState} from "../../../state";
import LargeText from "../../common/text/LargeText";

const getActiveRegistrations = (setIsLoadingRegistrations, setActiveRegistrations, billerId) => {
    axios.get("/data/registrations/active", {params: {billerId: billerId}})
        .then(({data}) => {
            if (data.success){
                const activeRegistrations = (data.active || 0)
                setActiveRegistrations(activeRegistrations);
            }
            setIsLoadingRegistrations(false);
        });
};

const getContactStats = (setIsLoadingContacts, setContactStats, billerId) => {
    axios.get("/data/contacts/stats", {params: {billerId: billerId}})
        .then(({data}) => {
            if (data.success){
                setContactStats(data);
            }
            setIsLoadingContacts(false);
        });
};

export const formatEndDate = (endDate, intl) => {
    return intl.formatDate(endDate, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',

    })};

const StatsCard = ({intl}) => {
    const [{biller}] = useAppState();
    const [activeRegistrations, setActiveRegistrations] = useState();
    const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(true);
    const [contactStats, setContactStats] = useState({});
    const [isLoadingContacts, setIsLoadingContacts] = useState(true);

    useEffect(() => {
        getActiveRegistrations(setIsLoadingRegistrations, setActiveRegistrations, biller.id);
        getContactStats(setIsLoadingContacts, setContactStats, biller.id);
    }, [biller.id, setIsLoadingRegistrations, setActiveRegistrations, setIsLoadingContacts, setContactStats]);

    if (!isLoadingRegistrations && !isLoadingContacts)
        return (
            <DashboardCard panelHeading="dashboard.stats.heading">
                <LargeText text="dashboard.stats.subheading" />
                <FieldGroup className={styles.detailsContainer}>
                    {contactStats.latest && <FieldGroup.Field label={intl.formatMessage({id: "dashboard.stars.contactsLatestJob.label"})} value={formatEndDate(contactStats.latest, intl)}/>}
                    {contactStats.count >= 0 && <FieldGroup.Field label={intl.formatMessage({id: "dashboard.stars.contactsCount.label"})} value={contactStats.count}/>}
                    {activeRegistrations >= 0 && <FieldGroup.Field label={intl.formatMessage({id: "dashboard.stars.active.label"})} value={activeRegistrations}/>}
                </FieldGroup>
            </DashboardCard>
        )

    return null;
};

export default injectIntl(StatsCard);
