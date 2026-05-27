import React from "react";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";

const ChannelError = ({channel, billerId, intl}) => (
    <div className="row">
        <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h2 className="panel-title">
                        {intl.formatMessage({id: "errors.connection.title"}, {channel})}
                    </h2>
                </div>
                <div className="panel-body">
                    <div className="col-xs-12 col-md-10 col-md-offset-1">
                        <div className="alert alert-danger text-center">
                            {intl.formatMessage({id: "errors.connection.text"}, {channel})}
                        </div>
                        <div className="text-center">
                            <Link to={`/portal/customer/biller/${billerId}/settings/connections`}
                                  className="btn btn-primary">
                                {intl.formatMessage({id: "errors.connection.buttonLabel"})}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default injectIntl(ChannelError);
