import React from "react";
import * as R from 'ramda';

import {PageHeading} from "../../common";

import styles from "./DashboardView.module.scss";

const CardRow = ({cards: cardPair}) => {
    return (
        <div className={styles.cardRow}>
            {cardPair.map((CardComponent, idx) => <CardComponent key={idx}/>)}
        </div>
    )
};
const groupInPairs = (items) => R.splitEvery(2, items);

const DashboardView = ({bodyCards, children}) => (
    <div>
        <PageHeading text="dashboard.heading"/>
        {children}
        {bodyCards && groupInPairs(bodyCards).map((cards, i) => <CardRow key={i} cards={cards}/>)}
    </div>
);

export default DashboardView;