import React, {useEffect, useState} from "react";
import axios from "axios";

import Loading from "../../Loading";
import ConnectionsView from "./ConnectionsView";

export const getConnections = (billerId, setIsLoading, setConnections) => {
    axios.get("/connections", {params: {billerId}, localErrorHandling: true})
        .then(({data}) => {
            setConnections(data);
            setIsLoading(false);
        })
        .catch(() => {
            setConnections({});
            setIsLoading(false);
        });
};

const ConnectionsSettings = ({billerId, billerSettings}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [connections, setConnections] = useState();

    const reload = () => {
        setIsLoading(true);
        getConnections(billerId, setIsLoading, setConnections);
    };

    useEffect(
        () => getConnections(billerId, setIsLoading, setConnections),
        [billerId, setIsLoading, setConnections]
    );

    if (isLoading) return <Loading/>;

    return (
        <ConnectionsView
            connections={connections}
            billerSettings={billerSettings}
            billerId={billerId}
            onReload={reload}
        />
    );
};

export default ConnectionsSettings;
