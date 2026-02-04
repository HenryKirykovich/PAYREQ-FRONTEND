import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {PageHeading, TextInput, Select, Checkbox, Button, Alert} from "../common";
import Loading from "../Loading";
import {getDateAsFormatted} from "../../utils/date-utils";

const IncomingReckonRegistration = ({billerId, registrationId, intl}) => {
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
    const [channelref4, setChannelref4] = useState("");
    const [terms, setTerms] = useState("");
    const [reckonCountry, setReckonCountry] = useState("AU");
    const [reckonCountryFile, setReckonCountryFile] = useState("");
    const [reckonAPIUsername, setReckonAPIUsername] = useState("");
    const [reckonAPIPassword, setReckonAPIPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [createNewSupplier, setCreateNewSupplier] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const amountTotalOrMinimum = [
        {id: "false", name: "Total amount payable"},
        {id: "true", name: "Minimum amount / Installment"}
    ];

    const reckonCountries = [
        {id: "AU", name: "Australia"},
        {id: "NZ", name: "New Zealand"}
    ];

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
                setChannelref1(data.channelRef1 || "");
                setChannelref2(data.channelRef2 || "");
                setChannelref3(data.channelRef3 || "");
                setChannelref4(data.channelRef4 || "false");
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching registration:", error);
                setErrorMessage("Failed to load registration");
                setIsLoading(false);
            });
    };

    const handleConnectToReckon = () => {
        if (!reckonCountryFile || !reckonAPIUsername || !reckonAPIPassword) {
            setErrorMessage("Please fill in all Reckon connection fields");
            return;
        }

        setIsSaving(true);
        axios.post(`/auth/reckon/connect`, {
            billerId,
            country: reckonCountry,
            companyFile: reckonCountryFile,
            username: reckonAPIUsername,
            password: reckonAPIPassword
        })
            .then(() => {
                fetchRegistration();
            })
            .catch(error => {
                setErrorMessage(error.response?.data?.message || "Failed to connect to Reckon");
                setIsSaving(false);
            });
    };

    const handleCreateSupplier = () => {
        setIsSaving(true);
        axios.post(`/data/payerregistrations/${registrationId}/create-supplier`, {terms})
            .then(() => {
                fetchRegistration();
                setCreateNewSupplier(false);
            })
            .catch(error => {
                setErrorMessage(error.response?.data?.message || "Failed to create supplier");
                setIsSaving(false);
            });
    };

    const handleSaveRegistration = () => {
        if (!accept) {
            setErrorMessage("You must accept the terms and conditions");
            return;
        }

        setIsSaving(true);
        setErrorMessage(null);

        const registrationData = {
            registrationId,
            registrationField,
            authItem1: authfield1,
            authItem2: authfield2,
            authItem3: authfield3,
            authItem4: authfield4,
            channelRef1: channelref1,
            channelRef2: channelref2,
            channelRef3: channelref3,
            channelRef4: channelref4
        };

        axios.post(`/data/payerregistrations/${registrationId}/register`, registrationData)
            .then(({data}) => {
                // Navigate to registrations list
                history.push(`/portal/customer/biller/${billerId}/registrations`);
            })
            .catch(error => {
                setErrorMessage(error.response?.data?.message || "Registration failed");
                setIsSaving(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!model) {
        return <Alert variant="danger">Registration not found</Alert>;
    }

    const hasReckonConnection = model.connection && model.connection.id;
    const hasConnectionError = model.connection?.connectionError;
    const hasReckonSuppliers = model.reckonvendors && model.reckonvendors.length > 0;
    const hasReckonAccounts = model.reckonaccounts && model.reckonaccounts.length > 0;
    const hasReckonTaxCodes = model.reckontaxcodes && model.reckontaxcodes.length > 0;

    return (
        <div>
            <div className="text-center mb-4">
                {model.logoPath && <img src={model.logoPath} alt="Logo" style={{height: "100px"}}/>}
                <PageHeading>Register for Reckon</PageHeading>
            </div>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {!hasReckonConnection ? (
                <>
                    <Alert variant="info">
                        <h5>Payreq Reckon Accounts Hosted Usage</h5>
                        <p>The only information accessed by Payreq from your Reckon Hosted account is:</p>
                        <ol>
                            <li>Your general ledger account codes to allow you select an account code for your invoice. Only the ID of the account code selected is stored in Payreq.</li>
                            <li>Your suppliers to allow you to select a supplier for your invoice. Only the ID of the account code selected is stored in Payreq.</li>
                            <li>Your tax codes to allow you to select a sale tax code for your invoice. Only the ID of the tax code selected is stored in Payreq.</li>
                        </ol>
                        <p>No other information from Reckon is accessed by Payreq, registered billers or any other third party.</p>
                        <p>Payreq will use your Reckon connection to push biller invoices into your Reckon accounts payable.</p>
                    </Alert>

                    <div className="form-group">
                        <label>Reckon Product Country</label>
                        <Select
                            value={reckonCountry}
                            onChange={(e) => setReckonCountry(e.target.value)}
                            options={reckonCountries}
                        />
                    </div>

                    <Alert variant="warning">
                        <p>For a company file that <strong>is not</strong> shared with other users Q:\File name.QBW E.g. Q:\API2019.QBW</p>
                        <p>For a company file that <strong>is</strong> shared with other users \\Shared-Folder-Name\FileName.QBW or \\\\Shared-Folder-Name\\FileName.QBW</p>
                    </Alert>

                    <TextInput
                        label="Reckon Company File"
                        value={reckonCountryFile}
                        onChange={(e) => setReckonCountryFile(e.target.value)}
                    />

                    <TextInput
                        label="Reckon Accounts Hosted Company File Username"
                        value={reckonAPIUsername}
                        onChange={(e) => setReckonAPIUsername(e.target.value)}
                    />

                    <TextInput
                        label="Reckon Accounts Hosted Company File Password"
                        type="password"
                        value={reckonAPIPassword}
                        onChange={(e) => setReckonAPIPassword(e.target.value)}
                    />

                    <div className="text-center">
                        <Button variant="primary" onClick={handleConnectToReckon} disabled={isSaving}>
                            Connect to Reckon
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    {hasConnectionError ? (
                        <Alert variant="danger">
                            <h5>Unable to connect to Reckon. Please try registering again later.</h5>
                            <p>Company: {model.connection.company}</p>
                            <p>Connected since: {getDateAsFormatted(model.connection.connectedDate)}</p>
                        </Alert>
                    ) : (
                        <Alert variant="success">
                            <h5>Connected to Reckon:</h5>
                            <p>Company: {model.connection.company}</p>
                            <p>Connected since: {getDateAsFormatted(model.connection.connectedDate)}</p>
                        </Alert>
                    )}

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">Registration Verification</h4>
                        </div>
                        <div className="panel-body">
                            <TextInput
                                label={model.channel?.registrationContactIdField || "Registration Field"}
                                value={registrationField}
                                onChange={(e) => setRegistrationField(e.target.value)}
                                help={model.channel?.registrationContactIdHelp}
                            />

                            {model.channel?.useAuthItem1 && (
                                <TextInput
                                    label={model.channel.authItem1Field}
                                    value={authfield1}
                                    onChange={(e) => setAuthfield1(e.target.value)}
                                    help={model.channel.authItem1Help}
                                />
                            )}

                            {model.channel?.useAuthItem2 && (
                                <TextInput
                                    label={model.channel.authItem2Field}
                                    value={authfield2}
                                    onChange={(e) => setAuthfield2(e.target.value)}
                                    help={model.channel.authItem2Help}
                                />
                            )}

                            {model.channel?.useAuthItem3 && (
                                <TextInput
                                    label={model.channel.authItem3Field}
                                    value={authfield3}
                                    onChange={(e) => setAuthfield3(e.target.value)}
                                    help={model.channel.authItem3Help}
                                />
                            )}

                            {model.channel?.useAuthItem4 && (
                                <TextInput
                                    label={model.channel.authItem4Field}
                                    value={authfield4}
                                    onChange={(e) => setAuthfield4(e.target.value)}
                                    help={model.channel.authItem4Help}
                                />
                            )}
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">Reckon Invoice Fields</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>Would you like us to create a Supplier in Reckon for you?</label>
                                <div className="btn-group">
                                    <button
                                        className={`btn btn-default ${createNewSupplier ? 'active' : ''}`}
                                        onClick={() => setCreateNewSupplier(true)}
                                    >
                                        <span className="glyphicon glyphicon-ok"></span> Yes
                                    </button>
                                    <button
                                        className={`btn btn-default ${!createNewSupplier ? 'active' : ''}`}
                                        onClick={() => setCreateNewSupplier(false)}
                                    >
                                        <span className="glyphicon glyphicon-remove"></span> No
                                    </button>
                                </div>
                            </div>

                            {createNewSupplier ? (
                                <>
                                    <div className="form-group">
                                        <label>Supplier Name</label>
                                        <p>{model.channel?.extBillerName}</p>
                                    </div>

                                    <div className="form-group">
                                        <label>Select Supplier Terms</label>
                                        {hasReckonSuppliers ? (
                                            <Select
                                                value={terms}
                                                onChange={(e) => setTerms(e.target.value)}
                                                options={model.reckonterms || []}
                                            />
                                        ) : (
                                            <p>Unable to access Reckon Terms</p>
                                        )}
                                    </div>

                                    <Button variant="success" onClick={handleCreateSupplier} disabled={isSaving}>
                                        <span className="glyphicon glyphicon-ok"></span> Create Supplier in Reckon
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>Supplier</label>
                                        {hasReckonSuppliers ? (
                                            <Select
                                                value={channelref1}
                                                onChange={(e) => setChannelref1(e.target.value)}
                                                options={model.reckonvendors}
                                            />
                                        ) : (
                                            <p>Unable to access Reckon suppliers</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Supplier Tax Code</label>
                                        {hasReckonTaxCodes ? (
                                            <Select
                                                value={channelref3}
                                                onChange={(e) => setChannelref3(e.target.value)}
                                                options={model.reckontaxcodes}
                                            />
                                        ) : (
                                            <p>Unable to access Reckon tax codes</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Default Reckon Account Code</label>
                                        {hasReckonAccounts ? (
                                            <Select
                                                value={channelref2}
                                                onChange={(e) => setChannelref2(e.target.value)}
                                                options={model.reckonaccounts}
                                            />
                                        ) : (
                                            <p>Unable to access Reckon account codes</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Amount Payable Total or Minimum/Installment</label>
                                        <Select
                                            value={channelref4}
                                            onChange={(e) => setChannelref4(e.target.value)}
                                            options={amountTotalOrMinimum}
                                        />
                                    </div>

                                    <Alert variant="warning">
                                        By registering to receive this bill or statement electronically through Reckon, I state that I am entitled to receive the bill or statement from the biller and a paper invoice may no longer be mailed.
                                        <div className="mt-2">
                                            <Checkbox
                                                label="Accept Terms and Conditions"
                                                checked={accept}
                                                onChange={(e) => setAccept(e.target.checked)}
                                            />
                                        </div>
                                    </Alert>

                                    <div className="text-right">
                                        <Button
                                            variant="success"
                                            onClick={handleSaveRegistration}
                                            disabled={hasConnectionError || isSaving || !accept}
                                        >
                                            <span className="glyphicon glyphicon-ok"></span> Register
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default injectIntl(IncomingReckonRegistration);
