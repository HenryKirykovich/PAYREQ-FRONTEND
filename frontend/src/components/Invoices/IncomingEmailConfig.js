import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import {PageHeading, TextInput, Button, Alert} from "../common";
import Loading from "../Loading";

const IncomingEmailConfig = ({billerId, intl}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [prefix, setPrefix] = useState("");
    const [suffix, setSuffix] = useState("");
    const [fullEmail, setFullEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (billerId) {
            fetchIncomingEmail();
        }
    }, [billerId]);

    useEffect(() => {
        // Calculate full email whenever prefix or suffix changes
        const baseEmail = `@bills.payreq.com`;
        setFullEmail(`${prefix}${baseEmail}${suffix}`);
    }, [prefix, suffix]);

    const fetchIncomingEmail = () => {
        setIsLoading(true);
        axios.get(`/data/invoices/incomingEmail/${billerId}`)
            .then(({data}) => {
                setPrefix(data.incomingEmail?.prefix || "");
                setSuffix(data.incomingEmail?.suffix || "");
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching incoming email:", error);
                setErrorMessage("Failed to load incoming email configuration");
                setIsLoading(false);
            });
    };

    const handleUpdate = () => {
        setIsSaving(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        axios.post(`/data/invoices/incomingEmail/${billerId}`, {
            prefix,
            suffix
        })
            .then(() => {
                setSuccessMessage("Email configuration updated successfully");
                setIsSaving(false);
            })
            .catch(error => {
                setErrorMessage("Failed to update email configuration");
                setIsSaving(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div id="incoming-email">
            <PageHeading>Incoming Email Configuration</PageHeading>

            <div className="row actions-row mb-3">
                <div className="col-sm-3">
                    <Link to={`/portal/customer/biller/${billerId}/inbox`} className="btn btn-default">
                        <span className="glyphicon glyphicon-arrow-left"></span> Back to mails
                    </Link>
                </div>
            </div>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="row">
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <TextInput
                                label="Prefix (optional)"
                                value={prefix}
                                onChange={(e) => setPrefix(e.target.value)}
                            />

                            <TextInput
                                label="Suffix (optional)"
                                value={suffix}
                                onChange={(e) => setSuffix(e.target.value)}
                            />

                            <div className="form-group">
                                <label className="control-label">Full Email</label>
                                <p className="form-control-static">{fullEmail}</p>
                            </div>

                            <div className="text-right">
                                <Button variant="primary" onClick={handleUpdate} disabled={isSaving}>
                                    {isSaving ? "Updating..." : "Update email"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(IncomingEmailConfig);
