import React from "react";

import {Card} from "../../common";
import FieldGroup from "../../common/FieldGroup";
import styles from "../DeliveredByDetailsCard/DeliveredByDetailsCard.module.scss";


const DeliveredByDetailsCard = ({invoice, intl}) => {
    return (
        <Card heading="invoice.payroll.view.deliveredBy.heading">
            <FieldGroup className={styles.detailsContainer}>
                {invoice.invoiceDelivery.map(delivery => <FieldGroup.Field key={delivery.channelPartnerSystemId}
                                                                           label={intl.formatMessage({id: "registrations.receive.channel." + delivery.channelPartnerSystemId})}
                                                                           value={intl.formatDate(delivery.receivedTime, {
                                                                               year: 'numeric',
                                                                               month: 'numeric',
                                                                               day: 'numeric',
                                                                               hour: 'numeric',
                                                                               minute: 'numeric',
                                                                               second: 'numeric'
                                                                           })}/>)}
            </FieldGroup>
        </Card>
    )
};

export default DeliveredByDetailsCard;
