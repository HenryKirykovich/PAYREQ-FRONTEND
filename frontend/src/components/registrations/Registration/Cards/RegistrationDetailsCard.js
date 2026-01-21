import React from "react";

import {Card, Label} from "../../../common";
import FieldGroup from "../../../common/FieldGroup";
import styles from "./RegistrationDetailsCard.module.scss";

const StatusField = ({registration, intl}) => (
    <React.Fragment>
        {registration.status === "pending" &&
        <FieldGroup.Field label={intl.formatMessage({id: "generic.status"})}
                          value={<Label
                              type={Label.WARNING}>{intl.formatMessage({id: "registration.view.status.pending"})}</Label>}/>}

        {registration.status === "active" && registration.activatedDate &&
        <FieldGroup.Field label={intl.formatMessage({id: "generic.status"})}
                          value={<Label
                              type={Label.SUCCESS}>{intl.formatMessage({id: "registration.view.status.active"}, {
                                  date: intl.formatDate(registration.activatedDate, {
                                      year: 'numeric',
                                      month: 'numeric',
                                      day: 'numeric'
                                  })
                              }
                          )}</Label>}/>}

        {registration.status === "deregistered" && registration.deactivatedDate &&
        <FieldGroup.Field label={intl.formatMessage({id: "generic.status"})}
                          value={<Label
                              type={Label.DEFAULT}>{intl.formatMessage({id: "registration.view.status.deregistered"}, {
                                  date: intl.formatDate(registration.deactivatedDate, {
                                      year: 'numeric',
                                      month: 'numeric',
                                      day: 'numeric'
                                  })
                              }
                          )}</Label>}/>}

        {registration.status === "failed" && registration.deactivatedDate &&
        <FieldGroup.Field label={intl.formatMessage({id: "generic.status"})}
                          value={<Label
                              type={Label.DANGER}>{intl.formatMessage({id: "registration.view.status.failed"}, {
                                  date: intl.formatDate(registration.deactivatedDate, {
                                      year: 'numeric',
                                      month: 'numeric',
                                      day: 'numeric'
                                  })
                              }
                          )}</Label>}/>}
    </React.Fragment>
);


const RegistrationDetailsCard = ({registration, intl}) => (
    <Card heading="registration.view.registrationDetails.heading">
        <FieldGroup className={styles.detailsContainer}>
            <StatusField registration={registration} intl={intl}/>
            {registration.deactivatedReason && registration.channelPartnerSystemId !== "mybills" && (
                <FieldGroup.Field label={intl.formatMessage({id: "registration.view.deactivationReason"})}
                                  value={intl.formatMessage({id: "registration.view.deactivationReason." + registration.deactivatedReason})}/>

            )}

            <FieldGroup.Field label={intl.formatMessage({id: "registration.view.deliveryMethod"})}
                              value={intl.formatMessage({id: "registration.view.channel." + registration.channelPartnerSystemId})}/>
            <FieldGroup.Field label={intl.formatMessage({id: "registration.view.billerName"})}
                              value={registration.mybillsDisplayName}/>
            <FieldGroup.Field label={registration.registrationContactIdField}
                              value={registration.accountNumber}/>
            {registration.useAuthItem1 && registration.authItem1 &&
                <FieldGroup.Field label={registration.authItem1Field}
                                  value={registration.authItem1}/>}
            {registration.useAuthItem2 && <FieldGroup.Field label={registration.authItem2Field}
                                                            value={registration.authItem2}/>}
            {registration.useAuthItem3 && <FieldGroup.Field label={registration.authItem3Field}
                                                            value={registration.authItem3}/>}
            {registration.useAuthItem4 && <FieldGroup.Field label={registration.authItem4Field}
                                                            value={registration.authItem4}/>}
            <FieldGroup.Field label={intl.formatMessage({id: "registration.view.createdOn"})}
                              value={intl.formatDate(registration.createdDate, {
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: 'numeric'
                              })}/>
        </FieldGroup>
    </Card>
);

export default RegistrationDetailsCard;
