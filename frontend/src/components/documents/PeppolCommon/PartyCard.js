import React, { useState } from "react";

import * as XMLUtils from "../../../utils/xml-utils";
import { Card } from "../../common";
import FieldGroup from "../../common/FieldGroup";
import { contactText, HideAndShow, legalEntityText, NameAndScheme, postalAddressText, taxSchemeText } from "./peppol-common";

import styles from "./PeppolCommon.module.scss";

function PartyCard({ headerIntlKey, intl, party }) {
    const [showDetails, setShowDetails] = useState(false);

    const partyName = XMLUtils.text(party, "./cac:PartyName/cbc:Name");
    const partyIdentifications = XMLUtils.nodes(party, "./cac:PartyIdentification");
    const postalAddress = XMLUtils.node(party, "./cac:PostalAddress");
    const legalEntity = XMLUtils.node(party, "./cac:PartyLegalEntity");
    const contact = XMLUtils.node(party, "./cac:Contact");
    const taxSchemeInfo = XMLUtils.nodes(party, "./cac:PartyTaxScheme");

    return (
        <Card heading={headerIntlKey}>
            <div style={{ height: showDetails ? "auto" : "25px", overflow: "hidden" }}>
                <FieldGroup className={styles.detailsContainer}>
                    {partyName &&
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.party.name.label" })}
                            value={partyName}
                        />
                    }
                    {partyIdentifications.length > 0 && (
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.party.id.label" })}
                            value={
                                partyIdentifications.map((partyId, idx) => (
                                    <NameAndScheme
                                        name={XMLUtils.text(partyId, "./cbc:ID")}
                                        schemeId={XMLUtils.text(partyId, "./cbc:ID/@schemeID")}
                                        intl={intl}
                                        key={"partyId" + idx}
                                    />
                                ))}
                        />
                    )}
                    <FieldGroup.Field
                        label={intl.formatMessage({ id: "peppol.party.address.label" })}
                        value={postalAddressText(postalAddress)}
                    />
                    {taxSchemeInfo && taxSchemeInfo.map(taxScheme => taxSchemeText(taxScheme, intl))}
                    <FieldGroup.Field
                        label={intl.formatMessage({ id: "peppol.party.legalEntity.label" })}
                        value={legalEntityText(legalEntity, intl)}
                    />
                    {contact && (
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.party.contactDetails.label" })}
                            value={contactText(contact, intl)}
                        />
                    )}
                </FieldGroup>
            </div>
            <HideAndShow showDetails={showDetails} setShowDetailsFn={setShowDetails} />
        </Card>
    );
}

export default PartyCard;
