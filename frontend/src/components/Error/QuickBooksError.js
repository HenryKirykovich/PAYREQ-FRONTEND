import React from "react";
import {Panel, Alert, Button} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom";
import {injectIntl} from "react-intl";

const QuickBooksError = ({intl}) => {
    const history = useHistory();
    const location = useLocation();
    const username = location.state?.username;
    const password = location.state?.password;

    const handleBackToLogin = () => {
        history.push("/login", {username, password});
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <Panel id="login-panel">
                    <Panel.Heading>
                        <h2 className="panel-title">
                            {intl.formatMessage({id: "qboError.heading"})}
                        </h2>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className="col-md-4 col-md-offset-4">
                            <Alert bsStyle="danger" className="text-center">
                                {intl.formatMessage({id: "qboError.text"})}
                            </Alert>
                            <div className="text-center">
                                <Button bsStyle="primary" onClick={handleBackToLogin}>
                                    {intl.formatMessage({id: "qboError.backButton"})}
                                </Button>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        </div>
    );
};

export default injectIntl(QuickBooksError);
