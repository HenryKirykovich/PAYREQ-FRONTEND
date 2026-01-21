import axios from "axios";
import {SET_ALERT} from "../../state/reducers/alertReducer";
import {withRouter} from "react-router-dom";
import {useAppState} from "../../state";
import {DangerButton, Modal, RegularText} from "../common";
import React from "react";

const deleteCard = (billerId, id, history, dispatch) => {
    axios.delete(`/data/cards/${billerId}/${id}`)
        .then(({data}) => {
            if (data.success) {
                dispatch({type: SET_ALERT, alert: {level: "success", text: "cards.removeCard.success"}});
                history.push("../cards");
            }
        });
};

const DeleteCardModal =
    ({billerId, show, onCancel, card, history}) => {
        const [, dispatch] = useAppState();
        return (
            <Modal data-testid="delete-card-modal"
                   show={show}
                   title="cards.removeCard.heading"
                   buttonLabel="forms.generic.remove.button"
                   onCancel={onCancel}
                   onPrimaryAction={() => deleteCard(billerId, card.id, history, dispatch)}
                   PrimaryButtonComponent={DangerButton}
            >
                <RegularText text="cards.removeCard.warning"/>
                <RegularText text="cards.removeCard.areYouSure"/>
            </Modal>
        )
    };

export default withRouter(DeleteCardModal);