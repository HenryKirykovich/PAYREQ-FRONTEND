import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, Panel, Alert} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import Loading from "../Loading";
import moment from "moment";

const IncomingReckonRegistration = ({billerId}) => {
    const {mailerId} = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [model, setModel] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [registrationField, setRegistrationField] = useState("");
    const [authfield1, setAuthfield1] = useState("");
    const [authfield2, setAuthfield2] = useState("");
    const [authfield3, setAuthfield3] = useState("");
    const [authfield4, setAuthfield4] = useState("");
    const [channelref1, setChannelref1] = useState("");
    const [channelref2, setChannelref2] = useState("");
    const [channelref3, setChannelref3] = useState("");
    const [channelref4, setChannelref4] = useState("TOTAL");
    const [createSupplier, setCreateSupplier] = useState("incorrect");
    const [terms, setTerms] = useState("");
    const [reckonCountry, setReckonCountry] = useState("Australia");
    const [reckonCountryFile, setReckonCountryFile] = useState("");
    const [reckonAPIUsername, setReckonAPIUsername] = useState("");
    const [reckonAPIPassword, setReckonAPIPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [suppliersLoading, setSuppliersLoading] = useState(false);

    const amountTotalOrMinimum = [
        {id: "TOTAL", name: "Total Amount"},
        {id: "MINIMUM", name: "Minimum Amount/Installment Amount"}
    ];

    const reckonCountries = [
        {id: "Australia", name: "Australia"},
        {id: "New Zealand", name: "New Zealand"}
    ];

    useEffect(() => {
        if (billerId && mailerId) {
            fetchRegistration();
        }
    }, [billerId, mailerId]);

    const fetchRegistration = () => {
        setIsLoading(true);
        axios.get(`/data/payer/registrations/${billerId}/mailer/${mailerId}/channels/selfservice/reckon`)
            .then(({data}) => {
                setModel(data);
                setRegistrationField(data.previousFields?.registrationField || "");
                setAuthfield1(data.previousFields?.authField1 || "");
                setAuthfield2(data.previousFields?.authField2 || "");
                setAuthfield3(data.previousFields?.authField3 || "");
                setAuthfield4(data.previousFields?.authField4 || "");
                setChannelref1(data.previousFields?.channelRef1 || "");
                setChannelref2(data.previousFields?.channelRef2 || "");
                setChannelref3(data.previousFields?.channelRef3 || "");
                setChannelref4(data.previousFields?.channelRef4 || "TOTAL");
                if (data.connection) {
                    setReckonCountry(data.connection.extraInfo2 || "Australia");
                }
                if (data.reckonterms && data.reckonterms.length > 0) {
                    setTerms(data.reckonterms[0].id);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching registration:", error);
                setErrorMessage("Failed to load registration");
                setIsLoading(false);
            });
    };

    const handleConnectToReckon = () => {
        axios.get(`/data/settings/reckon/${billerId}/connecttoreckon/${mailerId}/registration`, {
            params: {
                reckonCountry: reckonCountry,
                reckonCompanyFile: reckonCountryFile,
                reckonApiUsername: reckonAPIUsername,
                reckonApiPassword: reckonAPIPassword
            }
        })
            .then(({data}) => {
                window.top.location.href = data.requesttoken.uri;
            })
            .catch(error => {
                console.error("Error connecting to Reckon:", error);
                setErrorMessage("Failed to connect to Reckon");
            });
    };

    const validateRegistration = () => {
        setErrorMessage(null);
        let isValid = true;
        const maxLengthErrorMsg = "This field must be less than 256 characters";

        if (!accept) {
            isValid = false;
            setErrorMessage("Please accept terms and conditions");
            return isValid;
        }

        if (!registrationField || registrationField.trim() === "") {
            isValid = false;
            setErrorMessage("Please enter value for " + (model?.channel?.registrationContactIdField || "registration field"));
            return isValid;
        }

        if (registrationField.length > 255) {
            isValid = false;
            setErrorMessage(maxLengthErrorMsg);
            return isValid;
        }

        if (model?.channel?.useAuthItem1 && (!authfield1 || authfield1.trim() === "")) {
            isValid = false;
            setErrorMessage("Please enter value for " + (model?.channel?.authItem1Field || "auth field 1"));
            return isValid;
        }

        if (model?.channel?.useAuthItem2 && (!authfield2 || authfield2.trim() === "")) {
            isValid = false;
            setErrorMessage("Please enter value for " + (model?.channel?.authItem2Field || "auth field 2"));
            return isValid;
        }

        if (model?.channel?.useAuthItem3 && (!authfield3 || authfield3.trim() === "")) {
            isValid = false;
            setErrorMessage("Please enter value for " + (model?.channel?.authItem3Field || "auth field 3"));
            return isValid;
        }

        if (model?.channel?.useAuthItem4 && (!authfield4 || authfield4.trim() === "")) {
            isValid = false;
            setErrorMessage("Please enter value for " + (model?.channel?.authItem4Field || "auth field 4"));
            return isValid;
        }

        return isValid;
    };

    const handleSaveRegistration = () => {
        if (!validateRegistration()) {
            return;
        }

        setDisableSubmit(true);
        const registrationData = {
            registrationfield: registrationField,
            authfieldone: authfield1,
            authfieldtwo: authfield2,
            authfieldthree: authfield3,
            authfieldfour: authfield4,
            channelrefone: channelref1,
            channelreftwo: channelref2,
            channelrefthree: channelref3,
            channelreffour: channelref4,
            accept: accept
        };

        axios.post(`/data/payer/registrations/${billerId}/mailer/${mailerId}/channels/selfservice/reckon`, registrationData)
            .then(({data}) => {
                if (data.success) {
                    history.push(`/customer/biller/${billerId}/incoming/registration/${data.registration.id}`);
                    alert("Reckon Registration Created.");
                } else {
                    setErrorMessage(data.errorMessage || data.errorMessageTwo || "We are unable to save your registration. Please try again later.");
                    setDisableSubmit(false);
                }
            })
            .catch(error => {
                console.error("Error saving registration:", error);
                setErrorMessage(error.response?.data?.errorMessage || "We are unable to save your registration. Please try again later.");
                setDisableSubmit(false);
            });
    };

    const handleCreateSupplier = () => {
        setDisableSubmit(true);
        axios.post(`/data/payer/registrations/${billerId}/mailer/${mailerId}/reckon/supplier/create`, {supplierterms: terms})
            .then(({data}) => {
                if (data.success) {
                    alert("Reckon Supplier Created.");
                    setCreateSupplier("incorrect");
                    handleRefreshSuppliers();
                } else {
                    setErrorMessage("We are unable to save your new supplier in Reckon. Please try again later.");
                    setDisableSubmit(false);
                }
            })
            .catch(error => {
                console.error("Error creating supplier:", error);
                setErrorMessage("We are unable to save your new supplier in Reckon. Please try again later.");
                setDisableSubmit(false);
            });
    };

    const handleRefreshSuppliers = () => {
        setSuppliersLoading(true);
        axios.get(`/data/payer/registrations/${billerId}/mailer/${mailerId}/reckon/suppliers`)
            .then(({data}) => {
                if (data.success) {
                    setModel({...model, reckonvendors: data.reckonvendors});
                }
                setSuppliersLoading(false);
            })
            .catch(error => {
                console.error("Error refreshing suppliers:", error);
                setSuppliersLoading(false);
            });
    };

    useEffect(() => {
        if (channelref1 && model && billerId) {
            setModel({...model, supplier: {...model.supplier, terms: "Loading..."}});
            axios.get(`/data/payer/registrations/${billerId}/mailer/${mailerId}/reckon/supplier/${channelref1}`)
                .then(({data}) => {
                    if (data.success) {
                        setModel({...model, supplier: {...model.supplier, terms: data.terms}});
                    } else {
                        setModel({...model, supplier: {...model.supplier, terms: "Unable to find Supplier"}});
                    }
                })
                .catch(error => {
                    console.error("Error fetching supplier terms:", error);
                    setModel({...model, supplier: {...model.supplier, terms: "Unable to find Supplier"}});
                });
        }
    }, [channelref1]);

    if (isLoading) {
        return <Loading/>;
    }

    if (!model) {
        return (
            <div className="alert alert-danger">
                Failed to load registration data
            </div>
        );
    }

    const hasReckonConnection = !!model.connection;
    const hasReckonSuppliers = model.reckonvendors && model.reckonvendors.length > 0;
    const hasReckonAccounts = model.reckonaccounts && model.reckonaccounts.length > 0;
    const hasReckonTaxCodes = model.reckontaxcodes && model.reckontaxcodes.length > 0;
    const hasAuthField1 = model.channel?.authItem1Field && model.channel?.useAuthItem1;
    const hasAuthField2 = model.channel?.authItem2Field && model.channel?.useAuthItem2;
    const hasAuthField3 = model.channel?.authItem3Field && model.channel?.useAuthItem3;
    const hasAuthField4 = model.channel?.authItem4Field && model.channel?.useAuthItem4;
    const disableCreateConnection = !reckonCountryFile || !reckonAPIUsername || !reckonAPIPassword;

    return (
        <div className="row">
            <img style={{display: 'block', margin: '0 auto', height: '100px'}} src={model.logoPath} alt="Logo"/>
            <div className="col-xs-12">
                <h4>Register for Reckon</h4>
            </div>

            <div>
                <form className="form-login form" id="reckon-form">
                    {errorMessage && (
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    )}

                    {hasReckonConnection ? (
                        <>
                            {model.connection.connectionError ? (
                                <Alert bsStyle="danger">
                                    <h4 className="control-label">Unable to connect to Reckon. Please try registering again later.</h4>
                                    <p>Company: {model.connection.company}</p>
                                    <p>Connected since: {moment(model.connection.connectedDate).format("DD MMMM YYYY H:mm")}</p>
                                </Alert>
                            ) : (
                                <Alert bsStyle="success">
                                    <h4 className="control-label">Connected to Reckon:</h4>
                                    <p>Company: {model.connection.company}</p>
                                    <p>Connected since: {moment(model.connection.connectedDate).format("DD MMMM YYYY H:mm")}</p>
                                </Alert>
                            )}

                            <Panel>
                                <Panel.Heading>
                                    <h4>Registration Verification</h4>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="form-group">
                                        <label htmlFor="registrationField" className="control-label">
                                            {model.channel?.registrationContactIdField}
                                        </label>
                                        <FormControl
                                            id="registrationField"
                                            type="text"
                                            value={registrationField}
                                            onChange={(e) => setRegistrationField(e.target.value)}
                                        />
                                        <small className="form-text text-muted">{model.channel?.registrationContactIdHelp}</small>
                                    </div>

                                    {hasAuthField1 && (
                                        <div className="form-group">
                                            <label htmlFor="authfield1" className="control-label">
                                                {model.channel.authItem1Field}
                                            </label>
                                            <FormControl
                                                id="authfield1"
                                                type="text"
                                                value={authfield1}
                                                onChange={(e) => setAuthfield1(e.target.value)}
                                            />
                                            <small className="form-text text-muted">{model.channel.authItem1Help}</small>
                                        </div>
                                    )}

                                    {hasAuthField2 && (
                                        <div className="form-group">
                                            <label htmlFor="authfield2" className="control-label">
                                                {model.channel.authItem2Field}
                                            </label>
                                            <FormControl
                                                id="authfield2"
                                                type="text"
                                                value={authfield2}
                                                onChange={(e) => setAuthfield2(e.target.value)}
                                            />
                                            <small className="form-text text-muted">{model.channel.authItem2Help}</small>
                                        </div>
                                    )}

                                    {hasAuthField3 && (
                                        <div className="form-group">
                                            <label htmlFor="authfield3" className="control-label">
                                                {model.channel.authItem3Field}
                                            </label>
                                            <FormControl
                                                id="authfield3"
                                                type="text"
                                                value={authfield3}
                                                onChange={(e) => setAuthfield3(e.target.value)}
                                            />
                                            <small className="form-text text-muted">{model.channel.authItem3Help}</small>
                                        </div>
                                    )}

                                    {hasAuthField4 && (
                                        <div className="form-group">
                                            <label htmlFor="authfield4" className="control-label">
                                                {model.channel.authItem4Field}
                                            </label>
                                            <FormControl
                                                id="authfield4"
                                                type="text"
                                                value={authfield4}
                                                onChange={(e) => setAuthfield4(e.target.value)}
                                            />
                                            <small className="form-text text-muted">{model.channel.authItem4Help}</small>
                                        </div>
                                    )}
                                </Panel.Body>
                            </Panel>

                            <Panel>
                                <Panel.Heading>
                                    <h4>Reckon Invoice Fields</h4>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Would you like us to create a Supplier in Reckon for you?
                                        </label>
                                        <div className="btn-group radio-group">
                                            <label className={`btn btn-default ${createSupplier === 'correct' ? 'active' : ''}`}>
                                                <span className="glyphicon glyphicon-ok"></span>
                                                <input
                                                    type="radio"
                                                    name="createSupplier"
                                                    value="correct"
                                                    checked={createSupplier === 'correct'}
                                                    onChange={(e) => setCreateSupplier(e.target.value)}
                                                />
                                                Yes
                                            </label>
                                            <label className={`btn btn-default ${createSupplier === 'incorrect' ? 'active' : ''}`}>
                                                <span className="glyphicon glyphicon-remove"></span>
                                                <input
                                                    type="radio"
                                                    name="createSupplier"
                                                    value="incorrect"
                                                    checked={createSupplier === 'incorrect'}
                                                    onChange={(e) => setCreateSupplier(e.target.value)}
                                                />
                                                No
                                            </label>
                                        </div>
                                    </div>

                                    {createSupplier === 'incorrect' ? (
                                        <>
                                            {suppliersLoading ? (
                                                <div className="form-group">
                                                    <label className="control-label">Supplier</label>
                                                    <p>Reloading Suppliers from Reckon...</p>
                                                </div>
                                            ) : (
                                                <div className="form-group">
                                                    <label className="control-label">Supplier</label>
                                                    {hasReckonSuppliers ? (
                                                        <FormControl
                                                            componentClass="select"
                                                            value={channelref1}
                                                            onChange={(e) => setChannelref1(e.target.value)}
                                                        >
                                                            <option value="">Select a supplier</option>
                                                            {model.reckonvendors.map(vendor => (
                                                                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                                                            ))}
                                                        </FormControl>
                                                    ) : (
                                                        <p>Unable to access Reckon suppliers</p>
                                                    )}
                                                </div>
                                            )}

                                            <div className="form-group">
                                                <label className="control-label">Supplier Terms</label>
                                                <p className="form-control-static">{model.supplier?.terms || ""}</p>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">Supplier Tax Code</label>
                                                {hasReckonTaxCodes ? (
                                                    <FormControl
                                                        componentClass="select"
                                                        value={channelref3}
                                                        onChange={(e) => setChannelref3(e.target.value)}
                                                    >
                                                        <option value="">Select a tax code</option>
                                                        {model.reckontaxcodes.map(code => (
                                                            <option key={code.id} value={code.id}>{code.name}</option>
                                                        ))}
                                                    </FormControl>
                                                ) : (
                                                    <p>Unable to access Reckon tax codes</p>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">Default Reckon Account Code</label>
                                                {hasReckonAccounts ? (
                                                    <FormControl
                                                        componentClass="select"
                                                        value={channelref2}
                                                        onChange={(e) => setChannelref2(e.target.value)}
                                                    >
                                                        <option value="">Select an account code</option>
                                                        {model.reckonaccounts.map(account => (
                                                            <option key={account.id} value={account.id}>{account.name}</option>
                                                        ))}
                                                    </FormControl>
                                                ) : (
                                                    <p>Unable to access Reckon account codes</p>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">Amount Payable Total or Minimum/Installment</label>
                                                <FormControl
                                                    componentClass="select"
                                                    value={channelref4}
                                                    onChange={(e) => setChannelref4(e.target.value)}
                                                >
                                                    {amountTotalOrMinimum.map(option => (
                                                        <option key={option.id} value={option.id}>{option.name}</option>
                                                    ))}
                                                </FormControl>
                                            </div>

                                            <div className="form-group">
                                                <Alert bsStyle="warning">
                                                    By registering to receive this bill or statement electronically through Reckon, I state that I am entitled to receive the bill or statement from the biller and a paper invoice may no longer be mailed.
                                                    <div>
                                                        <label htmlFor="accept" className="control-label">Accept Terms and Conditions: </label>
                                                        <input
                                                            type="checkbox"
                                                            id="accept"
                                                            checked={accept}
                                                            onChange={(e) => setAccept(e.target.checked)}
                                                        />
                                                    </div>
                                                </Alert>
                                            </div>

                                            <Button
                                                bsStyle="success"
                                                disabled={disableSubmit || model.connection.connectionError}
                                                onClick={handleSaveRegistration}
                                            >
                                                <span className="glyphicon glyphicon-ok"></span> Register
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group">
                                                <label className="control-label">Supplier Name</label>
                                                <p>{model.channel?.extBillerName}</p>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">Select Supplier Terms</label>
                                                {hasReckonSuppliers ? (
                                                    <FormControl
                                                        componentClass="select"
                                                        value={terms}
                                                        onChange={(e) => setTerms(e.target.value)}
                                                    >
                                                        <option value="">Select terms</option>
                                                        {model.reckonterms.map(term => (
                                                            <option key={term.id} value={term.id}>{term.name}</option>
                                                        ))}
                                                    </FormControl>
                                                ) : (
                                                    <p>Unable to access Reckon Terms</p>
                                                )}
                                            </div>

                                            <Button
                                                bsStyle="success"
                                                disabled={disableSubmit}
                                                onClick={handleCreateSupplier}
                                            >
                                                <span className="glyphicon glyphicon-ok"></span> Create Supplier in Reckon
                                            </Button>
                                        </>
                                    )}
                                </Panel.Body>
                            </Panel>
                        </>
                    ) : (
                        <>
                            <Alert bsStyle="info">
                                <h4>Payreq Reckon Accounts Hosted Usage</h4>
                                <p>The only information accessed by Payreq from your Reckon Hosted account is:</p>
                                <ol>
                                    <li>Your general ledger account codes to allow you select an account code for your invoice. Only the ID of the account code selected is stored in Payreq.</li>
                                    <li>Your suppliers to allow you to select a supplier for your invoice. Only the ID of the account code selected is stored in Payreq.</li>
                                    <li>Your tax codes to allow you to select a sale tax code for your invoice. Only the ID of the tax code selected is stored in Payreq.</li>
                                </ol>
                                <p>No other information from Reckon is accessed by Payreq, registered billers or any other third party.</p>
                                <p>Payreq will use your Reckon connection to push biller invoices into your Reckon accounts payable.</p>
                            </Alert>

                            <form className="form-login form" id="reckon-connect-form">
                                <div className="form-group">
                                    <label className="control-label">Reckon Product Country</label>
                                    <FormControl
                                        componentClass="select"
                                        value={reckonCountry}
                                        onChange={(e) => setReckonCountry(e.target.value)}
                                    >
                                        {reckonCountries.map(country => (
                                            <option key={country.id} value={country.id}>{country.name}</option>
                                        ))}
                                    </FormControl>
                                </div>

                                <Alert bsStyle="warning">
                                    <p>For a company file that <strong>is not</strong> shared with other users Q:\File name.QBW E.g. Q:\API2019.QBW</p>
                                    <p>For a company file that <strong>is</strong> shared with other users \\Shared-Folder-Name\FileName.QBW or \\\\Shared-Folder-Name\\FileName.QBW or \\FS-Path\Full-Shared-Folder-Name\File name.QBW or \\\\FS-Path\\Full-Shared-Folder-Name\\File name.QBW E.g. \\\\api2019\\API2019.QBW or \\\\RAH-FSS-07-AP2A\\067185-1574783-API2019\\API2019.QBW.</p>
                                    <p>Click <a href="http://support.payreq.com/payer_reckon_faqs.html" target="_blank" rel="noopener noreferrer">here</a> for more information on finding your company file path.</p>
                                </Alert>

                                <div className="form-group">
                                    <label className="control-label">Reckon Company File</label>
                                    <FormControl
                                        type="text"
                                        value={reckonCountryFile}
                                        onChange={(e) => setReckonCountryFile(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Reckon Accounts Hosted Company File Username</label>
                                    <FormControl
                                        type="text"
                                        value={reckonAPIUsername}
                                        onChange={(e) => setReckonAPIUsername(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Reckon Accounts Hosted Company File Password</label>
                                    <FormControl
                                        type="password"
                                        value={reckonAPIPassword}
                                        onChange={(e) => setReckonAPIPassword(e.target.value)}
                                    />
                                </div>

                                <img
                                    style={{display: 'block', margin: '0 auto', cursor: disableCreateConnection ? 'not-allowed' : 'pointer', opacity: disableCreateConnection ? 0.5 : 1}}
                                    src="./images/reckon-connect-button.png"
                                    alt="Connect to Reckon"
                                    onClick={disableCreateConnection ? null : handleConnectToReckon}
                                />
                            </form>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default IncomingReckonRegistration;
