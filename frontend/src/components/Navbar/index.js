import React, {useState} from "react";
import {Nav, Navbar, NavItem, Glyphicon} from 'react-bootstrap';
import {Link, useLocation, useHistory} from "react-router-dom";

import "./navbar.scss"

import {OrangeTrim} from "./OrangeTrim";
import PayreqNavItem from "./PayreqNavItem";
import {CustomerSwitch} from "./CustomerSwitch";
import SpannerMenu from "./SpannerMenu";
import {isPayer} from "../../utils/route-utils";
import {injectIntl} from "react-intl";

const PayreqLogo = ({biller, intl}) => {
    const {id: billerId} = biller;
    if(!billerId){
        return (
            <div className="navbar-brand pr-logo">
                <h1 className="text-hide">Payreq {intl.formatMessage({id: "dashboard.heading"})}</h1>
            </div>
        )
    }

    if (isPayer(biller)) {
        return (
            <Link to={`/customer/biller/${billerId}/dashboard`} className="navbar-brand pr-logo">
                <h1 className="text-hide">Payreq {intl.formatMessage({id: "dashboard.heading"})}</h1>
            </Link>
        )
    }

    return (
        <Link to={`/customer/biller/${billerId}/admin-dashboard`} className="navbar-brand pr-logo">
            <h1 className="text-hide">Payreq {intl.formatMessage({id: "dashboard.heading"})}</h1>
        </Link>
    )
}

const Navber = ({biller = {}, user, intl}) => {
    const {id: billerId, availableActions} = biller;
    const canSwitchBillers = user.totalLinkedBillers > 1;
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const isInConnectionsFlow = billerId && location.pathname.includes(`/biller/${billerId}/registrations`);
    const connectionsPath = `/portal/customer/biller/${billerId}/registrations/billers`;
    const closeNav = () => setIsExpanded(false);

    return (
        <React.Fragment>
            <Navbar inverse fixedTop role="navigation" aria-label="Main menu" expanded={isExpanded} onToggle={() => setIsExpanded(b => !b)}>
                <Navbar.Header>
                    <div id="nav-logo" className="logo-hide logo-show">
                        <PayreqLogo biller={biller} intl={intl}/>
                    </div>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    {isInConnectionsFlow ? (
                        <Nav>
                            <NavItem onClick={() => { closeNav(); history.goBack(); }}>
                                <Glyphicon glyph="chevron-left" style={{marginRight: "5px"}}/>
                                {intl.formatMessage({id: "subNavbar.back"})}
                            </NavItem>
                            <NavItem onClick={() => { closeNav(); history.push(connectionsPath); }}>
                                {intl.formatMessage({id: "subNavbar.connections"})}
                            </NavItem>
                        </Nav>
                    ) : (
                        <Nav>
                            {billerId && availableActions.map(action => <PayreqNavItem key={action.iconClass} action={action}
                                                                           billerId={billerId} onSelect={closeNav}/>)}
                        </Nav>
                    )}

                    <div>
                        <ul className="nav navbar-nav navbar-right">
                            {canSwitchBillers && billerId &&  <CustomerSwitch {...biller}/>}
                            <SpannerMenu biller={{...biller, id: billerId}} user={user}/>
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <OrangeTrim/>
        </React.Fragment>
    )
};

export default injectIntl(Navber);
