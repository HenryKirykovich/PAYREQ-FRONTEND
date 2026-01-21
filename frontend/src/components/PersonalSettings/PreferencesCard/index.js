import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {DefaultButton,} from "../../common";
import AccordionCard from "../../common/AccordionCard";
import UpdatePreferencesModal from "./UpdatePreferencesModal";
import Preferences from "./Preferences";

function PreferencesCard({handleSelect, isOpen, preferences, isBiller, reload}) {
    const [editPreferenceModal, setPreferenceModal] = useState(false)

    return (
        <AccordionCard title={"personalSettings.preferences"}
                       isOpen={isOpen}
                       handleSelect={handleSelect}>
            <UpdatePreferencesModal show={editPreferenceModal}
                                    onCancel={() => setPreferenceModal(false)}
                                    preferences={preferences}
                                    isBiller={isBiller}
                                    reload={reload}/>
            <Preferences preferences={preferences}
                         isBiller={isBiller}/>
            <DefaultButton label="personalSettings.preferences.edit"
                           onClick={() => setPreferenceModal(true)}/>
        </AccordionCard>
    )
}

export default injectIntl(PreferencesCard);