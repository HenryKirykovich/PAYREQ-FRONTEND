import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import Loading from "../../Loading";

const ALERT_TYPES = [
    {id: "email", name: "Email"}
];

const FREQUENCIES = [
    {id: "never", name: "Never"},
    {id: "immediate", name: "Immediately"},
    {id: "frequent", name: "Hourly"},
    {id: "infrequent", name: "Daily"}
];

const UserNotifications = ({intl}) => {
    const [settings, setSettings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get("/data/settings/notification-prefs")
            .then(({data}) => {
                setSettings((data && data.settings) || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching notification preferences:", error);
                setIsLoading(false);
            });
    }, []);

    const handleFieldChange = (idx, field, value) => {
        setSettings(prev => prev.map((setting, i) =>
            i === idx ? {...setting, [field]: value} : setting
        ));
    };

    const handleUpdate = () => {
        const notificationPrefs = settings.map(setting => ({
            ...setting,
            alertType: setting.alertType || "email",
            alertFreq: setting.alertFreq || "never"
        }));

        setIsSaving(true);
        axios.post("/data/settings/notification-prefs", {notificationPrefs})
            .then(() => {
                setSettings(notificationPrefs);
                setIsSaving(false);
                alert(intl.formatMessage({id: "settings.notifications.updateSuccess"}));
            })
            .catch(error => {
                console.error("Error updating notification preferences:", error);
                setIsSaving(false);
                alert(intl.formatMessage({id: "settings.notifications.updateFailed"}));
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <form className="form-horizontal" role="form">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                {intl.formatMessage({id: "settings.notifications.title"})}
                            </h4>
                        </div>
                        <div className="panel-body">
                            <div className="well well-sm">
                                {intl.formatMessage({id: "settings.notifications.intro"})}
                                <ul style={{listStyle: "disc", paddingLeft: "20px"}}>
                                    <li>
                                        <strong>{intl.formatMessage({id: "settings.notifications.frequency.immediate"})}: </strong>
                                        {intl.formatMessage({id: "settings.notifications.frequency.immediateDescription"})}
                                    </li>
                                    <li>
                                        <strong>{intl.formatMessage({id: "settings.notifications.frequency.frequent"})}: </strong>
                                        {intl.formatMessage({id: "settings.notifications.frequency.frequentDescription"})}
                                    </li>
                                    <li>
                                        <strong>{intl.formatMessage({id: "settings.notifications.frequency.infrequent"})}: </strong>
                                        {intl.formatMessage({id: "settings.notifications.frequency.infrequentDescription"})}
                                    </li>
                                </ul>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 col-sm-offset-6 text-center">
                                    {intl.formatMessage({id: "settings.notifications.method"})}
                                </label>
                                <label className="col-sm-2 text-center">
                                    {intl.formatMessage({id: "settings.notifications.frequency"})}
                                </label>
                            </div>

                            {settings.map((setting, idx) => (
                                <div className="form-group" key={setting.name || idx}>
                                    <label className="col-sm-6 control-label">
                                        {setting.description}
                                    </label>
                                    <div className="col-sm-2">
                                        <select className="form-control"
                                                value={setting.alertType || ""}
                                                onChange={(e) => handleFieldChange(idx, "alertType", e.target.value)}>
                                            {ALERT_TYPES.map(option => (
                                                <option key={option.id} value={option.id}>{option.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-2">
                                        <select className="form-control"
                                                value={setting.alertFreq || ""}
                                                onChange={(e) => handleFieldChange(idx, "alertFreq", e.target.value)}>
                                            {FREQUENCIES.map(option => (
                                                <option key={option.id} value={option.id}>{option.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}

                            <div className="col-sm-12">
                                <div className="btn-toolbar pull-right margin-top-sm">
                                    <button type="button"
                                            className="btn btn-primary"
                                            onClick={handleUpdate}
                                            disabled={isSaving}>
                                        {intl.formatMessage({id: "settings.notifications.update"})}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default injectIntl(UserNotifications);
