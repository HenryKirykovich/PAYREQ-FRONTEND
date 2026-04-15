import React, {useEffect, useState} from "react";
import axios from "axios";
import {Panel, Button, Alert} from "react-bootstrap";
import {useAppState} from "../../../state";
import Loading from "../../Loading";
import moment from "moment";

const BillerQboPayrollSettings = ({billerId}) => {
    const [{user}] = useAppState();
    const [billerSettings, setBillerSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const hasAllAccess = user.permissions && user.permissions.includes("settings.biller.view.all");

    useEffect(() => {
        if (billerId) {
            fetchSettings();
        }
    }, [billerId]);

    const fetchSettings = () => {
        setIsLoading(true);
        axios.get("/data/settings/biller", {params: {billerId}})
            .then(({data}) => {
                setBillerSettings(data.billerSettings);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching biller settings:", error);
                setIsLoading(false);
            });
    };

    const handleConnectToQbo = () => {
        // OAuth connection - redirect to external URL
        window.location.href = `/data/settings/qbo/${billerId}/connect`;
    };

    const handleReconnectToQbo = () => {
        // Manual reconnect
        window.location.href = `/data/settings/qbo/${billerId}/connect?manualReconnect=true`;
    };

    const handleDisconnectFromQbo = () => {
        if (window.confirm("Are you sure you want to disconnect from QuickBooks Online?")) {
            axios.put(`/data/settings/qbo/disconnect/${billerSettings.qboPayrollAuthorisation.id}`)
                .then(({data}) => {
                    alert("QuickBooks Online account disconnected successfully.");
                    fetchSettings();
                })
                .catch(error => {
                    console.error("Error disconnecting QBO:", error);
                    alert("Failed to disconnect from QuickBooks Online. Please try again later.");
                });
        }
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!billerSettings) {
        return (
            <div className="alert alert-danger">
                Failed to load biller settings
            </div>
        );
    }

    if (!hasAllAccess) {
        return null;
    }

    const hasAuthorised = !!billerSettings.qboPayrollAuthorisation;

    return (
        <Panel className="qbo-payroll-settings">
            <Panel.Heading>
                <h4>QuickBooks Online Payroll Account Properties</h4>
            </Panel.Heading>
            <Panel.Body>
                <div className="form-group">
                    <div className="col-sm-12">
                        {hasAuthorised ? (
                            <div>
                                {billerSettings.qboPayrollAuthorisation.needAttention ? (
                                    <>
                                        <Alert bsStyle="warning" className="text-center">
                                            Some error occurred while reconnecting to your <strong>QuickBooks Online</strong> account.
                                            Click the button below and follow the on screen instructions to manually complete this step.
                                        </Alert>

                                        <Button bsStyle="primary" onClick={handleReconnectToQbo}>
                                            <span className="glyphicon glyphicon-refresh"></span> Manually Reconnect QuickBooks Online Account
                                        </Button>
                                        <div className="hr-text">
                                            <span>  OR  </span>
                                        </div>
                                        <Button bsStyle="danger" onClick={handleDisconnectFromQbo}>
                                            Disconnect from QuickBooks
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <h4>
                                            <span className="glyphicon glyphicon-ok"></span> Your QuickBooks Online account is connected to Payreq.
                                        </h4>

                                        <dl>
                                            <div>
                                                <dt>Account email address</dt>
                                                <dd>{billerSettings.qboPayrollAuthorisation.emailAddress}</dd>
                                            </div>

                                            <div>
                                                <dt>Company name</dt>
                                                <dd>{billerSettings.qboPayrollAuthorisation.companyName}</dd>
                                            </div>

                                            <div>
                                                <dt>Time authorised</dt>
                                                <dd>{moment(billerSettings.qboPayrollAuthorisation.timeStarted).format("DD MMM YYYY")}</dd>
                                            </div>
                                        </dl>
                                        <Button bsStyle="danger" onClick={handleDisconnectFromQbo}>
                                            Disconnect from QuickBooks
                                        </Button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div>
                                <Alert bsStyle="info" className="text-center">
                                    You have not yet connected <strong>Payreq</strong> to your <strong>QuickBooks Online</strong> account.
                                    Click the button below and follow the on screen instructions to complete this step.
                                </Alert>
                                <a href="#" onClick={(e) => {e.preventDefault(); handleConnectToQbo();}} className="intuitPlatformConnectButton"></a>
                            </div>
                        )}
                    </div>
                </div>
            </Panel.Body>
        </Panel>
    );
};

export default BillerQboPayrollSettings;
