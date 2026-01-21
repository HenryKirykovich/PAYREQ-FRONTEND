import React from "react"
import LoginDetailsCard from "./LoginDetailsCard";
import {LOGIN_DETAILS_CARD, PERSONAL_DETAILS_CARD, PREFERENCES_CARD, SECURITY_DETAILS_CARD} from "./personal-details-constants";
import PersonalDetailsCard from "./PersonalDetailsCard";
import SecurityDetailsCard from "./SecurityDetailsCard";
import PreferencesCard from "./PreferencesCard";
import {useAppState} from "../../state";
import {isBiller} from "../../utils/route-utils";
import {PageHeading} from "../common";

const PersonalSettingsView = ({initialUserDetails, reload, setSelectedSection, selectedSection}) => {
    const [{biller}] = useAppState()
    const {ssoSamlRequired} = initialUserDetails
    return (
        <React.Fragment>
            <PageHeading text="personalSettings.pageHeading"/>
            <LoginDetailsCard isOpen={selectedSection === LOGIN_DETAILS_CARD}
                              handleSelect={() => setSelectedSection(LOGIN_DETAILS_CARD)}
                              emailDetails={initialUserDetails}/>

            <PersonalDetailsCard isOpen={selectedSection === PERSONAL_DETAILS_CARD}
                                 handleSelect={() => setSelectedSection(PERSONAL_DETAILS_CARD)}
                                 personalDetails={initialUserDetails}
                                 reload={reload}/>

            {!ssoSamlRequired &&
                <SecurityDetailsCard isOpen={selectedSection === SECURITY_DETAILS_CARD}
                                     handleSelect={() => setSelectedSection(SECURITY_DETAILS_CARD)}
                                     preferences={initialUserDetails}/>}

            <PreferencesCard isOpen={selectedSection === PREFERENCES_CARD}
                             handleSelect={() => setSelectedSection(PREFERENCES_CARD)}
                             isBiller={isBiller(biller)}
                             preferences={initialUserDetails}
                             reload={reload}/>
        </React.Fragment>
    );
}

export default PersonalSettingsView;
