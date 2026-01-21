import React from "react";
import {LinkButton} from "../../common";
import {injectIntl} from "react-intl";
import AccordionCard from "../../common/AccordionCard";
import FieldGroup from "../../common/FieldGroup";
import styles from "./SecurityDetailsCard.module.scss"

const MfaSelection = injectIntl(({mfa, intl}) => (
    <span className={styles.mfaSelectionContainer}>{intl.formatMessage({
        id: mfa.active ? `personalSettings.security.mfa.${mfa.type}` : "forms.generic.off"
    })}<LinkButton icon="edit" label={mfa.active ? "generic.update" : "generic.enable"} linkTo={{pathname: "./mfa/update"}}/></span>
));


const SecurityDetailsCard = ({isOpen, handleSelect, preferences}) => (
    <AccordionCard title="personalSettings.security"
                   isOpen={isOpen}
                   handleSelect={handleSelect}>
        <FieldGroup className={styles.detailsGroup} fields={[
            {
                label: "personalSettings.security.mfa",
                value: <MfaSelection mfa={preferences.mfa}/>
            },
            {
                label: "personalSettings.password",
                value: <LinkButton icon="edit" label="personalSettings.password.update"
                                   linkTo={{pathname: "./change-password"}}/>
            },
        ]}/>
    </AccordionCard>
)

export default SecurityDetailsCard;