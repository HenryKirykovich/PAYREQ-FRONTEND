import React, {createContext, useContext, useReducer} from 'react';
import userReducer from "./reducers/userReducer";
import billerReducer from "./reducers/billerReducer";
import registrationsReducer from "./reducers/registrationsReducer";
import inboxReducer from "./reducers/inboxReducer";
import errorReducer from "./reducers/errorReducer";
import alertReducer from "./reducers/alertReducer";
import configReducer from "./reducers/configReducer";
import paymentHistoryReducer from "./reducers/paymentHistoryReducer";
import mailReducer from "./reducers/mailReducer";

const mainReducer = ({user, biller, registrations, paymentHistory, error, inbox, mail, config}, action) => {
    // middleware goes here, i.e calling analytics service, etc.
    return {
        user: userReducer(user, action),
        biller: billerReducer(biller, action),
        registrations: registrationsReducer(registrations, action),
        paymentHistory: paymentHistoryReducer(paymentHistory, action),
        inbox: inboxReducer(inbox, action),
        mail: mailReducer(mail, action),
        error: errorReducer(error, action),
        alert: alertReducer(error, action),
        config: configReducer(config, action)
    };
};

export const StateContext = createContext();

export const StateProvider = ({children, initialState}) => (
    <StateContext.Provider value={useReducer(mainReducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useAppState = () => useContext(StateContext);

export function usePresentation() {
    const [{config}] = useAppState();
    return {
        isMobileApp: config && config.webView,
    };
}
