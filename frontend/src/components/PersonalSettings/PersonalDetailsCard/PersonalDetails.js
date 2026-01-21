import React from "react";
import FieldGroup from "../../common/FieldGroup";
import styles from "./PersonalDetails.module.scss";
import {DefaultButton} from "../../common";
import {injectIntl} from "react-intl";

function PersonalDetails({personalDetails, editModal, intl}){
    return (
        <React.Fragment>
            <FieldGroup className={styles.detailsGroup} fields={[
                {label: "personalSettings.personal.details.address1", value: personalDetails.contactDetails.address1},
                {label: "personalSettings.personal.details.address2", value: personalDetails.contactDetails.address2},
                {label: "personalSettings.personal.details.city", value: personalDetails.contactDetails.city},
                {label: "personalSettings.personal.details.state", value: personalDetails.contactDetails.state},
                {label: "personalSettings.personal.details.postCode", value: personalDetails.contactDetails.postalCode},
                {label: "personalSettings.personal.details.country", value: intl.formatMessage({id: `country.${personalDetails.countryCode.toUpperCase()}`})}
            ]}
            />
            <DefaultButton label="personalSettings.personal.details.edit"
                           onClick={editModal}/>
        </React.Fragment>
    )
}

export default injectIntl(PersonalDetails);