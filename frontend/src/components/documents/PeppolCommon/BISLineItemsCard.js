import React, { useState } from "react";

import { FormattedNumber } from "react-intl";

import * as XMLUtils from "../../../utils/xml-utils";
import { Card, Table } from "../../common";
import { HideAndShow } from "./peppol-common";

import styles from "./PeppolCommon.module.scss";

function getSum(total, num) {
    return total + parseFloat(XMLUtils.text(num, "./cbc:LineExtensionAmount"));
}

function BISLineItemsCard({ lines }) {
    const [showDetails, setShowDetails] = useState(true);
    return (
        <Card heading="peppol.invoice.view.documentDetails.invoiceLines.heading">
            <div style={{ height: showDetails ? "auto" : "40px", overflow: "hidden" }}>
                <div className={styles.detailsContainer}>
                    <Table headerLabels={[
                        "peppol.invoice.view.documentDetails.invoiceLines.col1.heading",
                        "peppol.invoice.view.documentDetails.invoiceLines.col2.heading",
                        "peppol.invoice.view.documentDetails.invoiceLines.col3.heading",
                        "peppol.invoice.view.documentDetails.invoiceLines.col4.heading"
                    ]}
                        rows={lines.map(
                            (line) => {
                                const qty = XMLUtils.text(line, "./cbc:InvoicedQuantity");
                                const amount = XMLUtils.number(line, "./cbc:LineExtensionAmount");
                                const ccy = XMLUtils.text(line, "./cbc:LineExtensionAmount/@currencyID");
                                const price = XMLUtils.number(line, "./cac:Price/cbc:PriceAmount");
                                const priceCcy = XMLUtils.text(line, "./cac:Price/cbc:PriceAmount/@currencyID");
                                const itemName = XMLUtils.text(line, "./cac:Item/cbc:Name");
                                return [
                                    itemName,
                                    qty,
                                    <FormattedNumber
                                        value={price}
                                        // eslint-disable-next-line
                                        style="currency"
                                        currency={priceCcy}
                                    />,
                                    <FormattedNumber
                                        value={amount}
                                        // eslint-disable-next-line
                                        style="currency"
                                        currency={ccy}
                                    />
                                ]
                            }
                        )}
                        footer={[
                            "",
                            "",
                            "Total",
                            <FormattedNumber
                                value={lines.reduce(getSum, 0)}
                                // eslint-disable-next-line
                                style="currency"
                                currency={XMLUtils.text(lines[0], "./cbc:LineExtensionAmount/@currencyID")}
                            />
                        ]}
                    >
                    </Table>
                </div>
            </div>
            <HideAndShow showDetails={showDetails} setShowDetailsFn={setShowDetails} />
        </Card>
    );
};

export default BISLineItemsCard;
