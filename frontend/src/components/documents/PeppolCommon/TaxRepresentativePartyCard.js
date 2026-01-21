import React, { useState } from "react";

import * as XMLUtils from "../../../utils/xml-utils";
import { Card } from "../../common";
import FieldGroup from "../../common/FieldGroup";
import { HideAndShow, postalAddressText, taxSchemeText } from "./peppol-common";

import styles from "./PeppolCommon.module.scss";

function TaxRepresentativePartyCard({ bisDoc, intl }) {
    const [showDetails, setShowDetails] = useState(false);

    const taxRep = XMLUtils.node(bisDoc, "./cac:TaxRepresentativeParty");

    if (!taxRep) {
        return null;
    }

    const partyName = XMLUtils.text(taxRep, "./cac:PartyName/cbc:Name");
    const postalAddress = XMLUtils.node(taxRep, "./cac:PostalAddress");
    const partyTaxScheme = XMLUtils.node(taxRep, "./cac:PartyTaxScheme");

    const visibleHideAndShow = [partyName, partyTaxScheme].filter(Boolean).length > 1;

    return (
        <Card heading="peppol.invoice.view.documentDetails.taxRep.heading">
            <div style={{ height: showDetails ? "auto" : "25px", overflow: "hidden" }}>
                <FieldGroup className={styles.detailsContainer}>
                    <FieldGroup.Field
                        label={intl.formatMessage({ id: "peppol.party.name.label" })}
                        value={partyName}
                    />
                    <FieldGroup.Field
                        label={intl.formatMessage({ id: "peppol.party.address.label" })}
                        value={postalAddressText(postalAddress)}
                    />
                    {partyTaxScheme && taxSchemeText(partyTaxScheme, intl)}
                </FieldGroup>
            </div>
            {visibleHideAndShow && <HideAndShow showDetails={showDetails} setShowDetailsFn={setShowDetails} />}
        </Card>
    );
};

export default TaxRepresentativePartyCard;
