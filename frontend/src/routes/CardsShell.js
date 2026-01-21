import React from "react";
import {Route, Switch} from "react-router-dom";

import {useAppState} from "../state";

import PageNotFound from "../components/PageNotFound";
import Cards from "../components/cards/Cards";
import AddCard from "../components/cards/AddCard";
import CardSaved from "../components/cards/CardSaved";
import Card from "../components/cards/Card";

const CardsShell = ({match, location}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/create`}>
                <AddCard billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/card-saved`}>
                <CardSaved billerId={biller.id} location={location}/>
            </Route>
            <Route path={`${match.url}/:id`}>
                <Card billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}`}>
                <Cards billerId={biller.id}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default CardsShell;