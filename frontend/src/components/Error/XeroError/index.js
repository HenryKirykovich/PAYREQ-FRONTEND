import React from "react";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import XeroErrorCard from "./XeroErrorCard";

const XeroError = ({code, history}) => {
    return <XeroErrorCard code={code}
                                 history={history}/>
}


export default injectIntl(withRouter(XeroError));
