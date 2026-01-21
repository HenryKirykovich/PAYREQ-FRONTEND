import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Pay from "../components/Pay/Pay";
import { OrangeTrim } from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import BannerAlert from "../components/BannerAlert";

const PayShell = ({match, ...rest}) => {
    return (
        <React.Fragment>
            <BlueTrim/>
            <OrangeTrim/>
            <div className="container">
                <BannerAlert />
                <Switch>
                    <Route path={`${match.path}/:payKey`}
                           render={(props) => <Pay payKey={props.match.params.payKey}/>}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default PayShell;
