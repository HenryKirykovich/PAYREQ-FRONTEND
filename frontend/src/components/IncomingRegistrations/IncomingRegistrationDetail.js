import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {DefaultButton, DangerButton, PrimaryButton} from "../common";
import Loading from "../Loading";
import {getDateTimeAsUTCFormatted} from "../../utils/date-utils";

const IncomingRegistrationDetail = ({billerId, registrationId, intl}) => {
    const [registration, setRegistration] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (billerId && registrationId) {
            axios.get(`/data/payerregistrations/${billerId}/registration/${registrationId}`)
                .then(({data}) => {
                    setRegistration(data.registration);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching registration:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId, registrationId]);

    const handleRefresh = () => {
        setIsLoading(true);
        axios.get(`/data/payerregistrations/${billerId}/registration/${registrationId}`)
            .then(({data}) => {
                setRegistration(data.registration);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error refreshing registration:", error);
                setIsLoading(false);
            });
    };

    const handleDeregister = () => {
        if (window.confirm(intl.formatMessage({id: "incomingRegistration.confirmDeregister"}))) {
            axios.post(`/data/payerregistrations/${billerId}/registration/${registrationId}/deregister`)
                .then(() => {
                    alert(intl.formatMessage({id: "incomingRegistration.deregisterSuccess"}));
                    handleRefresh();
                })
                .catch(error => {
                    console.error("Error deregistering:", error);
                    alert(intl.formatMessage({id: "incomingRegistration.deregisterFailed"}));
                });
        }
    };

    const handleBack = () => {
        history.goBack();
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!registration) {
        return (
            <div className="alert alert-danger">
                {intl.formatMessage({id: "incomingRegistration.notFound"})}
            </div>
        );
    }

    const showDeregisterButton = registration.status === "active";
    const showDeregisteredInfo = registration.status === "deregistered" || registration.status === "failed";
    const hasConnectionError = 
        (registration.isXeroconnect && !registration.xeroaccounts) ||
        (registration.isMyob && !registration.myobaccounts) ||
        (registration.isReckon && !registration.reckonvendors);

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-heading">
                        {intl.formatMessage({id: "incomingRegistration.title"})}
                    </h2>
                </div>
            </div>

            <div className="row actions-row">
                <div className="actions btn-group col-sm-4">
                    <DefaultButton onClick={handleBack}>
                        <span className="glyphicon glyphicon-arrow-left"></span>
                        {" "}{intl.formatMessage({id: "generic.back"})}
                    </DefaultButton>
                    <DefaultButton onClick={handleRefresh}>
                        <span className="glyphicon glyphicon-refresh"></span>
                        {" "}{intl.formatMessage({id: "generic.refresh"})}
                    </DefaultButton>
                </div>

                {showDeregisterButton && (
                    <div className="actions col-sm-6">
                        <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                            <span style={{marginRight: "1rem"}}>
                                {intl.formatMessage({id: "incomingRegistration.unsubscribePrompt"})}
                            </span>
                            <DangerButton onClick={handleDeregister}>
                                {intl.formatMessage({id: "incomingRegistration.unsubscribe"})}
                            </DangerButton>
                        </div>
                    </div>
                )}
            </div>

            {hasConnectionError && (
                <div className="col-md-10 alert alert-danger">
                    {registration.isXeroconnect && intl.formatMessage({id: "incomingRegistration.xeroConnectionError"})}
                    {registration.isMyob && intl.formatMessage({id: "incomingRegistration.myobConnectionError"})}
                    {registration.isReckon && intl.formatMessage({id: "incomingRegistration.reckonConnectionError"})}
                </div>
            )}

            <form className="form-horizontal" role="form">
                <div className="row">
                    <div className="col-md-10">
                        {/* Payer Details Panel */}
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    {intl.formatMessage({id: "incomingRegistration.payerDetails"})}
                                </h4>
                            </div>
                            <div className="panel-body">
                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">
                                        {intl.formatMessage({id: "incomingRegistration.channel"})}
                                    </label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">{registration.channelPartnerSystemDisplay}</p>
                                    </div>
                                </div>

                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">
                                        {intl.formatMessage({id: "incomingRegistration.biller"})}
                                    </label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">{registration.tagName}</p>
                                    </div>
                                </div>

                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">
                                        {intl.formatMessage({id: "incomingRegistration.billerCode"})}
                                    </label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">{registration.billerId}</p>
                                    </div>
                                </div>

                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">
                                        {registration.registrationContactIdField}
                                    </label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">
                                            <strong>{registration.accountNumber}</strong>
                                        </p>
                                    </div>
                                </div>

                                {registration.useAuthItem1 && registration.authItem1Field && (
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">{registration.authItem1Field}</label>
                                        <div className="col-md-8">
                                            <p className="form-control-static">{registration.authItem1}</p>
                                        </div>
                                    </div>
                                )}

                                {registration.useAuthItem2 && registration.authItem2Field && (
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">{registration.authItem2Field}</label>
                                        <div className="col-md-8">
                                            <p className="form-control-static">{registration.authItem2}</p>
                                        </div>
                                    </div>
                                )}

                                {registration.useAuthItem3 && registration.authItem3Field && (
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">{registration.authItem3Field}</label>
                                        <div className="col-md-8">
                                            <p className="form-control-static">{registration.authItem3}</p>
                                        </div>
                                    </div>
                                )}

                                {registration.useAuthItem4 && registration.authItem4Field && (
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">{registration.authItem4Field}</label>
                                        <div className="col-md-8">
                                            <p className="form-control-static">{registration.authItem4}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">
                                        {intl.formatMessage({id: "incomingRegistration.createdDate"})}
                                    </label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">
                                            {getDateTimeAsUTCFormatted(registration.createdDate)}
                                        </p>
                                    </div>
                                </div>

                                {showDeregisteredInfo && (
                                    <div className="alert alert-danger col-md-10">
                                        <div className="form-group col-md-12">
                                            <label className="col-md-4 control-label">
                                                {intl.formatMessage({id: "incomingRegistration.deregisteredDate"})}
                                            </label>
                                            <div className="col-md-8">
                                                <p className="form-control-static">
                                                    {getDateTimeAsUTCFormatted(registration.deactivatedDate)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="col-md-4 control-label">
                                                {intl.formatMessage({id: "incomingRegistration.deregisteredReason"})}
                                            </label>
                                            <div className="col-md-8">
                                                <p className="form-control-static">{registration.statusDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default injectIntl(IncomingRegistrationDetail);
