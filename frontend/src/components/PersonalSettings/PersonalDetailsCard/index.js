import React, {useState} from "react";
import {AccordionCard} from "../../common";
import UpdatePersonalDetailsModal from "./UpdatePersonalDetailsModal";
import PersonalDetails from "./PersonalDetails";

function PersonalDetailsCard({isOpen, handleSelect, personalDetails, reload}) {
    const [editDetailsModal, setEditDetailsModal] = useState(false);

    return (
        <AccordionCard title="personalSettings.personal.details"
                       key="personalDetails"
                       isOpen={isOpen}
                       handleSelect={handleSelect}>
            <UpdatePersonalDetailsModal show={editDetailsModal}
                                        onCancel={() => setEditDetailsModal(false)}
                                        personalDetails={personalDetails}
                                        reload={reload}
            />

            <PersonalDetails personalDetails={personalDetails}
                             editModal={() => setEditDetailsModal(true)}/>
        </AccordionCard>
    )
}

export default PersonalDetailsCard;