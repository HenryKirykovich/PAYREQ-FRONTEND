import React, {useState, useEffect} from "react";
import {Panel, Alert, Button, FormControl} from "react-bootstrap";
import {Link, useParams, useHistory} from "react-router-dom";
import {injectIntl} from "react-intl";
import axios from "axios";
import Loading from "../Loading";

const EmailUnsubscribe = ({intl}) => {
    const {code, id} = useParams();
    const history = useHistory();
    const [invite, setInvite] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/data/email-unsubscribe/${code}/${id}`)
            .then(({data}) => {
                setInvite(data.invite);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error loading email unsubscribe:", error);
                setError("Failed to load unsubscribe information");
                setIsLoading(false);
            });
    }, [code, id]);

    const handleUnsubscribe = () => {
        axios.post(`/data/email-unsubscribe/${code}/${id}`)
            .then(() => {
                alert(intl.formatMessage({id: "emailUnsubscribe.success"}));
                history.push("/login");
            })
            .catch(error => {
                console.error("Error unsubscribing:", error);
                setError("Failed to unsubscribe. Please try again.");
            });
    };

    if (isLoading) return <Loading/>;

    return (
        <div className="row" id="invite">
            <div className="col-md-8 col-md-offset-2">
                <Panel>
                    <Panel.Heading>
                        <h2 className="panel-title">
                            {intl.formatMessage({id: "emailUnsubscribe.heading"})}
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
                                            <span>{intl.formatMessage({id: "emailUnsubscribe.backButton"})}</span>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Panel.Body>
                    ) : (
                        <Panel.Body>
                            <Alert bsStyle="info">
                                <p>{intl.formatMessage({id: "emailUnsubscribe.text"})}</p>
                            </Alert>
                            <form className="form-login form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="control-label col-sm-4">
                                        {intl.formatMessage({id: "emailUnsubscribe.emailLabel"})}
                                    </label>
                                    <p className="form-control-static col-sm-8">
                                        {invite?.registrationValue}
                                    </p>
                                </div>
                                <div className="col-sm-12">
                                    <div className="btn-toolbar pull-right margin-top-sm">
                                        <Button bsStyle="primary" onClick={handleUnsubscribe}>
                                            {intl.formatMessage({id: "emailUnsubscribe.submitButton"})}
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

export default injectIntl(EmailUnsubscribe);
