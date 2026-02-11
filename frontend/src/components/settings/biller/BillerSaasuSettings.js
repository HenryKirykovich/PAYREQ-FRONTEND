import React, {useEffect, useState} from "react";
import axios from "axios";
import {Panel, FormControl, Button} from "react-bootstrap";
import {useAppState} from "../../../state";
import Loading from "../../Loading";

const BillerSaasuSettings = ({billerId}) => {
    const [{user}] = useAppState();
    const [billerSettings, setBillerSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const hasAllAccess = user.permissions && user.permissions.includes("settings.biller.view.all");

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

    const handleUpdate = () => {
        setIsSaving(true);
        const updateData = {
            billerId,
            billerSettings: {
                userId: billerSettings.userId,
                secret: billerSettings.secret
            }
        };

        axios.post("/data/settings/biller", updateData)
            .then(({data}) => {
                if (data.success) {
                    alert("SaaSU settings updated successfully.");
                } else {
                    alert("Failed to update SaaSU settings.");
                }
                setIsSaving(false);
            })
            .catch(error => {
                console.error("Error updating settings:", error);
                alert("An error occurred while updating settings. Please try again later.");
                setIsSaving(false);
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

    if (!hasAllAccess) {
        return (
            <div className="alert alert-warning">
                You do not have permission to view this page.
            </div>
        );
    }

    return (
        <Panel>
            <Panel.Heading>
                <h4>SaaSU Account Properties</h4>
            </Panel.Heading>
            <Panel.Body>
                <div className="form-group">
                    <label className="col-sm-2 control-label">File ID</label>
                    <div className="col-sm-10">
                        <FormControl
                            type="text"
                            value={billerSettings.userId || ""}
                            onChange={(e) => setBillerSettings({...billerSettings, userId: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Web Service Key</label>
                    <div className="col-sm-10">
                        <FormControl
                            type="text"
                            value={billerSettings.secret || ""}
                            onChange={(e) => setBillerSettings({...billerSettings, secret: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="btn-toolbar pull-right">
                        <Button
                            bsStyle="primary"
                            onClick={handleUpdate}
                            disabled={isSaving}
                        >
                            {isSaving ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </div>
            </Panel.Body>
        </Panel>
    );
};

export default BillerSaasuSettings;
