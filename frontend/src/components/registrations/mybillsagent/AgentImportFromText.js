import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {injectIntl} from "react-intl";
import Loading from "../../Loading";

const AgentImportFromText = ({billerId, intl}) => {
    const history = useHistory();
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [registrations, setRegistrations] = useState("");
    const [placeholder, setPlaceholder] = useState("");

    useEffect(() => {
        if (billerId) {
            fetchModel();
        }
    }, [billerId]);

    const fetchModel = () => {
        setIsLoading(true);
        axios.get(`/data/payer/registrations/${billerId}/mailer/${billerId}/channels/selfservice/mybillsagent`)
            .then(({data}) => {
                setModel(data);
                // Generate placeholder text
                const placeholderLines = [];
                if (data.channel.useAuthItem1) {
                    placeholderLines.push(`${data.channel.registrationContactIdField}    ${data.channel.authItem1Field}`);
                    placeholderLines.push("123456    AB1234");
                    placeholderLines.push("234567    CD5678");
                } else {
                    placeholderLines.push(data.channel.registrationContactIdField);
                    placeholderLines.push("123456");
                    placeholderLines.push("234567");
                }
                setPlaceholder(placeholderLines.join('\n'));
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching import data:", error);
                setIsLoading(false);
            });
    };

    const handleBack = () => {
        if (model.currentAuthorisation) {
            history.push(`/customer/biller/${billerId}/registrations/import`);
        } else {
            history.push(`/customer/biller/${billerId}/incoming/mybillsagent/${model.mailerId}`);
        }
    };

    const handleImportCopyPaste = () => {
        if (placeholder === registrations || !registrations.trim()) {
            alert(intl.formatMessage({id: "importText.noRegos"}) || "Please enter registrations to import.");
            return;
        }

        const isBillerLoadingRegistrations = billerId === model.currentMailer;
        const targetBillerId = isBillerLoadingRegistrations ? model.currentAuthorisation : billerId;

        axios.post(`/data/payer/registrations/${targetBillerId}/mailer/${model.currentMailer}/bulk/import/${isBillerLoadingRegistrations}`, {
            registrations: registrations
        })
            .then(({data}) => {
                if (data.success) {
                    // Redirect to appropriate success page
                    if (isBillerLoadingRegistrations) {
                        history.push(`/customer/biller/${billerId}/registrations/import`);
                    } else {
                        history.push(`/customer/biller/${billerId}/incoming/mybillsagent/${model.mailerId}`);
                    }
                } else {
                    alert(data.error || "An error occurred while importing registrations.");
                }
            })
            .catch(error => {
                console.error("Error importing registrations:", error);
                alert("An error occurred while importing registrations. Please try again.");
            });
    };

    const renderTextareaWithLineNumbers = () => {
        const lines = registrations.split('\n');
        const lineNumbers = lines.map((_, idx) => idx + 1).join('\n');

        return (
            <div style={{display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden'}}>
                <div style={{
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRight: '1px solid #ccc',
                    textAlign: 'right',
                    userSelect: 'none',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#999',
                    minWidth: '40px'
                }}>
                    {lineNumbers}
                </div>
                <textarea
                    className="form-control"
                    value={registrations}
                    onChange={(e) => setRegistrations(e.target.value)}
                    placeholder={placeholder}
                    rows={15}
                    style={{
                        border: 'none',
                        resize: 'vertical',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        flex: 1,
                        outline: 'none'
                    }}
                />
            </div>
        );
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!model) {
        return (
            <div className="alert alert-danger">
                Failed to load import data
            </div>
        );
    }

    return (
        <div className="row">
            <img style={{display: 'block', margin: '0 auto', height: '100px'}} src={model.logoPath} alt="Logo"/>
            <div className="col-md-12">
                <h4>{intl.formatMessage({id: "importText.heading"}) || "Import Registrations from Text"}</h4>
            </div>

            <div className="row actions-row">
                <div className="actions btn-group col-sm-4">
                    <Button className="btn btn-default" onClick={handleBack}>
                        <span className="glyphicon glyphicon-arrow-left"></span> {intl.formatMessage({id: "importText.backButton"}) || "Back"}
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 well" style={{marginLeft: '15px', marginRight: '15px'}}>
                    <p><strong>{intl.formatMessage({id: "importText.text"}) || "Enter your registrations below, one per line:"}</strong></p>
                    <strong>{intl.formatMessage({id: "importText.column1"}) || "Column 1:"}</strong> {model.channel.registrationContactIdField}
                    {model.channel.registrationContactIdHelp && `: ${model.channel.registrationContactIdHelp}`}

                    {model.channel.useAuthItem1 && (
                        <>
                            <br/>
                            <strong>{intl.formatMessage({id: "importText.column2"}) || "Column 2:"}</strong> {model.channel.authItem1Field}
                            {model.channel.authItem1Help && `: ${model.channel.authItem1Help}`}
                        </>
                    )}
                </div>
            </div>

            <div className="row">
                <form id="import-from-text">
                    <div className="col-md-12">
                        {renderTextareaWithLineNumbers()}
                    </div>
                    <div className="actions btn-group col-xs-12 center-items">
                        <Button bsStyle="primary" className="col-xs-2" onClick={handleImportCopyPaste}>
                            <span className="glyphicon glyphicon-import"></span> {intl.formatMessage({id: "importText.importButton"}) || "Import"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default injectIntl(AgentImportFromText);
