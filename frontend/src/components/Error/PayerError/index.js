import React from "react";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";
import {Alert} from "../../common";

const PayerError = ({intl}) => {
    return (
        <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <div className="panel panel-default" id="login-panel">
                    <div className="panel-heading">
                        <h2 className="panel-title">
                            {intl.formatMessage({id: "error.createAcct.heading"})}
                        </h2>
                    </div>
                    <div className="panel-body">
                        <Alert variant="warning">
                            <p>{intl.formatMessage({id: "error.createAcct.textLine1"})}</p>
                            <p dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({id: "error.createAcct.textLine2"})
                            }}/>
                        </Alert>
                        <div className="form-group">
                            <Link to="/login">
                                <button className="btn btn-default" type="submit">
                                    {intl.formatMessage({id: "error.createAcct.backButton"})}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(PayerError);
