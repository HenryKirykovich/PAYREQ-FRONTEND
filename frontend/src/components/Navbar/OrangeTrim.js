import React from "react";

import { usePresentation } from "../../state";

export const OrangeTrim = () => {
    const { isMobileApp } = usePresentation();
    return (<div style={{
        backgroundColor: " #44EABE",
        height: "15px",
        width: "100%",
        marginTop: isMobileApp ? "0px" : "51px"
    }} />)
};
