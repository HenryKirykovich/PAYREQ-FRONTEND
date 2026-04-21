import React, {useState, useEffect} from "react";
import {Panel, Alert, Button} from "react-bootstrap";
import {Link, useParams, useHistory} from "react-router-dom";
import {injectIntl} from "react-intl";
import axios from "axios";
import Loading from "../Loading";

const AccountEmailUpdateConfirmation = ({intl}) => {
    const {code, id} = useParams();
    const history = useHistory();
    const [invite, setInvite] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get(`/data/account-email-update/${code}/${id}`)
            .then(({data}) => {
                setInvite(data.invite);
                setText(data.text || intl.formatMessage({id: "accountEmailUpdate.defaultText"}));
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error loading email update:", error);
                setError("Failed to load email update information");
                setIsLoading(false);
            });
    }, [code, id, intl]);

    const handleConfirm = () => {
        axios.post(`/data/account-email-update/${code}/${id}/confirm`)
            .then(() => {
                alert(intl.formatMessage({id: "accountEmailUpdate.successConfirm"}));
                history.push("/login");
            })
            .catch(error => {
                console.error("Error confirming email update:", error);
                setError("Failed to confirm email update. Please try again.");
            });
    };

    const handleCancel = () => {
        axios.post(`/data/account-email-update/${code}/${id}/cancel`)
            .then(() => {
                alert(intl.formatMessage({id: "accountEmailUpdate.successCancel"}));
                history.push("/login");
            })
            .catch(error => {
                console.error("Error canceling email update:", error);
                setError("Failed to cancel email update. Please try again.");
            });
    };

    if (isLoading) return <Loading/>;

    return (
        <div className="row" id="invite">
            <div className="col-md-8 col-md-offset-2">
                <Panel>
                    <Panel.Heading>
                        <h2 className="panel-title">
                            {intl.formatMessage({id: "accountEmailUpdate.heading"})}
                        </h2>
                    </Panel.Heading>
                    {(error || invite?.error) ? (
                        <Panel.Body>
                            <Alert bsStyle="danger">
                                <p>{error || invite.error}</p>
                            </Alert>
                            <form className="form-login form-horizontal" role="form">
                                <div className="col-sm-12">
                                    <div className="btn-toolbar pull-right margin-top-sm">
                                        <Link to="/login" className="btn btn-default">
                                            <span>{intl.formatMessage({id: "accountEmailUpdate.backButton"})}</span>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Panel.Body>
                    ) : (
                        <Panel.Body>
                            <Alert bsStyle="info">
                                <p>{text}</p>
                            </Alert>
                            <form className="form-login form-horizontal" role="form">
                                <div className="col-sm-12">
                                    <div className="btn-toolbar pull-right margin-top-sm">
                                        <Button bsStyle="default" onClick={handleCancel}>
                                            {intl.formatMessage({id: "accountEmailUpdate.cancel"})}
                                        </Button>
                                        <Button bsStyle="primary" onClick={handleConfirm}>
                                            {intl.formatMessage({id: "accountEmailUpdate.confirm"})}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Panel.Body>
                    )}
                </Panel>
            </div>
        </div>
    );
};

export default injectIntl(AccountEmailUpdateConfirmation);
