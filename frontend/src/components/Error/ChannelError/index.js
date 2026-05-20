import React from "react";
import {useParams, useHistory} from "react-router-dom";
import {useIntl} from "react-intl";
import {Alert, PrimaryButton} from "../../common";

const ChannelError = () => {
    const {billerId, channel} = useParams();
    const history = useHistory();
    const intl = useIntl();

    const title = intl.formatMessage({id: "error.channel.title"}, {channel});
    const text = intl.formatMessage({id: "error.channel.text"}, {channel});

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">{title}</h2>
                    </div>
                    <div className="panel-body">
                        <div className="col-xs-12 col-md-10 col-md-offset-1">
                            <Alert type="danger" className="text-center">
                                {text}
                            </Alert>
                            <div className="text-center">
                                <PrimaryButton
                                    label="error.channel.buttonLabel"
                                    onClick={() => history.push(`/portal/customer/biller/${billerId}/settings/connections/view`)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelError;
