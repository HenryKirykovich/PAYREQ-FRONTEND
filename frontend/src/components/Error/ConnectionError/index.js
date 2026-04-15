import React from "react";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";
import {Alert} from "../../common";

const ConnectionError = ({billerId, title, text, intl}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">{title || "Connection Error"}</h2>
                    </div>
                    <div className="panel-body">
                        <div className="col-xs-12 col-md-10 col-md-offset-1">
                            <Alert variant="danger" className="text-center">
                                {text || "There was a problem connecting to the service. Please check your connection settings."}
                            </Alert>
                            <div className="text-center">
                                <Link
                                    to={`/portal/customer/biller/${billerId}/settings/biller`}
                                    className="btn btn-primary"
                                >
                                    {intl.formatMessage({id: "error.connection.buttonLabel"})}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(ConnectionError);
