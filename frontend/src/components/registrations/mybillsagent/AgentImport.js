import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, Panel, Alert} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import Loading from "../../Loading";
import {MyBillsAgentImportModal} from "../../modals";

const AgentImport = ({billerId}) => {
    const history = useHistory();
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [registrations, setRegistrations] = useState([]);
    const [authorisedAgent, setAuthorisedAgent] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [hasImportedRegistrations, setHasImportedRegistrations] = useState(false);
    const [importResults, setImportResults] = useState(null);
    const [bulkRegCreated, setBulkRegCreated] = useState(false);
    const [authorisationName, setAuthorisationName] = useState("");
    const [showImportModal, setShowImportModal] = useState(false);

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
                // Initialize with one empty registration
                addRegistration(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching import data:", error);
                setIsLoading(false);
            });
    };

    const addRegistration = (currentModel = model) => {
        const regNo = registrations.length + 1;
        setRegistrations([...registrations, {
            id: regNo,
            regNo,
            accountNumber: "",
            authfield1: ""
        }]);
    };

    const removeRegistration = (registration) => {
        if (registrations.length === 1) {
            setErrorMessage("The selected registration cannot be deleted. At least one MyBills Agent registration is required.");
        } else {
            setRegistrations(registrations.filter(r => r.id !== registration.id));
            setErrorMessage(null);
        }
    };

    const updateRegistration = (id, field, value) => {
        setRegistrations(registrations.map(reg =>
            reg.id === id ? {...reg, [field]: value} : reg
        ));
    };

    const handleImportRegistrations = () => {
        if (!authorisedAgent) {
            setErrorMessage("Please select an agent.");
            return;
        }

        axios.post(`/data/payer/registrations/${authorisedAgent}/mailer/${billerId}/bulk/import/true`)
            .then(({data}) => {
                if (data.success) {
                    setHasImportedRegistrations(true);
                    setImportResults({
                        importedRegistrationCount: data.importedRegistrationCount || 0,
                        importedExistsCount: data.importedExistsCount || 0,
                        importedErrorCount: data.importedErrorCount || 0,
                        importedRegistrationsError: data.importedRegistrationsError || []
                    });
                }
            })
            .catch(error => {
                console.error("Error importing registrations:", error);
                setErrorMessage("An error occurred while importing registrations. Please try again.");
            });
    };

    const handleSaveRegistration = () => {
        const registrationData = {
            registrations: registrations.map(r => ({
                accountNumber: r.accountNumber,
                authfield1: r.authfield1
            }))
        };

        axios.post(`/data/payer/registrations/${billerId}/mailer/${billerId}/bulk`, registrationData)
            .then(({data}) => {
                if (data.success) {
                    setBulkRegCreated(true);
                    setAuthorisationName(model.authorisations.find(a => a.id === authorisedAgent)?.name || "");
                    setImportResults({
                        registrationsCreatedCount: data.registrationsCreated?.length || 0,
                        registrationsCreated: data.registrationsCreated || [],
                        registrationsExistingCount: data.registrationsExisting?.length || 0,
                        registrationsExisting: data.registrationsExisting || []
                    });
                } else {
                    setErrorMessage(data.error || "An error occurred while saving registrations.");
                }
            })
            .catch(error => {
                console.error("Error saving registrations:", error);
                setErrorMessage("An error occurred while saving registrations. Please try again.");
            });
    };

    const handleImportFromText = () => {
        history.push(`/customer/biller/${billerId}/registrations/import-from-text`);
    };

    const handleFileImportComplete = (data) => {
        setShowImportModal(false);
        if (data.success) {
            setHasImportedRegistrations(true);
            setImportResults({
                importedRegistrationCount: data.importedRegistrationCount || 0,
                importedExistsCount: data.importedExistsCount || 0,
                importedErrorCount: data.importedErrorCount || 0,
                importedRegistrationsError: data.importedRegistrationsError || []
            });
        }
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

    if (bulkRegCreated) {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h4>Imported Registrations for Authorised MyBills Agent</h4>
                </div>
                <div className="row actions-row">
                    <div className="actions btn-group col-sm-4">
                        <Link to={`/customer/biller/${billerId}/registrations/billers`} className="btn btn-default">
                            <span className="glyphicon glyphicon-arrow-left"></span> Back
                        </Link>
                    </div>
                </div>
                <div className="panel-body">
                    <Alert bsStyle="info" className="text-center">
                        <h3>MyBills Agent Registrations Successfully Loaded</h3>
                        <h5>MyBills registrations have been loaded for {authorisationName}.</h5>
                    </Alert>
                    {importResults?.registrationsCreatedCount > 0 && (
                        <Panel>
                            <Panel.Heading>
                                <h4 className="panel-title">New Registrations Loaded: {importResults.registrationsCreatedCount}</h4>
                            </Panel.Heading>
                            <Panel.Body>
                                {importResults.registrationsCreated.map((created, idx) => (
                                    <p key={idx}>
                                        <strong>{model.channel.registrationContactIdField}</strong>: {created.accountNumber}
                                        {model.channel.useAuthItem1 && (
                                            <>, <strong>{model.channel.authItem1Field}</strong>: {created.authfield1}</>
                                        )}
                                    </p>
                                ))}
                            </Panel.Body>
                        </Panel>
                    )}
                    {importResults?.registrationsExistingCount > 0 && (
                        <Panel>
                            <Panel.Heading>
                                <h4 className="panel-title">Registrations Already Active: {importResults.registrationsExistingCount}</h4>
                            </Panel.Heading>
                            <Panel.Body>
                                {importResults.registrationsExisting.map((existing, idx) => (
                                    <p key={idx}>
                                        <strong>{model.channel.registrationContactIdField}</strong>: {existing.accountNumber}
                                        {model.channel.useAuthItem1 && (
                                            <>, <strong>{model.channel.authItem1Field}</strong>: {existing.authfield1}</>
                                        )}
                                    </p>
                                ))}
                            </Panel.Body>
                        </Panel>
                    )}
                    <form className="form-login form-horizontal" role="form">
                        <div className="btn-toolbar margin-top-sm text-center">
                            <Link to={`/customer/biller/${billerId}/registrations/billers`} className="btn btn-default">
                                <span> Back to Registrations</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-xs-12">
                <h4>Imported Registrations for Authorised MyBills Agent</h4>
            </div>

            <div className="row actions-row">
                <div className="actions btn-group col-sm-4">
                    <Link to={`/customer/biller/${billerId}/registrations/billers`} className="btn btn-default">
                        <span className="glyphicon glyphicon-arrow-left"></span> Back
                    </Link>
                </div>
            </div>

            {hasImportedRegistrations && importResults && (
                <Alert bsStyle="info" style={{maxHeight: '150px', overflowY: 'scroll'}}>
                    <h4>Successful Payreq MyBills Agent Registration Import</h4>
                    New registrations: {importResults.importedRegistrationCount}
                    {importResults.importedRegistrationCount === 0 && " (There are no new MyBills Agent registrations to upload)"}
                    <br/>
                    Existing active registrations: {importResults.importedExistsCount}
                    <br/><br/>
                    {importResults.importedErrorCount > 0 && (
                        <>
                            {importResults.importedErrorCount} Payreq MyBills Agent registrations couldn't be imported successfully as both mandatory fields are not populated.
                            {importResults.importedRegistrationsError.map((error, idx) => (
                                <li key={idx}>
                                    <strong>{model.channel.registrationContactIdField}</strong>: "{error.accountNumber}",
                                    <strong>{model.channel.authItem1Field}</strong>: "{error.authfield1}"
                                </li>
                            ))}
                        </>
                    )}
                </Alert>
            )}

            <Alert bsStyle="warning">
                <p>Please select the Agent and then enter the MyBills Agent registrations for import.</p>
            </Alert>

            <div className="row">
                <div className="col-xs-2">
                    <label htmlFor="authorisation" className="control-label">Select Agent</label>
                </div>
                <div className="col-xs-10">
                    <FormControl
                        componentClass="select"
                        value={authorisedAgent || ""}
                        onChange={(e) => setAuthorisedAgent(e.target.value)}
                        disabled={hasImportedRegistrations}
                    >
                        <option value="">Select an agent</option>
                        {model.authorisations && model.authorisations.map(auth => (
                            <option key={auth.id} value={auth.id}>{auth.name}</option>
                        ))}
                    </FormControl>
                </div>
            </div>

            <hr/>

            <div className="row actions-row">
                <div className="actions btn-group col-xs-12 center-items">
                    <Button bsStyle="primary" onClick={handleImportRegistrations}>
                        <span className="glyphicon glyphicon-import"></span> Import Registrations
                    </Button>
                    <Button bsStyle="default" onClick={() => setShowImportModal(true)} style={{marginLeft: "10px"}}>
                        <span className="glyphicon glyphicon-upload"></span> Upload File
                    </Button>
                </div>
            </div>

            <div className="hr-text-black">
                <span>  OR  </span>
            </div>

            <div>
                <form className="form-login form" id="mybillsagent-form">
                    {errorMessage && (
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    )}

                    <Panel>
                        <Panel.Heading>
                            <h4 className="panel-title">Registrations</h4>
                        </Panel.Heading>
                        <Panel.Body>
                            <div className="row">
                                <div className="col-xs-1">
                                    <label htmlFor="registrationField" className="control-label">Reg. No.</label>
                                </div>
                                <div className="col-xs-4">
                                    <label htmlFor="registrationField" className="control-label">{model.channel.registrationContactIdField}</label>
                                </div>
                                {model.channel.authItem1Field && (
                                    <div className="col-xs-6">
                                        <label htmlFor="authfield1" className="control-label">{model.channel.authItem1Field}</label>
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-xs-1"></div>
                                <div className="col-xs-4">
                                    <small className="form-text text-muted">{model.channel.registrationContactIdHelp}</small>
                                </div>
                                {model.channel.authItem1Field && (
                                    <div className="col-xs-6">
                                        <small className="form-text text-muted">{model.channel.authItem1Help}</small>
                                    </div>
                                )}
                            </div>
                            {registrations.map((registration) => (
                                <div className="row" key={registration.id}>
                                    <div className="col-xs-1">
                                        <h5 className="form-control-static text-center">
                                            {registration.regNo}
                                        </h5>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="form-group">
                                            <FormControl
                                                type="text"
                                                value={registration.accountNumber}
                                                onChange={(e) => updateRegistration(registration.id, 'accountNumber', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {model.channel.authItem1Field && (
                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <FormControl
                                                    type="text"
                                                    value={registration.authfield1}
                                                    onChange={(e) => updateRegistration(registration.id, 'authfield1', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-md-1 col-sm-1 col-xs-1" style={{lineHeight: '28px'}}>
                                        <span className="label label-danger" style={{display: 'inline-block'}}>
                                            <a className="btn btn-xs" title="Delete Agent Registration" onClick={() => removeRegistration(registration)}>
                                                <span className="glyphicon glyphicon-remove"></span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group col-md-12">
                                <div className="actions btn-group col-md-4 col-md-offset-4" style={{paddingLeft: '5px'}}>
                                    <Button className="btn btn-default" style={{width: '100%'}} onClick={() => addRegistration()}>
                                        <span className="glyphicon glyphicon-plus"></span> Add Registration
                                    </Button>
                                </div>
                            </div>
                        </Panel.Body>
                    </Panel>

                    <Button bsStyle="success" onClick={handleSaveRegistration}>
                        <span className="glyphicon glyphicon-ok"></span> Import
                    </Button>
                </form>
            </div>
            
            <MyBillsAgentImportModal
                show={showImportModal}
                onClose={() => setShowImportModal(false)}
                onImportComplete={handleFileImportComplete}
                billerId={billerId}
                authorisedAgent={authorisedAgent}
            />
        </div>
    );
};

export default AgentImport;
