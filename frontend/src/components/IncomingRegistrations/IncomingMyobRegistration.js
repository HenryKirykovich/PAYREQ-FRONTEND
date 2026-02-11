import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, Panel, Alert} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import Loading from "../Loading";
import moment from "moment";

const IncomingMyobRegistration = ({billerId}) => {
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
    const [channelref1, setChannelref1] = useState("Inclusive");
    const [channelref2, setChannelref2] = useState("");
    const [channelref3, setChannelref3] = useState("TOTAL");
    const [myobProduct, setMyobProduct] = useState("3");
    const [accept, setAccept] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);

    const gstInclusiveExclusive = [
        {id: "Inclusive", name: "Inclusive"},
        {id: "Exclusive", name: "Exclusive"}
    ];

    const amountTotalOrMinimum = [
        {id: "TOTAL", name: "Total Amount"},
        {id: "MINIMUM", name: "Minimum Amount/Installment Amount"}
    ];

    const myobProducts = [
        {id: "3", name: "MYOB AccountRight"},
        {id: "1", name: "MYOB Essentials AU"},
        {id: "2", name: "MYOB Essentials NZ"}
    ];

    useEffect(() => {
        if (billerId && mailerId) {
            fetchRegistration();
        }
    }, [billerId, mailerId]);

    const fetchRegistration = () => {
        setIsLoading(true);
        axios.get(`/data/payer/registrations/${billerId}/mailer/${mailerId}/channels/selfservice/myob`)
            .then(({data}) => {
                setModel(data);
                setRegistrationField(data.previousFields?.registrationField || "");
                setAuthfield1(data.previousFields?.authField1 || "");
                setAuthfield2(data.previousFields?.authField2 || "");
                setAuthfield3(data.previousFields?.authField3 || "");
                setAuthfield4(data.previousFields?.authField4 || "");
                setChannelref1(data.previousFields?.channelRef1 || "Inclusive");
                setChannelref2(data.previousFields?.channelRef2 || "");
                setChannelref3(data.previousFields?.channelRef3 || "TOTAL");
                if (data.connection) {
                    setMyobProduct(data.connection.extraInfo2 || "3");
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching registration:", error);
                setErrorMessage("Failed to load registration");
                setIsLoading(false);
            });
    };

    const handleConnectToMyob = () => {
        axios.get(`/data/settings/myob/${billerId}/connecttomyob/${mailerId}/registration`, {
            params: {product: myobProduct}
        })
            .then(({data}) => {
                window.top.location.href = data.requesttoken.uri;
            })
            .catch(error => {
                console.error("Error connecting to MYOB:", error);
                setErrorMessage("Failed to connect to MYOB");
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
            channelreffour: null,
            accept: accept
        };

        axios.post(`/data/payer/registrations/${billerId}/mailer/${mailerId}/channels/selfservice/myob`, registrationData)
            .then(({data}) => {
                if (data.success) {
                    history.push(`/customer/biller/${billerId}/incoming/registration/${data.registration.id}`);
                    alert("MYOB Registration Created.");
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

    const hasMyobConnection = !!model.connection;
    const hasMyobBusinesses = model.myobaccounts && model.myobaccounts.length > 0;
    const hasAuthField1 = model.channel?.authItem1Field && model.channel?.useAuthItem1;
    const hasAuthField2 = model.channel?.authItem2Field && model.channel?.useAuthItem2;
    const hasAuthField3 = model.channel?.authItem3Field && model.channel?.useAuthItem3;
    const hasAuthField4 = model.channel?.authItem4Field && model.channel?.useAuthItem4;

    return (
        <div className="row">
            <img style={{display: 'block', margin: '0 auto', height: '100px'}} src={model.logoPath} alt="Logo"/>
            <div>
                <h4>Register for MYOB</h4>
            </div>

            <div>
                <form className="form-login form" id="myob-connect-form">
                    {errorMessage && (
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    )}

                    {hasMyobConnection ? (
                        <>
                            {model.connection.connectionError ? (
                                <Alert bsStyle="danger">
                                    <h4 className="control-label">Unable to connect to MYOB. Please try reconnecting your account under Settings.</h4>
                                    <p>MYOB Username: {model.connection.name}</p>
                                    <p>MYOB Product: {model.connection.extraInfo1}</p>
                                    <p>Connected since: {moment(model.connection.connectedDate).format("DD MMMM YYYY H:mm")}</p>
                                </Alert>
                            ) : (
                                <Alert bsStyle="success">
                                    <h4 className="control-label">Connected to MYOB:</h4>
                                    <p>MYOB Username: {model.connection.name}</p>
                                    <p>MYOB Product: {model.connection.extraInfo1}</p>
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
                                    <h4>MYOB Invoice Fields</h4>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className="form-group">
                                        <label className="control-label">MYOB Business</label>
                                        {hasMyobBusinesses ? (
                                            <FormControl
                                                componentClass="select"
                                                value={channelref2}
                                                onChange={(e) => setChannelref2(e.target.value)}
                                            >
                                                <option value="">Select a business</option>
                                                {model.myobaccounts.map(account => (
                                                    <option key={account.id} value={account.id}>{account.name}</option>
                                                ))}
                                            </FormControl>
                                        ) : (
                                            <p>Unable to access MYOB Businesses</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">GST Inclusive or Exclusive</label>
                                        <FormControl
                                            componentClass="select"
                                            value={channelref1}
                                            onChange={(e) => setChannelref1(e.target.value)}
                                        >
                                            {gstInclusiveExclusive.map(option => (
                                                <option key={option.id} value={option.id}>{option.name}</option>
                                            ))}
                                        </FormControl>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Amount Payable Total or Minimum/Installment</label>
                                        <FormControl
                                            componentClass="select"
                                            value={channelref3}
                                            onChange={(e) => setChannelref3(e.target.value)}
                                        >
                                            {amountTotalOrMinimum.map(option => (
                                                <option key={option.id} value={option.id}>{option.name}</option>
                                            ))}
                                        </FormControl>
                                    </div>
                                </Panel.Body>
                            </Panel>

                            <div className="form-group">
                                <Alert bsStyle="warning">
                                    By registering to receive this bill or statement electronically through MYOB, I state that I am entitled to receive the bill or statement from the biller and a paper invoice may no longer be mailed.
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
                            <Alert bsStyle="info">
                                <h4>Payreq MYOB Usage</h4>
                                <p>Payreq needs to access your MYOB account to obtain the following details:</p>
                                <ol>
                                    <li>Your MYOB Business Names and Identifiers to allow you to select the MYOB Business for invoice delivery. Only the Business Identifier is stored in Payreq.</li>
                                    <li>Your profile Username. This is stored in Payreq and is visible to your registered Billers.</li>
                                </ol>
                                <p>No other information from MYOB is accessed by Payreq, registered Billers or any other third party.</p>
                                <p>Payreq will use your MYOB connection to create a Supplier Contact if authorised by you and push biller invoices to your MYOB InTray.</p>
                            </Alert>

                            <form className="form-login form" id="myob-form">
                                <div className="form-group">
                                    <label className="control-label">MYOB Product</label>
                                    <FormControl
                                        componentClass="select"
                                        value={myobProduct}
                                        onChange={(e) => setMyobProduct(e.target.value)}
                                    >
                                        {myobProducts.map(product => (
                                            <option key={product.id} value={product.id}>{product.name}</option>
                                        ))}
                                    </FormControl>
                                </div>

                                <Button
                                    bsStyle="primary"
                                    style={{display: 'block', margin: '0 auto'}}
                                    onClick={handleConnectToMyob}
                                >
                                    Connect to MYOB
                                </Button>
                            </form>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default IncomingMyobRegistration;
