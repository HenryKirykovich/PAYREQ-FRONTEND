import React from "react";
import {withRouter} from 'react-router-dom'
import {FieldGroup, SecondaryButton} from "../../common";
import styles from "./ContactDetails.module.scss";


const ContactDetails = ({contactDetails, history}) => (
    <React.Fragment>
        <FieldGroup fields={[
            {label: "settings.contactDetails.name", value: contactDetails.name},
            {label: "settings.contactDetails.email", value: contactDetails.email},
            {label: "settings.contactDetails.phone", value: contactDetails.phone},
        ]}/>
        <div className={styles.editButtonContainer}>
            <SecondaryButton label="forms.generic.edit.button"
                             onClick={() => history.push("./edit")}/>
        </div>
    </React.Fragment>
);

export default withRouter(ContactDetails);