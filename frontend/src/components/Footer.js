import React from "react";
import {useAppState} from "../state";
import {isPayer} from "../utils/route-utils";
import BrowserUI from "./BrowserUI";
import {LinkButton} from "./common";
import {injectIntl} from "react-intl";

const AcceptableUse = ({intl}) => <a href={intl.formatMessage({id: 'footer.termsURL'})} rel="noopener noreferrer" className="text-muted" target="_blank">{intl.formatMessage({id: 'footer.terms'})}</a>;
const Privacy = ({intl}) => <a href={intl.formatMessage({id: 'footer.privacyURL'})} rel="noopener noreferrer" className="text-muted" target="_blank">{intl.formatMessage({id: 'footer.privacy'})}</a>;
const UserAggreement = ({intl}) => <a href={intl.formatMessage({id: 'footer.agreementURL'})} rel="noopener noreferrer" className="text-muted" target="_blank">{intl.formatMessage({id: 'footer.agreement'})}</a>;
const PayerHelp = ({intl}) => <a href={intl.formatMessage({id: 'footer.helpURL'})} rel="noopener noreferrer" target="_blank" className="text-muted">{intl.formatMessage({id: 'footer.help'})}</a>;

const onLanguageSelect = (language) => {
    if (language) {
        localStorage.setItem("language", language);
        window.location.reload()
    }
}

const LanguageSwitcher = () => (
    <div className="row" style={{marginBottom: "1rem", marginRight: "0px", marginLeft: "0px"}}>
        <div className="col-sm-12 text-center" style={{display: "flex", justifyContent: "center"}}>
            <LinkButton style={{marginRight: "1rem"}} onClick={() => onLanguageSelect("en")}>English</LinkButton>
            <LinkButton onClick={() => onLanguageSelect("fr")}>Français</LinkButton>
        </div>
    </div>

)

const Footer = ({intl}) => {
    const [{biller, user, config}] = useAppState();
    const showHelp = biller ? isPayer(biller) : false;
    if (!config) return null;
    return (
        <BrowserUI>
            <footer className="pr-footer" role="contentinfo">
                {!user && <LanguageSwitcher />}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "1em", textAlign: "center" }}>
                    <div><AcceptableUse intl={intl}/> | <Privacy intl={intl}/> | <UserAggreement intl={intl}/> {showHelp && "|"} {showHelp && <PayerHelp intl={intl}/>}</div>
                    <p className="text-muted">© {new Date().getFullYear()}, Payreq Pty Ltd.</p>
                </div>
            </footer>
        </BrowserUI>
    )
};

export default injectIntl(Footer);
