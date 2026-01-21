import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";

import FastForm from "../components/FastForm/FastForm";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import FastFormVerify from "../components/FastForm/FastFormVerify";
import FastFormConfirmation from "../components/FastForm/FastFormConfirmation";
import BannerAlert from "../components/BannerAlert";

const FastFormShell = ({match, location}) => {
    return (
        <React.Fragment>
            <BlueTrim/>
            <OrangeTrim/>
            <div className="container">
                <BannerAlert />
                <Switch>
                    <Route path={`${match.url}/:billerId/create`}
                           render={(props) => <FastForm billerId={props.match.params.billerId} location={location}/>}/>
                    <Route path={`${match.url}/:billerId/verify/:code`}
                           render={(props) => <FastFormVerify billerId={props.match.params.billerId} code={props.match.params.code}/>}/>
                    <Route path={`${match.url}/:billerId/confirmation/:code/:hasMyBills`}
                           render={(props) => <FastFormConfirmation billerId={props.match.params.billerId} hasMyBills={props.match.params.hasMyBills}
                                                                    code={props.match.params.code}/>}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default FastFormShell;
