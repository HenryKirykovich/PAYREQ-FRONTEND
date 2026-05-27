import React, {useState} from "react";
import axios from "axios";
import {MenuItem, NavDropdown} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {isBiller} from "../../utils/route-utils";
import {injectIntl} from "react-intl";
import {ReferBusinessModal} from "../modals";

const logout = () => {
    axios.post("/auth/logout")
        .then(() => window.location = "/portal/customer/login")
};

//const isQboAccount = user => user.username && user.username.indexOf("@") !== -1;

const SpannerMenu = ({intl, biller, user}) => {
    const {customerName, extBillerId, id, meta, referralCode, referMasterBiller, masterBiller} = biller;
    const {email} = user;
    const history = useHistory();
    const [showReferModal, setShowReferModal] = useState(false);
    
    return (
        <>
        <NavDropdown title={<span className="glyphicon glyphicon-wrench"/>} id="nav-right-dropdown" aria-label="User Menu">
            <li role="presentation" className="dropdown-header">
                {intl.formatMessage({id: "spannerMenu.loggedInAs"})} <abbr title={email}>{email}</abbr>
            </li>
            <li role="presentation" className="dropdown-header visible-sm visible-md">
                <abbr title={extBillerId}>{customerName}</abbr>
            </li>
            {meta && meta.total > 1 &&
                <li role="presentation">
                    <button style={{background: "none", border: "none", padding: "3px 20px", cursor: "pointer"}} onClick={() => history.push("/portal/customer/profile/accounts")}>{intl.formatMessage({id: "spannerMenu.switchAccount"})}</button>
                </li>}
            {id && <MenuItem eventKey="1" onClick={() => history.push(`/customer/biller/${id}/personal/settings`)}>{intl.formatMessage({id: "spannerMenu.userSettings"})}</MenuItem>}
            {isBiller(biller) &&
            <MenuItem eventKey="2" onClick={() => history.push(`/customer/biller/${id}/personal/settings`)}>{intl.formatMessage({id: "spannerMenu.notificationSettings"})}</MenuItem>}
            {!isBiller(biller) &&
            <MenuItem eventKey="2" onClick={() => history.push(`/customer/biller/${id}/settings/biller`)}>{intl.formatMessage({id: "spannerMenu.accountSettings"})}</MenuItem>}
            <MenuItem eventKey="3" onClick={() => alert("Add MyBills Account functionality to be implemented")}>{intl.formatMessage({id: "spannerMenu.addMyBillsAccount"})}</MenuItem>
            {!isBiller(biller) &&
                <React.Fragment>
                    <hr style={{marginTop: "0px", marginBottom: "5px"}}/>
                    <MenuItem eventKey="4" onClick={() => history.push(`/customer/biller/${id}/auto-payments`)}>{intl.formatMessage({id: "spannerMenu.manageAutopayments"})}</MenuItem>
                    <MenuItem eventKey="5" onClick={() => history.push(`/customer/biller/${id}/cards`)}>{intl.formatMessage({id: "spannerMenu.manageCards"})}</MenuItem>
                    <hr style={{marginTop: "5px", marginBottom: "0px"}}/>
                </React.Fragment>}
            {!isBiller(biller) && referMasterBiller && referralCode &&
                <MenuItem eventKey="8" onClick={() => setShowReferModal(true)}>Refer a Business</MenuItem>}
            <MenuItem eventKey="6" href={intl.formatMessage({id: "spannerMenu.helpCentreURL"})}>{intl.formatMessage({id: "spannerMenu.accessHelpCentre"})}</MenuItem>
            <MenuItem eventKey="7" href="#" onClick={logout}>{intl.formatMessage({id: "spannerMenu.logout"})}</MenuItem>
        </NavDropdown>
        
        <ReferBusinessModal
            show={showReferModal}
            onClose={() => setShowReferModal(false)}
            referralCode={referralCode}
            masterBillerName={masterBiller && masterBiller.extBillerName}
        />
        </>
    )
}

export default injectIntl(SpannerMenu);
