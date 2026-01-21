import React from "react";

import * as XMLUtils from "../../../utils/xml-utils";

import styles from "./PeppolCommon.module.scss";
import { LinkButton } from "../../common";
import FieldGroup from "../../common/FieldGroup";


export function HideAndShow({ showDetails, setShowDetailsFn }) {
    if (showDetails) {
        return (
            <div className={styles.showMoreButton}>
                <LinkButton label="peppol.invoice.view.documentDetails.seeLess"
                    onClick={() => setShowDetailsFn(false)}
                    icon="chevron-up"
                    className={styles.removeButtonMargin} />
            </div>
        );
    }

    return (
        <div className={styles.showMoreButton}>
            <LinkButton label="peppol.invoice.view.documentDetails.seeMore"
                onClick={() => setShowDetailsFn(true)}
                icon="chevron-down"
                className={styles.removeButtonMargin} />
        </div>
    );
};

export function taxSchemeText(taxSchemeInfo, intl) {
    const taxCompanyId = XMLUtils.text(taxSchemeInfo, "./cbc:CompanyID");
    const taxScheme = XMLUtils.text(taxSchemeInfo, "./cac:TaxScheme/cbc:ID");

    return (
        <React.Fragment>
            {taxCompanyId &&
                <FieldGroup.Field
                    label={intl.formatMessage({ id: "peppol.party.taxCompanyId.label" })}
                    value={taxCompanyId}
                />
            }
            {taxScheme &&
                <FieldGroup.Field
                    label={intl.formatMessage({ id: "peppol.party.taxScheme.label" })}
                    value={taxScheme}
                />
            }
        </React.Fragment>
    );
}

export function contactText(contact, intl) {
    const name = XMLUtils.text(contact, "./cbc:Name");
    const phone = XMLUtils.text(contact, "./cbc:Telephone");
    const email = XMLUtils.text(contact, "./cbc:ElectronicMail");

    return (
        <React.Fragment>
            {name && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.party.name.label" }),
                    val: name
                })}</p>}
            {phone && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.party.phone.label" }),
                    val: phone
                })}</p>}
            {email && <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.party.email.label" }),
                    val: email
                })}</p>}
        </React.Fragment>
    );
}

export function legalEntityText(legalEntity, intl) {
    const name = XMLUtils.text(legalEntity, "./cbc:RegistrationName");
    const companyId = XMLUtils.text(legalEntity, "./cbc:CompanyID");
    const companyIdCode = XMLUtils.text(legalEntity, "./cbc:CompanyID/@schemeID");
    const companyLegalForm = XMLUtils.text(legalEntity, "./cbc:CompanyLegalForm");

    return (
        <React.Fragment>
            {name && <p>{name}</p>}
            <NameAndScheme name={companyId} schemeId={companyIdCode} intl={intl} />
            {companyLegalForm && <p>{companyLegalForm}</p>}
        </React.Fragment>
    );
}

export function postalAddressText(postalAddress) {
    const streetName = XMLUtils.text(postalAddress, "./cbc:StreetName");
    const streetName2 = XMLUtils.text(postalAddress, "./cbc:AdditionalStreetName");
    const streetName3 = XMLUtils.text(postalAddress, "./cac:AddressLine/cbc:Line");
    const cityName = XMLUtils.text(postalAddress, "./cbc:CityName");
    const postalZone = XMLUtils.text(postalAddress, "./cbc:PostalZone");
    const countrySubentity = XMLUtils.text(postalAddress, "./cbc:CountrySubentity");
    const country = XMLUtils.text(postalAddress, "./cac:Country/cbc:IdentificationCode");

    return (
        <React.Fragment>
            {(streetName && !streetName3) && <p> {streetName}</p>}
            {(streetName && streetName3) && <p>{streetName3}, {streetName}</p>}
            {streetName2 && <p>{streetName2}</p>}
            {(cityName || postalZone || countrySubentity || country) && <p>{cityName} {postalZone} {countrySubentity} {country}</p>}
        </React.Fragment>
    );
};

export function NameAndScheme({ name, schemeId, intl }) {
    if (!name) {
        return null;
    }

    if (name && schemeId) {
        return (
            <p>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.contact.details" },
                {
                    label: intl.formatMessage({ id: "peppol.invoice.view.documentDetails.isoSchemeId." + schemeId }),
                    val: name
                })}</p>
        );
    }

    return (<p>{name}</p>);
}

function taxSubTotalText(taxSub, idx, intl) {
    const taxableAmount = XMLUtils.number(taxSub, "./cbc:TaxableAmount");
    const taxableAmountCcy = XMLUtils.text(taxSub, "./cbc:TaxableAmount/@currencyID");
    const taxAmount = XMLUtils.number(taxSub, "./cbc:TaxAmount");
    const taxAmountCcy = XMLUtils.text(taxSub, "./cbc:TaxAmount/@currencyID");
    const categoryId = XMLUtils.text(taxSub, "./cac:TaxCategory/cbc:ID");

    if (categoryId === "E") {
        return (
            <p key={idx}>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.taxDetailsExempt.text" },
                { amount: intl.formatNumber(taxableAmount, { style: "currency", currency: taxableAmountCcy }) })}</p>
        );
    }

    return (
        <p key={idx}>{intl.formatMessage({ id: "peppol.invoice.view.documentDetails.taxDetails.text" },
            {
                taxAmount: intl.formatNumber(taxAmount, { style: "currency", currency: taxAmountCcy }),
                amount: intl.formatNumber(taxableAmount, { style: "currency", currency: taxableAmountCcy }),
                percent: XMLUtils.text(taxSub, "./cac:TaxCategory/cbc:Percent"),
                taxScheme: XMLUtils.text(taxSub, "./cac:TaxCategory/cac:TaxScheme/cbc:ID")
            })}
        </p>
    );
};

function taxDetailText(taxTotal, intl) {
    const taxSubTotal = XMLUtils.nodes(taxTotal, "./cac:TaxSubtotal");
    const taxAmount = XMLUtils.number(taxSubTotal[0], "./cbc:TaxAmount");
    const currencyCode = XMLUtils.text(taxSubTotal[0], "./cbc:TaxAmount/@currencyID");

    return (
        <React.Fragment>
            {taxSubTotal.length !== 1 && <p>{intl.formatNumber(taxAmount, { style: "currency", currency: currencyCode })}</p>}
            {taxSubTotal.map((taxSub, idx) => taxSubTotalText(taxSub, idx, intl))}
        </React.Fragment>);
};

export function TaxDetails({ taxTotalRec, intl }) {
    const taxSubTotal = XMLUtils.node(taxTotalRec, "./cac:TaxSubtotal");
    if (!taxSubTotal) {
        return null;
    }
    return (
        <React.Fragment>
            <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.taxDetails.label" })}
                value={taxDetailText(taxTotalRec, intl)} />
        </React.Fragment>
    );
}
