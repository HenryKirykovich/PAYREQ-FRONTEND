import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {PageHeading, TextInput, Button, Alert, Checkbox} from "../common";
import Loading from "../Loading";
import {getDateAsFormatted} from "../../utils/date-utils";

const IncomingEmailRegistration = ({billerId, registrationId, intl}) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [model, setModel] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [details, setDetails] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (billerId && registrationId) {
            fetchRegistration();
        }
    }, [billerId, registrationId]);

    const fetchRegistration = () => {
        setIsLoading(true);
        axios.get(`/data/payerregistrations/${registrationId}`)
            .then(({data}) => {
                setModel(data);
                setDetails(data.details || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching registration:", error);
                setErrorMessage("Failed to load registration");
                setIsLoading(false);
            });
    };

    const handleAddEmail = () => {
        setDetails([...details, {
            registrationValue: "",
            isValid: false,
            accept: false
        }]);
    };

    const handleRemoveEmail = (index) => {
        setDetails(details.filter((_, i) => i !== index));
    };

    const handleEmailChange = (index, value) => {
        const newDetails = [...details];
        newDetails[index].registrationValue = value;
        setDetails(newDetails);
    };

    const handleAcceptChange = (index, checked) => {
        const newDetails = [...details];
        newDetails[index].accept = checked;
        setDetails(newDetails);
    };

    const handleResendVerification = (detailId) => {
        axios.post(`/data/payerregistrations/${registrationId}/resend-verification/${detailId}`)
            .then(() => {
                alert("Verification email sent");
            })
            .catch(error => {
                setErrorMessage("Failed to resend verification email");
            });
    };

    const handleUpdate = () => {
        setIsSaving(true);
        setErrorMessage(null);

        axios.post(`/data/payerregistrations/${registrationId}/update`, {details})
            .then(() => {
                // Navigate to registrations list
                history.push(`/portal/customer/biller/${billerId}/registrations`);
            })
            .catch(error => {
                setErrorMessage(error.response?.data?.message || "Update failed");
                setIsSaving(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!model) {
        return <Alert variant="danger">Registration not found</Alert>;
    }

    const showNotDeregistered = model.status !== "deregistered" && model.status !== "failed";

    return (
        <div>
            <div className="text-center mb-4">
                {model.logoPath && <img src={model.logoPath} alt="Logo" style={{height: "100px"}}/>}
                <PageHeading>Register for Email Delivery</PageHeading>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Registered Emails</h4>
                </div>
                <div className="panel-body">
                    <Alert variant="info">
                        <h5>Only active emails that have been verified following the step in the verification email will receive bills.</h5>
                        <div className="row mt-2">
                            <div className="col-md-1">
                                <button type="button" className="btn btn-success" title="Email active">
                                    <span className="glyphicon glyphicon-ok-circle"></span>
                                </button>
                            </div>
                            <div className="col-md-11">
                                <h5>An active email registration</h5>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-1">
                                <button type="button" className="btn btn-warning" title="Email pending confirmation">
                                    <span className="glyphicon glyphicon-time"></span>
                                </button>
                            </div>
                            <div className="col-md-11">
                                <h5>An email address pending confirmation</h5>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-1">
                                <button type="button" className="btn btn-default" title="Resend confirmation email">
                                    <span className="glyphicon glyphicon-repeat"></span>
                                </button>
                            </div>
                            <div className="col-md-11">
                                <h5>Resend confirmation email to listed email address</h5>
                            </div>
                        </div>
                    </Alert>

                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    {details.map((detail, index) => (
                        <div key={index}>
                            {index > 0 && <hr/>}
                            <div className="form-group row">
                                <label className="col-md-3 control-label">Email</label>
                                <div className="col-md-6">
                                    {detail.id ? (
                                        <p className="form-control-static">
                                            <strong>{detail.registrationValue}</strong>
                                            {detail.isValid && <small> | Active from {getDateAsFormatted(detail.activatedTime)}</small>}
                                        </p>
                                    ) : (
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={detail.registrationValue}
                                            onChange={(e) => handleEmailChange(index, e.target.value)}
                                        />
                                    )}
                                </div>
                                <div className="col-md-1">
                                    {detail.isValid ? (
                                        <button type="button" className="btn btn-success" title="Email active">
                                            <span className="glyphicon glyphicon-ok-circle"></span>
                                        </button>
                                    ) : (
                                        <button type="button" className="btn btn-warning" title="Email pending confirmation">
                                            <span className="glyphicon glyphicon-time"></span>
                                        </button>
                                    )}
                                </div>
                                <div className="col-md-1">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        title="Delete email"
                                        onClick={() => handleRemoveEmail(index)}
                                        disabled={!showNotDeregistered}
                                    >
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </button>
                                </div>
                                <div className="col-md-1">
                                    {!detail.isValid && detail.id && showNotDeregistered && (
                                        <button
                                            type="button"
                                            className="btn btn-default"
                                            title="Resend email confirmation"
                                            onClick={() => handleResendVerification(detail.id)}
                                        >
                                            <span className="glyphicon glyphicon-repeat"></span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {!detail.id && (
                                <div className="form-group row">
                                    <label className="col-md-2 text-right">Confirm Address:</label>
                                    <div className="col-md-1 text-center">
                                        <Checkbox
                                            checked={detail.accept}
                                            onChange={(e) => handleAcceptChange(index, e.target.checked)}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <small className="text-muted">
                                            By confirming the email address you are allowing the owner of the email address to receive bills or statements
                                        </small>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {showNotDeregistered && (
                        <>
                            <div className="form-group text-center mt-3">
                                <Button variant="default" onClick={handleAddEmail}>
                                    <span className="glyphicon glyphicon-plus"></span> Add Email
                                </Button>
                            </div>

                            <div className="text-right">
                                <Button variant="primary" onClick={handleUpdate} disabled={isSaving}>
                                    Update
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default injectIntl(IncomingEmailRegistration);
