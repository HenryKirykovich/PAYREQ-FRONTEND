import React, {useEffect, useState} from 'react';

import CardsView from "./CardsView";
import Loading from "../Loading";
import {getCards} from "../../utils/card-utils";

const Cards = ({billerId}) => {
    const [cards, setCards] = useState();
    useEffect(
        () => getCards(billerId, setCards),
        [billerId, setCards]
    );
    return cards ? <CardsView cards={cards}/> : <Loading/>;
};

export default Cards;