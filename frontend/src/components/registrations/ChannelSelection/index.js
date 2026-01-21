import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import ChannelSelectionView from "./ChannelSelectionView";
import Loading from "../../Loading";

const getConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice`)
        .then(({data}) => setConfig(data));
};

const ChannelSelection = ({payerId, match: {params: {registeringForbillerId}}, history}) => {
    const [config, setConfig] = useState();
    useEffect(() => getConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId]);

    if (!config) return <Loading/>;

    if(config.authorisedAgent) {
        history.push(`./${registeringForbillerId}/message`);
        return null;
    }

    return <ChannelSelectionView payerId={payerId}
                                 registeringForbillerId={registeringForbillerId}
                                 channels={config.channels}
                                 logoPath={config.logoPath}
                                 billerName={config.mybillsDisplayName}/>
};

export default withRouter(ChannelSelection);
