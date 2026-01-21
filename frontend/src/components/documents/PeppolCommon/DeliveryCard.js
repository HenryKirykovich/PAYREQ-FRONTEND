import React, { useState } from "react";

import * as XMLUtils from "../../../utils/xml-utils";
import { Card } from "../../common";
import FieldGroup from "../../common/FieldGroup";
import { HideAndShow, NameAndScheme, postalAddressText } from "./peppol-common";

import styles from "./PeppolCommon.module.scss";

const DeliveryCard = ({ delivery, intl }) => {
    const [showDetails, setShowDetails] = useState(false);

    if (!delivery) {
        return null;
    }

    const deliveryDate = XMLUtils.text(delivery, "./cbc:ActualDeliveryDate");
    const deliveryAddress = XMLUtils.node(delivery, "./cac:DeliveryLocation/cac:Address");
    const deliveryParty = XMLUtils.text(delivery, "./cac:DeliveryParty/cac:PartyName/cbc:Name");
    const deliveryId = XMLUtils.text(delivery, "./cac:DeliveryLocation/cbc:ID");
    const deliveryIdScheme = XMLUtils.text(delivery, "./cac:DeliveryLocation/cbc:ID/@schemeID");

    const visibleHideAndShow = [deliveryDate, deliveryAddress, deliveryParty, deliveryId].filter(Boolean).length > 1;

    return (
        <Card heading="peppol.invoice.view.documentDetails.delivery.heading">
            <div style={{ height: showDetails ? "auto" : "25px", overflow: "hidden" }}>
                <FieldGroup className={styles.detailsContainer}>
                    {deliveryDate &&
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.delivery.date.label" })}
                            value={intl.formatDate(deliveryDate)}
                        />
                    }
                    {deliveryParty &&
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.delivery.party.label" })}
                            value={deliveryParty}
                        />
                    }
                    {deliveryId &&
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.delivery.partyId.label" })}
                            value={<NameAndScheme name={deliveryId} schemeId={deliveryIdScheme} intl={intl} />}
                        />
                    }
                    {deliveryAddress &&
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.delivery.address.label" })}
                            value={postalAddressText(deliveryAddress, intl)}
                        />
                    }
                </FieldGroup>
            </div>
            {visibleHideAndShow && <HideAndShow showDetails={showDetails} setShowDetailsFn={setShowDetails} />}
        </Card>
    );
};

export default DeliveryCard;
