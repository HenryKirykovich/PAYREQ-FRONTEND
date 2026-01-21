import React from "react";
import styles from "./SurchargeList.module.scss"
import {CARD_SCHEME_LABELS} from "./payment-constants";
import {RegularText} from "../common";

const SurchargeRow = ({cardDetails}) => (
    <RegularText>{CARD_SCHEME_LABELS[cardDetails.providerName]} {cardDetails.surchargePercentage}%</RegularText>
);

const SurchargeList = ({cardsAccepted}) => {
    const isSurcharging = cardsAccepted.filter(ca => ca.surchargePercentage !== 0).length > 0;
    if (!isSurcharging) return null;
    return (
        <div className={styles.section}>
            <RegularText text="payments.surchargeNotice" />
            {cardsAccepted.map(ca => <SurchargeRow key={ca.providerName} cardDetails={ca}/>)}
        </div>
    )
};

export default SurchargeList;
