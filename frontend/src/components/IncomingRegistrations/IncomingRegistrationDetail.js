import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, Panel, Alert} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Loading from "../Loading";
import moment from "moment";
import {ConfirmDeregisterModal} from "../modals";

const IncomingRegistrationDetail = ({billerId, registrationId}) => {
    const [registration, setRegistration] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deletedDetails, setDeletedDetails] = useState([]);
    const [showDeregisterModal, setShowDeregisterModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (registrationId) {
            fetchRegistration();
        }
    }, [registrationId]);

    const fetchRegistration = () => {
        setIsLoading(true);
        axios.get(`/data/payerregistrations/${registrationId}`)
            .then(({data}) => {
                setRegistration(data.payerregistration);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching registration:", error);
                setIsLoading(false);
            });
    };

    const handleRefresh = () => {
        fetchRegistration();
    };

    const handleBack = () => {
        if (registration && registration.billerActorId) {
            history.push(`/customer/biller/${billerId}/registrations/billers/${registration.billerActorId}`);
        } else {
            history.goBack();
        }
    };

    const handleDeregisterClick = () => {
        setShowDeregisterModal(true);
    };

    const handleConfirmDeregister = () => {
        setShowDeregisterModal(false);
        axios.post(`/data/payer/registrations/${billerId}/mailer/${registration.billerActorId}/channel/selfservice/deregister/${registrationId}`)
            .then(() => {
                alert("De-registration successful.");
                fetchRegistration();
            })
            .catch(error => {
                console.error("Error deregistering:", error);
                alert("An error occurred while deregistering the registration. Please try again later.");
            });
    };

    const handleUpdate = () => {
        const updateData = {
            id: registrationId,
            channelref1: registration.channelRef1,
            channelref2: registration.channelRef2,
            channelref3: registration.channelRef3,
            channelref4: registration.channelRef4,
            details: registration.details,
            deleteddetails: deletedDetails
        };

        // Validate for email registrations
        if (registration.isEmail) {
            let hasError = false;
            let errorMsg = "";

            registration.details.forEach((detail) => {
                if (!detail.registrationValue || detail.registrationValue.trim() === "") {
                    hasError = true;
                    errorMsg = "Please ensure all emails are entered below.";
                }
                if (!detail.id && (!detail.accept || detail.accept === false)) {
                    hasError = true;
                    errorMsg = "Please ensure all emails are confirmed below.";
                }
            });

            if (hasError) {
                setErrorMessage(errorMsg);
                return;
            }
        }

        setIsLoading(true);
        axios.post("/data/payerregistrations", updateData)
            .then(({data}) => {
                if (data.success) {
                    alert("Registration updated successfully");
                    fetchRegistration();
                } else {
                    setErrorMessage(data.error || "An error occurred while updating the registration.");
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Error updating registration:", error);
                setErrorMessage("An error occurred while updating the registration. Please try again later.");
                setIsLoading(false);
            });
    };

    const handleAddEmail = () => {
        if (registration.details.length < registration.maxNoDetails) {
            setRegistration({
                ...registration,
                details: [...registration.details, {registrationValue: null, accept: false}]
            });
            setErrorMessage(null);
        } else {
            setErrorMessage(`You have reached the maximum number of emails (${registration.maxNoDetails}) for a registration.`);
        }
    };

    const handleRemoveEmail = (email, index) => {
        const activeEmailsCount = registration.details.filter(d => d.status === 0).length;

        if (email.status === 0 && activeEmailsCount === 1) {
            setErrorMessage("The selected email cannot be deleted. At least one active email is required for a registration.");
            return;
        }

        if (email.id) {
            setDeletedDetails([...deletedDetails, email]);
        }

        setRegistration({
            ...registration,
            details: registration.details.filter((_, i) => i !== index)
        });
        setErrorMessage(null);
    };

    const handleResendEmailVerification = (detailId) => {
        axios.post("/data/payerregistrations/resend", {id: detailId})
            .then(({data}) => {
                if (data.success) {
                    alert("Confirmation email resent successfully");
                } else {
                    alert(data.error || "An error occurred while attempting to resend your confirmation email. Please try again later.");
                }
            })
            .catch(error => {
                console.error("Error resending email:", error);
                alert("An error occurred while attempting to resend your confirmation email. Please try again later.");
            });
    };

    const updateEmailValue = (index, value) => {
        const newDetails = [...registration.details];
        newDetails[index].registrationValue = value;
        setRegistration({...registration, details: newDetails});
    };

    const updateEmailAccept = (index, checked) => {
        const newDetails = [...registration.details];
        newDetails[index].accept = checked;
        setRegistration({...registration, details: newDetails});
    };

    const updateChannelRef = (field, value) => {
        setRegistration({...registration, [field]: value});
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!registration) {
        return (
            <div className="alert alert-danger">
                Registration not found
            </div>
        );
    }

    const showDeregisterButton = registration.status === "pending" || registration.status === "active";
    const showDeregisteredInfo = registration.status === "failed" || registration.status === "deregistered";
    const showNotDeregisteredAndFailed = !(registration.status === "failed" || registration.status === "deregistered");
    const hasXeroAccounts = registration.isXeroconnect && registration.xeroaccounts && registration.xeroaccounts.length > 0;
    const hasMyobBusinesses = registration.isMyob && registration.myobaccounts && registration.myobaccounts.length > 0;
    const hasReckonVendors = registration.isReckon && registration.reckonvendors && registration.reckonvendors.length > 0;
    const hasReckonAccounts = registration.isReckon && registration.reckonaccounts && registration.reckonaccounts.length > 0;
    const hasReckonTaxCodes = registration.isReckon && registration.reckontaxcodes && registration.reckontaxcodes.length > 0;
    const enableUpdateButton = (registration.status === "pending" || registration.status === "active") &&
        (!registration.isXeroconnect || hasXeroAccounts) &&
        (!registration.isMyob || hasMyobBusinesses) &&
        (!registration.isReckon || hasReckonVendors);

    const gstInclusiveExclusive = [{id: "Inclusive", name: "Inclusive"}, {id: "Exclusive", name: "Exclusive"}, {id: "NoTax", name: "NoTax"}];
    const gstInclusiveExclusiveMyob = [{id: "Inclusive", name: "Inclusive"}, {id: "Exclusive", name: "Exclusive"}];
    const amountTotalOrMinimum = [{id: "TOTAL", name: "Total Amount"}, {id: "MINIMUM", name: "Minimum Amount/Installment Amount"}];
    const invoiceStatus = [{id: "DRAFT", name: "DRAFT"}, {id: "AUTHORISED", name: "AUTHORISED"}, {id: "SUBMITTED", name: "SUBMITTED"}];

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Connection</h2>
                </div>
            </div>

            <div className="row actions-row">
                <div className="actions btn-group col-sm-4">
                    <Button onClick={handleBack}>
                        <span className="glyphicon glyphicon-arrow-left"></span> Back
                    </Button>
                    <Button onClick={handleRefresh}>
                        <span className="glyphicon glyphicon-refresh"></span> Refresh
                    </Button>
                </div>

                <div className="actions col-sm-6">
                    {showDeregisterButton && (
                        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <span style={{marginRight: '1rem'}}>Don't want to receive this bill digitally?</span>
                            <Button bsStyle="danger" onClick={handleDeregisterClick}>
                                Disconnect
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {registration.isXeroconnect && !hasXeroAccounts && (
                <div className="col-md-10 alert alert-danger">
                    Unable to connect to xero. Please try again later.
                </div>
            )}

            {registration.isMyob && !hasMyobBusinesses && (
                <div className="col-md-10 alert alert-danger">
                    Unable to connect to MYOB. Please try again later.
                </div>
            )}

            {registration.isReckon && !hasReckonVendors && (
                <div className="col-md-10 alert alert-danger">
                    Unable to connect to Reckon. Please try again later.
                </div>
            )}

            <form className="form-horizontal" role="form">
                <div className="row">
                    <div className="col-md-10">
                        <Panel>
                            <Panel.Heading>
                                <h4>Payer Details</h4>
                            </Panel.Heading>
                            <Panel.Body>
                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">Channel</label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">
                                            {registration.channelPartnerSystemId === '1' ? 'Xero' :
                                                registration.channelPartnerSystemId === '2' ? 'MYOB' :
                                                    registration.channelPartnerSystemId === '3' ? 'Reckon' :
                                                        registration.channelPartnerSystemId === '4' ? 'Email' : 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">Biller</label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">{registration.tagName}</p>
                                    </div>
                                </div>
                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">Biller Code</label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">{registration.billerId}</p>
                                    </div>
                                </div>
                                <div className="form-group col-md-10">
                                    <label className="col-md-4 control-label">{registration.registrationContactIdField}</label>
                                    <div className="col-md-8">
                                        <p className="form-control-static"><strong>{registration.accountNumber}</strong></p>
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
                                    <label className="col-md-4 control-label">Created Date</label>
                                    <div className="col-md-8">
                                        <p className="form-control-static">
                                            {moment(registration.createdDate).format("DD MMM YYYY hh:mm:ss a")}
                                        </p>
                                    </div>
                                </div>
                                {showDeregisteredInfo && (
                                    <Alert bsStyle="danger" className="col-md-10">
                                        <div className="form-group col-md-12">
                                            <label className="col-md-4 control-label">Deregistered Date</label>
                                            <div className="col-md-8">
                                                <p className="form-control-static">
                                                    {moment(registration.deactivatedDate).format("DD MMM YYYY hh:mm:ss a")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="col-md-4 control-label">Deregistered Reason</label>
                                            <div className="col-md-8">
                                                <p className="form-control-static">{registration.deactivatedReason}</p>
                                            </div>
                                        </div>
                                    </Alert>
                                )}
                            </Panel.Body>
                        </Panel>
                    </div>
                </div>
            </form>

            {/* Xero Invoice Fields */}
            {registration.isXeroconnect && (
                <form className="form-horizontal" role="form">
                    <div className="row">
                        <div className="col-md-10">
                            <Panel>
                                <Panel.Heading>
                                    <h4>Xero Invoice Fields</h4>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">GST Inclusive or Exclusive</label>
                                        <div className="col-md-8">
                                            <FormControl
                                                componentClass="select"
                                                value={registration.channelRef1 || ""}
                                                onChange={(e) => updateChannelRef('channelRef1', e.target.value)}
                                            >
                                                {gstInclusiveExclusive.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Default Invoice Account Code</label>
                                        <div className="col-md-8">
                                            {hasXeroAccounts ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={registration.channelRef2 || ""}
                                                    onChange={(e) => updateChannelRef('channelRef2', e.target.value)}
                                                >
                                                    {registration.xeroaccounts.map(account => (
                                                        <option key={account.id} value={account.id}>{account.name}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <p>Unable to access xero accounts</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Default Invoice Status</label>
                                        <div className="col-md-8">
                                            <FormControl
                                                componentClass="select"
                                                value={registration.channelRef3 || ""}
                                                onChange={(e) => updateChannelRef('channelRef3', e.target.value)}
                                            >
                                                {invoiceStatus.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Amount Payable Total or Minimum/Installment</label>
                                        <div className="col-md-8">
                                            <FormControl
                                                componentClass="select"
                                                value={registration.channelRef4 || ""}
                                                onChange={(e) => updateChannelRef('channelRef4', e.target.value)}
                                            >
                                                {amountTotalOrMinimum.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="btn-toolbar pull-right margin-top-sm">
                                            <Button
                                                bsStyle="primary"
                                                disabled={!enableUpdateButton}
                                                onClick={handleUpdate}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </div>
                    </div>
                </form>
            )}

            {/* MYOB Invoice Fields */}
            {registration.isMyob && (
                <form className="form-horizontal" role="form">
                    <div className="row">
                        <div className="col-md-10">
                            <Panel>
                                <Panel.Heading>
                                    <h4>MYOB Invoice Fields</h4>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">MYOB business</label>
                                        <div className="col-md-8">
                                            {hasMyobBusinesses ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={registration.channelRef2 || ""}
                                                    onChange={(e) => updateChannelRef('channelRef2', e.target.value)}
                                                >
                                                    {registration.myobaccounts.map(account => (
                                                        <option key={account.id} value={account.id}>{account.name}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <p>Unable to access MYOB Businesses</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">GST Inclusive or Exclusive</label>
                                        <div className="col-md-8">
                                            <FormControl
                                                componentClass="select"
                                                value={registration.channelRef1 || ""}
                                                onChange={(e) => updateChannelRef('channelRef1', e.target.value)}
                                            >
                                                {gstInclusiveExclusiveMyob.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Amount Payable Total or Minimum/Installment</label>
                                        <div className="col-md-8">
                                            <FormControl
                                                componentClass="select"
                                                value={registration.channelRef3 || ""}
                                                onChange={(e) => updateChannelRef('channelRef3', e.target.value)}
                                            >
                                                {amountTotalOrMinimum.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="btn-toolbar pull-right margin-top-sm">
                                            <Button
                                                bsStyle="primary"
                                                disabled={!enableUpdateButton}
                                                onClick={handleUpdate}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </div>
                    </div>
                </form>
            )}

            {/* Email Registration Fields */}
            {registration.isEmail && (
                <form className="form-horizontal" role="form">
                    <div className="row">
                        <div className="col-md-10">
                            <Panel>
                                <Panel.Heading>
                                    <h4>Registered Emails</h4>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="row">
                                        <div className="div-margin">
                                            <Alert bsStyle="info">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h5>Only active emails that have been verified following the step in the verification email will receive bills.</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-1">
                                                        <Button bsStyle="success" title="Email active">
                                                            <span className="glyphicon glyphicon-ok-circle"></span>
                                                        </Button>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <h5>An active email registration</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-1">
                                                        <Button bsStyle="warning" title="Email pending confirmation">
                                                            <span className="glyphicon glyphicon-ban-circle"></span>
                                                        </Button>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <h5>An email address pending confirmation.</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-1">
                                                        <Button title="Resend confirmation email">
                                                            <span className="glyphicon glyphicon-repeat"></span>
                                                        </Button>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <h5>Resend confirmation email to listed email address. Button is only available if email address is pending confirmation.</h5>
                                                    </div>
                                                </div>
                                            </Alert>
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <div className="row">
                                            <div className="div-margin">
                                                <Alert bsStyle="danger">
                                                    {errorMessage}
                                                </Alert>
                                            </div>
                                        </div>
                                    )}

                                    {registration.details && registration.details.map((detail, index) => (
                                        <div key={index}>
                                            {!detail.id && index > 0 && (
                                                <div className="form-group col-md-12">
                                                    <hr/>
                                                </div>
                                            )}
                                            <div className="form-group col-md-11">
                                                <label className="col-md-3 hidden-sm hidden-xs control-label">Email</label>
                                                <div className="col-md-6 col-sm-9 col-xs-9">
                                                    {detail.id ? (
                                                        <p className="form-control-static">
                                                            <strong>{detail.registrationValue}</strong>
                                                            {detail.isValid && <small> | Active from {moment(detail.activatedTime).format("DD MMM YYYY hh:mm:ss a")}</small>}
                                                        </p>
                                                    ) : (
                                                        <FormControl
                                                            type="email"
                                                            placeholder="Email"
                                                            value={detail.registrationValue || ""}
                                                            onChange={(e) => updateEmailValue(index, e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-md-1 col-sm-1 col-xs-1">
                                                    {detail.isValid ? (
                                                        <Button bsStyle="success" title="Email active">
                                                            <span className="glyphicon glyphicon-ok-circle"></span>
                                                        </Button>
                                                    ) : (
                                                        <Button bsStyle="warning" title="Email pending confirmation">
                                                            <span className="glyphicon glyphicon-time"></span>
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="col-md-1 col-sm-1 col-xs-1" style={{lineHeight: '28px'}}>
                                                    <Button
                                                        bsStyle="danger"
                                                        title="Delete email"
                                                        onClick={() => handleRemoveEmail(detail, index)}
                                                        disabled={showDeregisteredInfo}
                                                    >
                                                        <span className="glyphicon glyphicon-remove"></span>
                                                    </Button>
                                                </div>
                                                <div className="col-md-1 col-sm-1 col-xs-1" style={{lineHeight: '28px'}}>
                                                    {!detail.isValid && detail.id && showNotDeregisteredAndFailed && (
                                                        <Button
                                                            title="Resend email confirmation"
                                                            onClick={() => handleResendEmailVerification(detail.id)}
                                                        >
                                                            <span className="glyphicon glyphicon-repeat"></span>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            {!detail.id && (
                                                <div className="form-group col-md-11">
                                                    <label className="col-md-2 text-right hidden-sm hidden-xs">Confirm Address: </label>
                                                    <label className="hidden-md hidden-lg text-left col-sm-5 col-xs-5">Confirm Address: </label>
                                                    <div className="col-md-1 text-center col-sm-2 col-xs-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={detail.accept || false}
                                                            onChange={(e) => updateEmailAccept(index, e.target.checked)}
                                                        />
                                                    </div>
                                                    <div className="col-md-8 col-sm-12 col-xs-12">
                                                        <label><small className="text-muted">By confirming the email address you are allowing the owner of the email address to receive bills or statements</small></label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {showNotDeregisteredAndFailed && (
                                        <div className="form-group col-md-11">
                                            <div className="actions btn-group col-md-4 col-md-offset-4">
                                                <Button style={{width: '100%'}} onClick={handleAddEmail}>
                                                    <span className="glyphicon glyphicon-plus"></span> Add Email
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-sm-12">
                                        <div className="btn-toolbar pull-right margin-top-sm">
                                            <Button
                                                bsStyle="primary"
                                                onClick={handleUpdate}
                                                disabled={!showNotDeregisteredAndFailed}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </div>
                    </div>
                </form>
            )}

            {/* Reckon Invoice Fields */}
            {registration.isReckon && (
                <form className="form-horizontal" role="form">
                    <div className="row">
                        <div className="col-md-10">
                            <Panel>
                                <Panel.Heading>
                                    <h4>Reckon Invoice Fields</h4>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Supplier</label>
                                        <div className="col-md-8">
                                            {hasReckonVendors ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={registration.channelRef1 || ""}
                                                    onChange={(e) => updateChannelRef('channelRef1', e.target.value)}
                                                >
                                                    {registration.reckonvendors.map(vendor => (
                                                        <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <p>Unable to access Reckon suppliers</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Supplier Terms</label>
                                        <div className="col-md-8">
                                            <p className="form-control-static">{registration.supplier?.terms || ""}</p>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Supplier Tax Code</label>
                                        <div className="col-md-8">
                                            {hasReckonTaxCodes ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={registration.channelRef3 || ""}
                                                    onChange={(e) => updateChannelRef('channelRef3', e.target.value)}
                                                >
                                                    {registration.reckontaxcodes.map(code => (
                                                        <option key={code.id} value={code.id}>{code.name}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <p>Unable to access Reckon tax codes</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Default Reckon Account Code</label>
                                        <div className="col-md-8">
                                            {hasReckonAccounts ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={registration.channelRef2 || ""}
                                                    onChange={(e) => updateChannelRef('channelRef2', e.target.value)}
                                                >
                                                    {registration.reckonaccounts.map(account => (
                                                        <option key={account.id} value={account.id}>{account.name}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <p>Unable to access Reckon account codes</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label className="col-md-4 control-label">Amount Payable Total or Minimum/Installment</label>
                                        <div className="col-md-8">
                                            <FormControl
                                                componentClass="select"
                                                value={registration.channelRef4 || ""}
                                                onChange={(e) => updateChannelRef('channelRef4', e.target.value)}
                                            >
                                                {amountTotalOrMinimum.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="btn-toolbar pull-right margin-top-sm">
                                            <Button
                                                bsStyle="primary"
                                                disabled={!enableUpdateButton}
                                                onClick={handleUpdate}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </div>
                    </div>
                </form>
            )}
            
            <ConfirmDeregisterModal
                show={showDeregisterModal}
                onClose={() => setShowDeregisterModal(false)}
                onConfirm={handleConfirmDeregister}
            />
        </div>
    );
};

export default IncomingRegistrationDetail;
