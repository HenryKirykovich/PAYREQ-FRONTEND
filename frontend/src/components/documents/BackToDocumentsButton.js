import {LinkButton} from "../common";
import {useAppState} from "../../state";
import React from "react";
import {withRouter} from "react-router-dom";

const BackToDocumentsButton = ({buttonComponent: ButtonComponent = LinkButton}) => {
    const [{biller}] = useAppState();
    return (
        <ButtonComponent linkTo={`/portal/customer/biller/${biller.id}/inbox`}
                         noIconDecoration={true}
                         label="invoice.payroll.view.back.button.label"
                         icon="menu-left"/>
    )
};

export default withRouter(BackToDocumentsButton);
