import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";

import CardView from "./CardView";
import Loading from "../Loading";

const getCard = (billerId, id, setCards) => {
    axios.get(`/data/cards/${billerId}/${id}`)
        .then(({data}) => setCards(data.card));
};

const Card = ({match: {params: {id}}, billerId}) => {
    const [card, setCard] = useState();
    useEffect(
        () => getCard(billerId, id, setCard),
        [billerId, id, setCard]
    );
    return card ? <CardView billerId={billerId} card={card}/> : <Loading/>;
};

export default withRouter(Card);