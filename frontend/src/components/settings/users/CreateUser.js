import React, {useState, useEffect} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";

const ROLE_GROUPINGS = [
    {key: "payreq",          labelId: "settings.users.permissions.payreq",         required: true},
    {key: "registration",    labelId: "settings.users.permissions.registrations",   required: false},
    {key: "bills",           labelId: "settings.users.permissions.bills",           required: false},
    {key: "biller-settings", labelId: "settings.users.permissions.billerSettings",  required: false},
];

const LANGUAGES = [
    {id: "en", name: "English"},
    {id: "fr", name: "Français"},
];

const CreateUser = ({billerId, intl}) => {
    const [billerName, setBillerName] = useState("");
    const [allRoles, setAllRoles] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [language, setLanguage] = useState("en");
    const [selectedRoles, setSelectedRoles] = useState({payreq: "", registration: "", bills: "", "biller-settings": ""});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const history = useHistory();

    const usersBaseUrl = `/portal/customer/biller/${billerId}/settings/users`;

    useEffect(() => {
        Promise.all([
            axios.get(`/data/billers/${billerId}`, {localErrorHandling: true})
                .catch(() => ({data: {biller: {}}})),
            axios.get(`/data/roles`, {params: {billerId}, localErrorHandling: true})
                .catch(() => ({data: {roles: []}}))
        ]).then(([billerResp, rolesResp]) => {
            setBillerName(billerResp.data.biller?.name || billerResp.data.biller?.customerName || "");
            const roles = rolesResp.data.roles || [];
            setAllRoles(roles);
            // Set default payreq role to "10" (Payreq Console User) as per Ember
            const defaultPayreq = roles.find(r => r.grouping === "payreq" && String(r.id) === "10");
            if (defaultPayreq) {
                setSelectedRoles(prev => ({...prev, payreq: "10"}));
            } else {
                const firstPayreq = roles.find(r => r.grouping === "payreq");
                if (firstPayreq) setSelectedRoles(prev => ({...prev, payreq: String(firstPayreq.id)}));
            }
            setIsLoading(false);
        });
    }, [billerId]);

    const getRolesForGrouping = (grouping) => allRoles.filter(r => r.grouping === grouping);

    const validate = () => {
        const newErrors = [];
        if (!email.match(/\w+@\w+/)) {
            newErrors.push(intl.formatMessage({id: "settings.users.invalidEmail"}));
        }
        if (!selectedRoles.payreq) {
            newErrors.push(intl.formatMessage({id: "settings.users.selectRole"}));
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSaving(true);
        const userRoleIds = Object.values(selectedRoles).filter(id => id !== "" && id !== null);

        axios.post("/data/settings/invite-user", {
            email,
            name,
            mobileNumber,
            language,
            billerId,
            userRoleIds,
        }, {localErrorHandling: true})
            .then((resp) => {
                const userId = resp.data?.userId;
                if (userId) {
                    history.push(`${usersBaseUrl}/${userId}`);
                } else {
                    history.push(usersBaseUrl);
                }
            })
            .catch(() => {
                setErrors([intl.formatMessage({id: "settings.users.inviteFailed"})]);
                setIsSaving(false);
            });
    };

    if (isLoading) return null;

    return (
        <div className="panel panel-default" id="user-details-div">
            <div className="panel-heading">
                <h4 className="panel-title">
                    {intl.formatMessage({id: "settings.users.createTitle"})}{billerName ? ` "${billerName}"` : ""}
                </h4>
            </div>
            <div className="panel-body">
                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="list-unstyled" style={{marginBottom: 0}}>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                )}

                <form className="form-horizontal" role="form" id="create-user-form" onSubmit={handleSubmit}>
                    <div className="form-group" style={{paddingRight: "5px"}}>
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.email"})}
                        </label>
                        <div className="col-sm-9 input-append">
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={intl.formatMessage({id: "settings.users.email"})}
                                id="email"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.name"})}
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={intl.formatMessage({id: "settings.users.name"})}
                                id="userName"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.mobileNumber"})}
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                id="mobileNumber"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.language"})}
                        </label>
                        <div className="col-sm-9">
                            <select
                                className="form-control"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}>
                                {LANGUAGES.map(lang => (
                                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {ROLE_GROUPINGS.map(({key, labelId, required}) => {
                        const roles = getRolesForGrouping(key);
                        return (
                            <div className="form-group" key={key}>
                                <label className="col-sm-3 control-label">
                                    {intl.formatMessage({id: labelId})}
                                </label>
                                <div className="col-sm-9">
                                    <select
                                        className="form-control"
                                        value={selectedRoles[key] || ""}
                                        onChange={(e) => setSelectedRoles(prev => ({...prev, [key]: e.target.value}))}>
                                        {!required && (
                                            <option value="">{intl.formatMessage({id: "settings.users.permissions.noAccess"})}</option>
                                        )}
                                        {roles.map(role => (
                                            <option key={role.id} value={String(role.id)}>
                                                {role.displayName || role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        );
                    })}

                    <div className="form-group">
                        <div className="btn-toolbar pull-right" style={{paddingRight: "15px"}}>
                            <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                {intl.formatMessage({id: "settings.users.inviteUser"})}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default injectIntl(CreateUser);
