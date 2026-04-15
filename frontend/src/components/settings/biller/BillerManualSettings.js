import React, {useEffect, useState} from "react";
import axios from "axios";
import {Panel, Button} from "react-bootstrap";
import Loading from "../../Loading";

const BillerManualSettings = ({billerId}) => {
    const [billerSettings, setBillerSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billerId) {
            fetchSettings();
        }
    }, [billerId]);

    const fetchSettings = () => {
        setIsLoading(true);
        axios.get("/data/settings/biller", {params: {billerId}})
            .then(({data}) => {
                setBillerSettings(data.billerSettings);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching biller settings:", error);
                setIsLoading(false);
            });
    };

    const handleGenerateEmail = () => {
        axios.post(`/data/settings/biller/${billerSettings.actorId}/generate-biller-email`)
            .then(({data}) => {
                alert("Mailer email address has been generated.");
                setBillerSettings({
                    ...billerSettings,
                    incomingBillsEmailAddressFull: data.generatedEmail
                });
            })
            .catch(error => {
                console.error("Error generating email:", error);
                alert("An error occurred while generating the biller email address. Please try again later.");
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!billerSettings) {
        return (
            <div className="alert alert-danger">
                Failed to load biller settings
            </div>
        );
    }

    return (
        <Panel>
            <Panel.Heading>
                <h4>System Properties</h4>
            </Panel.Heading>
            <Panel.Body>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email Address</label>
                    <p className="form-control-static col-sm-10">
                        {billerSettings.incomingBillsEmailAddressFull ? (
                            billerSettings.incomingBillsEmailAddressFull
                        ) : (
                            <>
                                <em>
                                    <span className="glyphicon glyphicon-flag"></span> No email address configured
                                </em>
                                <br/>
                                <a className="action-link" onClick={handleGenerateEmail} style={{cursor: 'pointer'}}>
                                    Generate email address
                                </a>
                            </>
                        )}
                    </p>
                </div>
            </Panel.Body>
        </Panel>
    );
};

export default BillerManualSettings;
