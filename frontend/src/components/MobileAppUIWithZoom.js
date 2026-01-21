import {Helmet} from "react-helmet";
import React from "react";
import MobileAppUI from "./MobileAppUI";

export default function MobileAppUIWithZoom({ children }) {
    return (
        <MobileAppUI>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            {children}
        </MobileAppUI>
    )
}
