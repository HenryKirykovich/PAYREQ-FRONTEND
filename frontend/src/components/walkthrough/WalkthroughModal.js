import axios from "axios";
import {useAppState} from "../../state";
import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {injectIntl} from "react-intl";
import {Icon, LargeText, PrimaryButton, RegularText} from "../common";
import inboxImg from "../../resources/images/walkthrough/inbox.png";
import connectionImg from "../../resources/images/walkthrough/subscriptions.png";

const getCurrentWalkthrough = (setWalkthrough, setShow, billerId) => {
    axios.get(`/data/walkthrough/biller/${billerId}`)
        .then(({data}) => {
            if (data.success && data.walkthrough) {
                setWalkthrough(data.walkthrough);
                setShow(true);
            }
        });
};

const onComplete = (setShow, walkthroughId) => {
    setShow(false);
    axios.put(`/data/walkthrough/${walkthroughId}`, {action: "complete"});
};

const BillerRenameWalkthrough = injectIntl(({intl, setShow, walkthroughId}) => {
    return (
        <React.Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: "walkthrough.modal.title.recentUpdates"})}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegularText text="walkthrough.modal.billerRename.intro"/>
                <LargeText style={{marginTop: "2rem"}} text="walkthrough.modal.billerRename.inbox.title"/>
                <RegularText text="walkthrough.modal.billerRename.inbox.description"/>
                <img src={inboxImg} alt="Inbox"/>
                <LargeText style={{marginTop: "2rem"}} text="walkthrough.modal.billerRename.connections.title"/>
                <RegularText text="walkthrough.modal.billerRename.connections.description"/>
                <img src={connectionImg} alt="Connection"/>
            </Modal.Body>
            <Modal.Footer>
                <PrimaryButton label={"walkthrough.modal.button.letsGo"}
                               onClick={() => onComplete(setShow, walkthroughId)}/>
            </Modal.Footer>
        </React.Fragment>
    )
});

const PreRebrandWalkthrough = injectIntl(({intl, setShow, walkthroughId}) => {
    return (
        <React.Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: "walkthrough.modal.preRebrand.title"})}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegularText text="walkthrough.modal.preRebrand.intro"/>
                <RegularText text="walkthrough.modal.preRebrand.intro2"/>
            </Modal.Body>
            <Modal.Footer>
                <PrimaryButton label={"walkthrough.modal.preRebrand.button"}
                               onClick={() => onComplete(setShow, walkthroughId)}/>
            </Modal.Footer>
        </React.Fragment>
    )
});

const PostRebrandWalkthrough = injectIntl(({intl, setShow, walkthroughId}) => {
    return (
        <React.Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: "walkthrough.modal.postRebrand.title"})}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegularText text="walkthrough.modal.postRebrand.intro"/>
            </Modal.Body>
            <Modal.Footer>
                <PrimaryButton label={"walkthrough.modal.postRebrand.button"}
                               onClick={() => onComplete(setShow, walkthroughId)}/>
            </Modal.Footer>
        </React.Fragment>
    )
});

const PaymentsUpdateWalkthrough = injectIntl(({intl, setShow, walkthroughId}) => {
    return (
        <React.Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({id: "walkthrough.modal.paymentsUpdate.title"})}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegularText text="walkthrough.modal.paymentsUpdate.text1"/>
                <RegularText text="walkthrough.modal.paymentsUpdate.text2"/>
                <a target="_blank" href={intl.formatMessage({id: "walkthrough.modal.paymentsUpdate.actionHref"})} rel="noopener noreferrer">
                    {intl.formatMessage({id: "walkthrough.modal.paymentsUpdate.action"})}
                    <Icon style={{marginLeft: "1rem"}} name="new-window"/>
                </a>
            </Modal.Body>
            <Modal.Footer>
                <PrimaryButton label={"forms.generic.ok"}
                               onClick={() => onComplete(setShow, walkthroughId)}/>
            </Modal.Footer>
        </React.Fragment>
    )
});

const WALKTHROUGH_COMPONENTS = {
    "biller-rename": BillerRenameWalkthrough,
    "pre-rebrand": PreRebrandWalkthrough,
    "post-rebrand": PostRebrandWalkthrough,
    "payments-update": PaymentsUpdateWalkthrough
}

const onDismiss = (setShow, walkthroughId) => {
    setShow(false);
    axios.put(`/data/walkthrough/${walkthroughId}`, {action: "dismiss"});
};

const WalkthroughModal = () => {
    const [{biller}] = useAppState();
    const [walkthrough, setWalkthrough] = useState();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (biller && biller.id) {
            getCurrentWalkthrough(setWalkthrough, setShow, biller.id);
        }
    }, [setWalkthrough, setShow, biller]);
    if (!walkthrough) return null;

    const WalthroughComponent = WALKTHROUGH_COMPONENTS[walkthrough.name];
    return (
        <Modal show={show}
               onHide={() => onDismiss(setShow, walkthrough.id)}
        >
            <WalthroughComponent setShow={setShow} walkthroughId={walkthrough.id}/>
        </Modal>
    )
};


export default WalkthroughModal;
