import React from "react";
import {Route, Switch} from "react-router-dom";
import {useAppState} from "../state";
import PageNotFound from "../components/PageNotFound";
import Contacts from "../components/Contacts";
import ContactDetail from "../components/Contacts/ContactDetail";

const ContactsShell = ({match}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/:contactId`} exact
                   render={(props) => <ContactDetail {...props} billerId={biller.id}/>}
            />
            <Route path={`${match.url}`} exact>
                <Contacts billerId={biller.id}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default ContactsShell;
