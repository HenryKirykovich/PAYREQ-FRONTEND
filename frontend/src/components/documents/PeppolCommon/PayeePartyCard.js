import React, { useState } from "react";

import * as XMLUtils from "../../../utils/xml-utils";
import { Card } from "../../common";
import FieldGroup from "../../common/FieldGroup";
import { HideAndShow, NameAndScheme } from "./peppol-common";

import styles from "./PeppolCommon.module.scss";

function PayeePartyCard({ bisDoc, intl }) {
    const [showDetails, setShowDetails] = useState(false);

    const payeeParty = XMLUtils.node(bisDoc, "./cac:PayeeParty");

    if (!payeeParty) {
        return null;
    }

    const partyName = XMLUtils.text(payeeParty, "./cac:PartyName/cbc:Name");
    const partyId = XMLUtils.text(payeeParty, "./cac:PartyIdentification/cbc:ID");
    const partyIdScheme = XMLUtils.text(payeeParty, "./cac:PartyIdentification/cbc:ID/@schemeID");
    const legalEntityId = XMLUtils.text(payeeParty, "./cac:PartyLegalEntity/cbc:CompanyID");
    const legalEntityIdScheme = XMLUtils.text(payeeParty, "./cac:PartyLegalEntity/cbc:CompanyID/@schemeID");

    const visibleHideAndShow = [partyName, partyId, legalEntityId].filter(Boolean).length > 1;

    return (
        <Card heading="peppol.invoice.view.documentDetails.payee.heading">
            <div style={{ height: showDetails ? "auto" : "25px", overflow: "hidden" }}>
                <FieldGroup className={styles.detailsContainer}>
                    <FieldGroup.Field
                        label={intl.formatMessage({ id: "peppol.party.name.label" })}
                        value={partyName} />
                    {legalEntityId &&
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.payee.legalEntity.label" })}
                            value={<NameAndScheme name={legalEntityId} schemeId={legalEntityIdScheme} intl={intl} />} />}
                    {partyId &&
                        <FieldGroup.Field
                            label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.payee.id.label" })}
                            value={<NameAndScheme name={partyId} schemeId={partyIdScheme} intl={intl} />} />}
                </FieldGroup>
            </div>
            {visibleHideAndShow && <HideAndShow showDetails={showDetails} setShowDetailsFn={setShowDetails} />}
        </Card>
    );
}

export default PayeePartyCard;
