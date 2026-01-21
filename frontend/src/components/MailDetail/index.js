import React from "react";
import {PageHeading} from "../common";

export default function MailDetail({match: {params: {billId}}}) {

    return <React.Fragment>
        <PageHeading text="mail.pageHeading"/>
    </React.Fragment>
};
