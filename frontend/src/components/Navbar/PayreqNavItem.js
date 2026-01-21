import React from "react";
import {withRouter} from "react-router-dom";
import {Glyphicon, MenuItem, NavDropdown, NavItem} from "react-bootstrap";
import {injectIntl} from "react-intl";
import {isMyPayer} from "../../utils/route-utils";
import {useAppState} from "../../state";

const isRootLevel = action => action.link;

const buildBillerHref = (emberLink, billerId) => {
    const path = emberLink.replace("biller.", "").replace(/\./g, "/");
    return `/customer#/biller/${billerId}/${path}`
};

const buildHref = (link, billerId, isReactLink) => {
    if (!link) return "/customer#/";
    if (link.includes("biller.")) {
        return buildBillerHref(link, billerId);
    }
    if (isReactLink) {
        return link;
    }
    return `/customer#/${link}`;
};

const DropdownNav = ({intl, billerId, action, history}) => {
    const {iconClass, label} = action;
    return (
        <NavDropdown title={<React.Fragment><Glyphicon glyph={iconClass}/>{intl.formatMessage({id: "navbar." + label})}</React.Fragment>}
                     id="nav-dropdown">
            {action.subMenus.map(subMenu => {
                    const href = buildHref(subMenu.link, billerId, subMenu.isReactLink);
                    if (subMenu.isReactLink) {
                        return (
                            <MenuItem key={subMenu.link} onClick={() => history.push(href)}>
                                <Glyphicon glyph={subMenu.iconClass}/>
                                {intl.formatMessage({id: "navbar." + subMenu.label})}
                            </MenuItem>
                        )
                    }
                    return (
                        <MenuItem key={subMenu.link} href={href}>
                            <Glyphicon glyph={subMenu.iconClass}/>
                            {intl.formatMessage({id: "navbar." + subMenu.label})}
                        </MenuItem>);

                }
            )}
        </NavDropdown>
    );
};

const PayreqNavItem = ({intl, action, billerId, history, onSelect}) => {
    const {iconClass, label, link: emberLink, isReactLink} = action;
    const href = buildHref(emberLink, billerId, isReactLink);
    const [{biller}] = useAppState();
    const navText = label === "registrations" && isMyPayer(biller) ? intl.formatMessage({id: "navbar.subscriptions"}) : intl.formatMessage({id: "navbar." + label});
    const navIconComponent = <Glyphicon aria-hidden="true" glyph={iconClass}/>;
    if (isRootLevel(action)) {
        if (isReactLink) {
            return <NavItem onSelect={onSelect} onClick={() => history.push(href)}>{navIconComponent}{navText}</NavItem>
        }
        return <NavItem href={href} onClick={() => window.location.href = href}>{navIconComponent}{navText}</NavItem>;
    }
    return <DropdownNav action={action} billerId={billerId} intl={intl} history={history}/>;
};

export default injectIntl(withRouter(PayreqNavItem));