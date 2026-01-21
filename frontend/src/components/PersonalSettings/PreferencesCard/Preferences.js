import React from 'react';
import FieldGroup from "../../common/FieldGroup";
import {injectIntl} from "react-intl";
import styles from "./Preferences.module.scss";
import {LANG_LABELS} from "./preferences-constants";

const getNotificationsLabel = (notificationPreferences, name) => {
    const pref = notificationPreferences.find(p => p.name === name);
    return pref.alertFreq === "immediate" ? "forms.generic.on" : "forms.generic.off";
};

const PayerPreferences = ({intl, preferences}) => {
    if (preferences.userAlertPrefs) { //this will only be populated if they are registered for a biller with a gateway
        return (
            <FieldGroup className={styles.detailsGroup} fields={[
                {
                    label: "personalSettings.preferences.language",
                    value: intl.formatMessage({
                        id: LANG_LABELS[preferences.language]
                    })
                },
                {
                    label: "personalSettings.preferences.paymentReminder",
                    value: intl.formatMessage({
                        id: getNotificationsLabel(preferences.userAlertPrefs, "mybills.paymentreminder")
                    })
                },
            ]}/>
        )
    } else {
        return (
            <FieldGroup fields={[
                {
                    label: "personalSettings.preferences.language",
                    value: intl.formatMessage({
                        id: LANG_LABELS[preferences.language]
                    })
                }
            ]}/>
        )
    }
};

const BillerPreferences = ({preferences, intl}) => (
    <FieldGroup className={styles.detailsGroup} fields={[
        {
            label: "personalSettings.preferences.showHelp",
            value: intl.formatMessage({
                id: preferences.showHelpMessages ? "forms.generic.on" : "forms.generic.off"
            })
        },
        {
            label: "personalSettings.preferences.language",
            value: intl.formatMessage({
                id: LANG_LABELS[preferences.language]
            })
        },

    ]}/>
);

const Preferences = ({intl, preferences, isBiller}) => (
    <React.Fragment>
        {isBiller ? <BillerPreferences preferences={preferences} intl={intl}/> :
            <PayerPreferences intl={intl} preferences={preferences}/>}
    </React.Fragment>
)

export default injectIntl(Preferences);
