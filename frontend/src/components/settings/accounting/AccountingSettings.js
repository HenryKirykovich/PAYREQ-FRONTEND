import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";

const AccountingSettings = ({billerId, intl}) => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billerId) {
            axios.get("/data/settings/accounting", {params: {billerId}})
                .then(({data}) => {
                    setSettings(data.accountingSettings);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching accounting settings:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId]);

    if (isLoading) {
        return <Loading/>;
    }

    if (!settings) {
        return (
            <div className="alert alert-info">
                {intl.formatMessage({id: "settings.accounting.notAvailable"})}
            </div>
        );
    }

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        {intl.formatMessage({id: "settings.accounting.heading"})}
                    </h4>
                </div>
                <div className="panel-body">
                    <div className="alert alert-info">
                        <p>{intl.formatMessage({id: "settings.accounting.description"})}</p>
                    </div>

                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="col-sm-3 control-label">
                                {intl.formatMessage({id: "settings.accounting.currentPlan"})}
                            </label>
                            <div className="col-sm-9">
                                <p className="form-control-static">
                                    <strong>{settings.accountingPlan || "Standard"}</strong>
                                </p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label">
                                {intl.formatMessage({id: "settings.accounting.creditBalance"})}
                            </label>
                            <div className="col-sm-9">
                                <p className="form-control-static">
                                    <strong>{settings.creditBalance || 0}</strong> credits
                                </p>
                            </div>
                        </div>

                        {settings.showPurchaseOptions && (
                            <div className="form-group">
                                <div className="col-sm-9 col-sm-offset-3">
                                    <Button bsStyle="primary" onClick={() => alert("Purchase credits functionality to be implemented")}>
                                        {intl.formatMessage({id: "settings.accounting.purchaseCredits"})}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(AccountingSettings);
