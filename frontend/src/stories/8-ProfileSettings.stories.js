import React, {useState} from 'react';
import PersonalSettingsView from "../components/PersonalSettings/PersonalSettingsView";
import {
    LOGIN_DETAILS_CARD,
    PERSONAL_DETAILS_CARD,
    PREFERENCES_CARD,
    SECURITY_DETAILS_CARD
} from "../components/PersonalSettings/personal-details-constants";
import LoginDetailsCard from "../components/PersonalSettings/LoginDetailsCard";
import PreferencesCard from "../components/PersonalSettings/PreferencesCard";
import SecurityDetailsView from "../components/PersonalSettings/SecurityDetailsCard";
import EmailReSentConfirmationModal from "../components/PersonalSettings/LoginDetailsCard/EmailReSentConfirmationModal";
import PersonalDetailsCard from "../components/PersonalSettings/PersonalDetailsCard";


export default {
    title: 'Profile Settings',
};

const apiResponse = {
    "email": "emile.raffoul@payreq.com",
    "defaultSearchDateRange": "",
    "uid": "emile.raffoul@payreq.com",
    "name": "Emile Raffoul 111",
    "mybillsAccountsOnly": false,
    "userAlertPrefs": [{
        "name": "mybills.paymentreminder",
        "description": "Bill Payment Reminder",
        "alertType": "email",
        "alertFreq": "immediate"
    }],
    "contactDetails": {
        "address1": "22 Imaginary Street",
        "address2": "Corner Make Believe Place",
        city: "Sydney",
        state: "NSW",
        postalCode: "2000"
    },
    "pendingNewEmail": null,
    "language": "en",
    "showHelpMessages": true,
    "defaultBillStatus": "sendPending,error,undelivered,readyForDispatch,sent,pendingRegistration,undeliveredActioned,archived",
    "countryCode": "AU"
}

export const personalSettingsView = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedSection, setSelectedSection] = useState(LOGIN_DETAILS_CARD);
    return <PersonalSettingsView initialUserDetails={apiResponse}
                                 selectedSection={selectedSection}
                                 setSelectedSection={setSelectedSection}
                                 setIsSubmitting={() => {
                                 }}/>
};


const apiEmailUpdated = {
    "email": "annatnguyen84@gmail.com",
    "pendingNewEmail": null,
}
const apiEmailUpdatedPending = {
    "email": "annatnguyen84@gmail.com",
    "pendingNewEmail": "annatnguyen84+123@gmail.com",
}

export const loginDetailsCard = () =>
    <LoginDetailsCard isOpen={LOGIN_DETAILS_CARD}
                      handleSelect={() => {
                      }}
                      emailDetails={apiEmailUpdated}
                      setIsSubmitting={() => {
                      }}/>;

export const emailDetailsViewPendingVerification = () => <LoginDetailsCard isOpen={LOGIN_DETAILS_CARD}
                                                                           handleSelect={() => {
                                                                           }}
                                                                           emailDetails={apiEmailUpdatedPending}
                                                                           setIsSubmitting={() => {
                                                                           }}/>;

export const emailReSentConfirmationModal = () => <EmailReSentConfirmationModal show={true}
                                                                                onCancel={() => {}}
                                                                                userDetails={apiEmailUpdatedPending}/>;

const apiDetails = {
    "name": "Anna  Nguyen",
    "contactDetails": {
        "address1": "76 Woolcott Street",
        "address2": "",
        "city": "Earlwood",
        "state": "NSW",
        "postalCode": "2206"
    },
    "countryCode": "AU"
}

export const personalDetailsView = () => <PersonalDetailsCard isOpen={PERSONAL_DETAILS_CARD}
                                                              handleSelect={() => {
                                                              }}
                                                              personalDetails={apiDetails}
                                                              setIsSubmitting={() => {
                                                              }}/>

export const securityDetailsView = () => <SecurityDetailsView isOpen={SECURITY_DETAILS_CARD}
                                                              handleSelect={() => {}}
                                                              />

// export const changePasswordModal = () => <UpdatePasswordModal show={true} onCancel={() => {}}/>
// export const changePasswordForm = () => <ChangePasswordForm/>


const apiUserPreference = {
    "email": "anna.nguyen@payreq.com",
    "defaultSearchDateRange": "",
    "mybillsAccountsOnly": false,
    "userAlertPrefs": [{
        "name": "mybills.paymentreminder",
        "description": "Bill Payment Reminder",
        "alertType": "email",
        "alertFreq": "never"
    }],
    "language": "en",
    "showHelpMessages": true,
    "defaultBillStatus": "pendingRegistration,sendPending,error,undelivered,readyForDispatch,sent",
}

export const preferencesViewBiller = () => <PreferencesCard isOpen={PREFERENCES_CARD}
                                                            handleSelect={() => {
                                                            }}
                                                            preference={apiUserPreference}
                                                            isBiller={true}/>

export const preferencesViewPayer = () => <PreferencesCard isOpen={PREFERENCES_CARD}
                                                           handleSelect={() => {
                                                           }}
                                                           preference={apiUserPreference}
                                                           isBiller={false}/>



