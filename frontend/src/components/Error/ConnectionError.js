import React from "react";
import {Panel, Alert} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {injectIntl} from "react-intl";

const ConnectionError = ({title, text, intl}) => {
    const {billerId} = useParams();

    return (
        <div className="row">
            <div className="col-md-12">
                <Panel>
                    <Panel.Heading>
                        <h2 className="panel-title">{title}</h2>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className="col-xs-12 col-md-10 col-md-offset-1">
                            <Alert bsStyle="danger" className="text-center">
                                {text}
                            </Alert>
                            <div className="text-center">
                                <Link 
                                    to={`/customer/biller/${billerId}/settings/biller`}
                                    className="btn btn-primary"
                                >
                                    {intl.formatMessage({id: "connection.buttonLabel"})}
                                </Link>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        </div>
    );
};

export default injectIntl(ConnectionError);
