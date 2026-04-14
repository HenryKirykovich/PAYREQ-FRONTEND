import React from "react";
import {render} from "@testing-library/react";
import {IntlProvider} from "react-intl";
import {MemoryRouter} from "react-router-dom";
import messages from "../../../lang/en.json";
import ConsentsSettings from "./ConsentsSettings";

const renderConsents = (billerId = "biller-1") =>
    render(
        <MemoryRouter>
            <IntlProvider locale="en" messages={messages}>
                <ConsentsSettings billerId={billerId}/>
            </IntlProvider>
        </MemoryRouter>
    );

it("renders without crashing", () => {
    renderConsents();
});
