import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import CreateAccountDetailsView from "./CreateAccountDetailsView";
import Loading from "../Loading";
import CreateAccountView from "./CreateAccountView";

const getCreateAccountDefaults = (fastpass, setUsername, setFormDefaults, setIsLoading, setFastpass) => {

    axios.get(`/auth/rego-defaults/${fastpass}`)
        .then(({data}) => {
            if (data.success) {
                setUsername(data.defaults.email);
                setFormDefaults(data.defaults);
                if(fastpass && data.defaults.fastpass === false){
                    sessionStorage.removeItem('fastpass');
                    setFastpass(null);
                }
            }
        })
        .finally(setIsLoading(false))
}


const CreateAccount = () => {
    const [username, setUsername] = useState();
    const [formDefaults, setFormDefaults] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [fastpass, setFastpass] = useState(sessionStorage.getItem('fastpass'))

    useEffect(() => getCreateAccountDefaults(fastpass, setUsername, setFormDefaults, setIsLoading, setFastpass),[fastpass])

    if(isLoading) return <Loading/>;

    if (!username) return <CreateAccountView setUsername={setUsername}/>;

    return (
        <CreateAccountDetailsView username={username} fastpass={fastpass} formDefaults={formDefaults} setUsername={setUsername}/>
    )
}

export default withRouter(CreateAccount);