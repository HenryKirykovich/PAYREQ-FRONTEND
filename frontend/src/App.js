import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {IntlProvider} from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill"; //required for IE and Edge
// import "@formatjs/intl-getcanonicallocales/polyfill" ;supposedly required for IE but doesn't work
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/fr";
import { pdfjs } from "react-pdf";

import messages_en from "./lang/en.json";
import messages_en_countries from "./lang/en-countries.json";
import messages_fr from "./lang/fr.json";
import messages_fr_countries from "./lang/fr-countries.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "./resources/css/legacy.css";
import "./resources/css/bootstrap-overrides.css";
import "./resources/css/swagger-ui-overrides.css";

import {StateProvider, useAppState} from "./state";

import {getParentLang, getLang, defaultEnglish} from "./utils/language-utils";
import Footer from "./components/Footer";
import {LargeText, RegularText} from "./components/common";
import BrowserUI from "./components/BrowserUI";
import MobileAppUI from "./components/MobileAppUI";
import AppRouter from "./AppRouter";

pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

const initialState = {
    user: null,
    biller: null,
    error: null,
    registrations: {searchParams: {}},
    paymentHistory: {searchParams: {}},
    inbox: {searchParams: {}},
    mail: {searchParams: {}},
    config: null
};

const messages = {
    "en": {...messages_en, ...messages_en_countries},
    "fr": {...messages_fr, ...messages_fr_countries}
};

const lang = getLang();

const setRootHTMLLang = () => {
    //this is done for screen readers
    const parentLang = getParentLang(lang);
    document.documentElement.lang = messages[parentLang] ? parentLang : "en"
};

const GenericAPIErrorModal = () => {
    const [{error}] = useAppState();
    return (
        <Modal show={error ? true : false}>
            <Modal.Body>
                <LargeText text="generic.apiErrorMessage"/>
                {error && error.id && <RegularText>Error ID: {error.id}</RegularText>}
            </Modal.Body>
            <Modal.Footer>
                {/* eslint-disable-next-line no-restricted-globals */}
                <Button onClick={() => location.reload()}>Refresh</Button>
            </Modal.Footer>
        </Modal>
    );
};

const MetaTags = () => {
    return (
        <React.Fragment>
            <BrowserUI>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Helmet>
            </BrowserUI>
            <MobileAppUI>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
                </Helmet>
            </MobileAppUI>
        </React.Fragment>
    );
}

const App = () => {
    setRootHTMLLang();
    return (
        <IntlProvider locale={defaultEnglish(lang)}
                      messages={messages[lang] || messages[getParentLang(lang)] || messages["en"]}>
            <StateProvider initialState={initialState}>
                <AppRouter/>
                <Footer/>
                <GenericAPIErrorModal/>
                <MetaTags/>
            </StateProvider>
        </IntlProvider>
    )
};

export default App;
