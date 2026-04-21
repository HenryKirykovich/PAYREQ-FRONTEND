import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, Alert} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import Loading from "../Loading";

const IncomingEmailRegistration = ({billerId}) => {
    const {mailerId} = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [prefix, setPrefix] = useState("");
    const [suffix, setSuffix] = useState("");
    const [fullEmail, setFullEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (billerId && mailerId) {
            fetchEmailConfig();
        }
    }, [billerId, mailerId]);

    useEffect(() => {
        // Calculate full email when prefix or suffix changes
        if (prefix || suffix) {
            setFullEmail(`${prefix}@payreq.com${suffix}`);
        } else {
            setFullEmail("@payreq.com");
        }
    }, [prefix, suffix]);

    const fetchEmailConfig = () => {
        setIsLoading(true);
        // Note: The Ember template didn't show a specific API call for this screen
        // It appears to be a simple configuration screen
        // You may need to add the appropriate API endpoint
        setIsLoading(false);
    };

    const handleUpdateEmail = () => {
        setIsLoading(true);
        setErrorMessage(null);

        const updateData = {
            prefix: prefix,
            suffix: suffix
        };

        // Note: You'll need to replace this with the actual API endpoint
        axios.post(`/data/payer/registrations/${billerId}/mailer/${mailerId}/email/config`, updateData)
            .then(({data}) => {
                if (data.success) {
                    alert("Email configuration updated successfully");
                    setIsLoading(false);
                } else {
                    setErrorMessage(data.error || "Failed to update email configuration");
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Error updating email:", error);
                setErrorMessage("Failed to update email configuration. Please try again later.");
                setIsLoading(false);
            });
    };

    const handleBack = () => {
        history.push(`/customer/biller/${billerId}/invoices`);
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div id="incoming-email">
            <div className="row">
                <div className="col-md-12">
                    <h4>Incoming Email Configuration</h4>
                </div>
            </div>

            <div className="row actions-row" role="toolbar">
                <div className="actions btn-group col-sm-3">
                    <Button onClick={handleBack}>
                        <span className="glyphicon glyphicon-arrow-left"></span> Back to mails
                    </Button>
                </div>
            </div>

            {errorMessage && (
                <Alert bsStyle="danger">
                    {errorMessage}
                </Alert>
            )}

            <form className="form-horizontal" role="form">
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Prefix (optional)</label>
                                    <div className="col-md-9">
                                        <FormControl
                                            type="text"
                                            value={prefix}
                                            onChange={(e) => setPrefix(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Suffix (optional)</label>
                                    <div className="col-md-9">
                                        <FormControl
                                            type="text"
                                            value={suffix}
                                            onChange={(e) => setSuffix(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Full Email</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{fullEmail}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-9 pull-right">
                                        <Button bsStyle="primary" onClick={handleUpdateEmail}>
                                            Update email
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default IncomingEmailRegistration;
