import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {PageHeading, TextInput, Select, Checkbox, Button, Alert} from "../common";
import Loading from "../Loading";
import {getDateAsFormatted} from "../../utils/date-utils";

const IncomingMyobRegistration = ({billerId, registrationId, intl}) => {
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
    const [myobProduct, setMyobProduct] = useState("MYOB Essentials");
    const [accept, setAccept] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const gstInclusiveExclusive = [
        {id: "true", name: "Tax Inclusive"},
        {id: "false", name: "Tax Exclusive"}
    ];

    const amountTotalOrMinimum = [
        {id: "false", name: "Total amount payable"},
        {id: "true", name: "Minimum amount / Installment"}
    ];

    const myobProducts = [
        {id: "MYOB Essentials", name: "MYOB Essentials"},
        {id: "MYOB AccountRight", name: "MYOB AccountRight"}
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
                setChannelref1(data.channelRef1 || "false");
                setChannelref2(data.channelRef2 || "");
                setChannelref3(data.channelRef3 || "false");
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching registration:", error);
                setErrorMessage("Failed to load registration");
                setIsLoading(false);
            });
    };

    const handleConnectToMyob = () => {
        // External OAuth URL - needs to use window.location
        window.location.href = `/auth/myob/connect?billerId=${billerId}&product=${myobProduct}`;
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
            channelRef3: channelref3
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

    const hasMyobConnection = model.connection && model.connection.id;
    const hasConnectionError = model.connection?.connectionError;
    const hasMyobBusinesses = model.myobaccounts && model.myobaccounts.length > 0;

    return (
        <div>
            <div className="text-center mb-4">
                {model.logoPath && <img src={model.logoPath} alt="Logo" style={{height: "100px"}}/>}
                <PageHeading>Register for MYOB</PageHeading>
            </div>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {!hasMyobConnection ? (
                <>
                    <Alert variant="info">
                        <h5>Payreq MYOB Usage</h5>
                        <p>Payreq needs to access your MYOB account to obtain the following details:</p>
                        <ol>
                            <li>Your MYOB Business Names and Identifiers to allow you to select the MYOB Business for invoice delivery. Only the Business Identifier is stored in Payreq.</li>
                            <li>Your profile Username. This is stored in Payreq and is visible to your registered Billers.</li>
                        </ol>
                        <p>No other information from MYOB is accessed by Payreq, registered Billers or any other third party.</p>
                        <p>Payreq will use your MYOB connection to create a Supplier Contact if authorised by you and push biller invoices to your MYOB InTray.</p>
                    </Alert>

                    <div className="form-group">
                        <label>MYOB Product</label>
                        <Select
                            value={myobProduct}
                            onChange={(e) => setMyobProduct(e.target.value)}
                            options={myobProducts}
                        />
                    </div>

                    <div className="text-center">
                        <Button variant="primary" onClick={handleConnectToMyob}>
                            Connect to MYOB
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    {hasConnectionError ? (
                        <Alert variant="danger">
                            <h5>Unable to connect to MYOB. Please try reconnecting your account under Settings.</h5>
                            <p>MYOB Username: {model.connection.name}</p>
                            <p>MYOB Product: {model.connection.extraInfo1}</p>
                            <p>Connected since: {getDateAsFormatted(model.connection.connectedDate)}</p>
                        </Alert>
                    ) : (
                        <Alert variant="success">
                            <h5>Connected to MYOB:</h5>
                            <p>MYOB Username: {model.connection.name}</p>
                            <p>MYOB Product: {model.connection.extraInfo1}</p>
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
                            <h4 className="panel-title">MYOB Invoice Fields</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>MYOB Business</label>
                                {hasMyobBusinesses ? (
                                    <Select
                                        value={channelref2}
                                        onChange={(e) => setChannelref2(e.target.value)}
                                        options={model.myobaccounts}
                                    />
                                ) : (
                                    <p>Unable to access MYOB Businesses</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>GST Inclusive or Exclusive</label>
                                <Select
                                    value={channelref1}
                                    onChange={(e) => setChannelref1(e.target.value)}
                                    options={gstInclusiveExclusive}
                                />
                            </div>

                            <div className="form-group">
                                <label>Amount Payable Total or Minimum/Installment</label>
                                <Select
                                    value={channelref3}
                                    onChange={(e) => setChannelref3(e.target.value)}
                                    options={amountTotalOrMinimum}
                                />
                            </div>
                        </div>
                    </div>

                    <Alert variant="warning">
                        By registering to receive this bill or statement electronically through MYOB, I state that I am entitled to receive the bill or statement from the biller and a paper invoice may no longer be mailed.
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
    );
};

export default injectIntl(IncomingMyobRegistration);
