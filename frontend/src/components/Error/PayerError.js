import React from "react";
import {Panel, Alert, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";

const PayerError = ({intl}) => {
    return (
        <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <Panel id="login-panel">
                    <Panel.Heading>
                        <h2 className="panel-title">
                            {intl.formatMessage({id: "createAcctError.heading"})}
                        </h2>
                    </Panel.Heading>
                    <Panel.Body>
                        <Alert bsStyle="warning">
                            <p>{intl.formatMessage({id: "createAcctError.textLine1"})}</p>
                            <p dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({id: "createAcctError.textLine2"})
                            }}/>
                        </Alert>
                        <div className="form-group">
                            <Link to="/login">
                                <Button bsStyle="default">
                                    {intl.formatMessage({id: "createAcctError.backButton"})}
                                </Button>
                            </Link>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        </div>
    );
};

export default injectIntl(PayerError);
