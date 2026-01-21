import React, {Suspense} from "react";
import {withRouter} from 'react-router-dom'
import "swagger-ui-react/swagger-ui.css";

import openapiYmal from "../../../resources/ymal/payreq-delivery-api.yaml"
import openapiYmalInbox from "../../../resources/ymal/payreq-inbox-api.yaml"
import {useAppState} from "../../../state";
import {isPayer} from "../../../utils/route-utils";
import Loading from "../../Loading";

const SwaggerUI = React.lazy(() => import("swagger-ui-react"));

const ApiDetails = ({billerId}) => {
    const [{biller}] = useAppState();

    return (
        <React.Fragment>
            <Suspense fallback={<Loading/>}>
                <SwaggerUI url={isPayer(biller) ? openapiYmalInbox : openapiYmal} />
            </Suspense>
        </React.Fragment>
    )
};

export default withRouter(ApiDetails);