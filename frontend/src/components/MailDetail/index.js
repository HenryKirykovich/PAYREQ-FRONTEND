import React from "react";
import BillDetail from "../Bills/BillDetail";

// Mail detail is the same as Bill detail
export default function MailDetail(props) {
    return <BillDetail {...props} />;
};
