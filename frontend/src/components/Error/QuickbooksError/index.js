import React from "react";
import {useHistory} from "react-router-dom";
import {injectIntl} from "react-intl";
import {Alert, Button} from "../../common";

const QuickbooksError = ({username, password, intl}) => {
    const history = useHistory();

    const handleBackToLogin = () => {
        history.push("/login", {username, password});
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-default" id="login-panel">
                    <div className="panel-heading">
                        <h2 className="panel-title">
                            {intl.formatMessage({id: "error.qbo.heading"})}
                        </h2>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-4 col-md-offset-4">
                            <Alert variant="danger" className="text-center">
                                {intl.formatMessage({id: "error.qbo.text"})}
                            </Alert>
                            <div className="text-center">
                                <Button variant="primary" onClick={handleBackToLogin}>
                                    {intl.formatMessage({id: "error.qbo.backButton"})}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(QuickbooksError);
