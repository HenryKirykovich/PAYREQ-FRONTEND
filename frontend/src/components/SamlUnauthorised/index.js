import React from "react";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import SamlUnauthorisedCard from "./SamlUnauthorisedCard";

const SamlUnauthorised = ({code, history}) => {
    return <SamlUnauthorisedCard code={code}
                                 history={history}/>
}


export default injectIntl(withRouter(SamlUnauthorised));
