import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import Loading from "../../Loading";

const ROLE_GROUPINGS = [
    {key: "payreq",          labelId: "settings.users.permissions.payreq"},
    {key: "registration",    labelId: "settings.users.permissions.registrations"},
    {key: "bills",           labelId: "settings.users.permissions.bills"},
    {key: "biller-settings", labelId: "settings.users.permissions.billerSettings"},
];

const UserDetail = ({userId, billerId, intl}) => {
    const [user, setUser] = useState(null);
    const [passwordEvents, setPasswordEvents] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("userDetails");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (!userId) return;

        Promise.all([
            axios.get(`/data/users/${userId}`, {params: {billerId}, localErrorHandling: true}),
            axios.get(`/data/roles`, {params: {billerId}, localErrorHandling: true}),
            axios.get(`/data/users/${userId}/passwordEvents`, {params: {billerId}, localErrorHandling: true})
                .catch(() => ({data: {passwordEvents: []}}))
        ]).then(([userResp, rolesResp, eventsResp]) => {
            const u = userResp.data.user;
            setUser(u);
            setName(u.name || "");
            setMobileNumber(u.mobileNumber || "");

            const roles = rolesResp.data.roles || [];
            setAllRoles(roles);

            // Build map: grouping -> current roleId
            const initSelected = {};
            ROLE_GROUPINGS.forEach(({key}) => {
                const userRole = (u.userRoles || []).find(r => r.grouping === key);
                initSelected[key] = userRole ? String(userRole.id) : "";
            });
            setSelectedRoles(initSelected);
            setPasswordEvents(eventsResp.data.passwordEvents || []);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, [userId, billerId]);

    const handleSave = () => {
        axios.put(`/data/users/${userId}`, {user: {id: userId, name, mobileNumber, billerId}}, {localErrorHandling: true})
            .then(() => setUser(prev => ({...prev, name, mobileNumber})));
    };

    const handleResendInvite = () => {
        axios.post(`/data/settings/resend-invite`, {userId, billerId}, {localErrorHandling: true});
    };

    const handleResetMfa = () => {
        axios.post(`/data/settings/users/mfa/reset`, {billerId, userId}, {localErrorHandling: true})
            .then(() => setUser(prev => ({...prev, mfaActivated: false})));
    };

    const handleUnlock = () => {
        axios.post(`/data/users/${userId}/unlock`, {billerId}, {localErrorHandling: true})
            .then(() => setUser(prev => ({...prev, isLocked: false})));
    };

    const handleRevokeAccess = () => {
        axios.post(`/data/settings/revoke-all-access`, {userId, billerId}, {localErrorHandling: true})
            .then(() => history.push(`/portal/customer/biller/${billerId}/settings/users`));
    };

    const handleRoleChange = (grouping, newRoleId) => {
        const currentRoleId = selectedRoles[grouping] || null;
        setSelectedRoles(prev => ({...prev, [grouping]: newRoleId}));
        axios.post(`/data/settings/update-user-customer-actor-role`, {
            userId,
            billerId,
            currentRoleId: currentRoleId || null,
            newRoleId: newRoleId || null
        }, {localErrorHandling: true});
    };

    if (isLoading) return <Loading/>;
    if (!user) return <div>{intl.formatMessage({id: "settings.users.userNotFound"})}</div>;

    const getStatusText = () => {
        if (user.status === "pending" || user.isPending) return intl.formatMessage({id: "settings.users.statusPending"});
        if (user.status === "locked" || user.isLocked) return intl.formatMessage({id: "settings.users.statusLocked"});
        return intl.formatMessage({id: "settings.users.statusActive"});
    };

    const switchTab = (tab) => (e) => { e.preventDefault(); setActiveTab(tab); };

    const getRolesForGrouping = (grouping) => {
        return allRoles.filter(r => r.grouping === grouping);
    };

    return (
        <div className="panel panel-default">
            <ul className="nav nav-pills">
                <li className={activeTab === "userDetails" ? "active" : ""}>
                    <a href="#userDetails" onClick={switchTab("userDetails")}>
                        {intl.formatMessage({id: "settings.users.userDetails"})}
                    </a>
                </li>
                <li className={activeTab === "permissions" ? "active" : ""}>
                    <a href="#permissions" onClick={switchTab("permissions")}>
                        {intl.formatMessage({id: "settings.users.permissions"})}
                    </a>
                </li>
                <li className={activeTab === "passwordEvents" ? "active" : ""}>
                    <a href="#passwordEvents" onClick={switchTab("passwordEvents")}>
                        {intl.formatMessage({id: "settings.users.passwordEvents"})}
                    </a>
                </li>
            </ul>

            <div className="tab-content" id="user-tab-content">
                {activeTab === "userDetails" && (
                    <div className="tab-pane active" id="userDetails">
                        <div className="panel panel-default" id="user-details-div">
                            <div className="page-header page-header-tab-title">
                                <h2 className="panel-title">{user.name}</h2>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal" role="form" id="update-user-form">
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">{intl.formatMessage({id: "settings.users.email"})}</label>
                                        <div className="col-sm-9 input-append">
                                            <label className="form-control-static">{user.email}</label>
                                            {(user.status === "pending" || user.isPending) && (
                                                <button type="button" className="btn btn-info" onClick={handleResendInvite}>
                                                    <span className="glyphicon glyphicon-repeat"/>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">{intl.formatMessage({id: "settings.users.status"})}</label>
                                        <div className="col-sm-9">
                                            <p className="form-control-static">{getStatusText()}</p>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">{intl.formatMessage({id: "settings.users.lastAccessOn"})}</label>
                                        <div className="col-sm-9">
                                            <p className="form-control-static">
                                                {user.lastAccessOn || <span className="label label-warning">{intl.formatMessage({id: "settings.users.never"})}</span>}
                                            </p>
                                        </div>
                                    </div>

                                    {user.mfaRequired && (
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">{intl.formatMessage({id: "settings.users.mfa"})}</label>
                                            <div className="col-sm-9">
                                                <p className="form-control-static">
                                                    {user.mfaActivated ? (
                                                        <>
                                                            {intl.formatMessage({id: "settings.users.mfaYes"})}
                                                            {" "}
                                                            <button type="button" className="btn btn-default" onClick={handleResetMfa}>
                                                                {intl.formatMessage({id: "settings.users.resetMfa"})}
                                                            </button>
                                                        </>
                                                    ) : intl.formatMessage({id: "settings.users.mfaNo"})}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">{intl.formatMessage({id: "settings.users.name"})}</label>
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
                                        <label className="col-sm-3 control-label">{intl.formatMessage({id: "settings.users.mobileNumber"})}</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                id="mobileNumber"/>
                                        </div>
                                    </div>

                                    {(user.status === "locked" || user.isLocked) && (
                                        <div className="form-group">
                                            <div className="col-sm-9 col-sm-offset-3">
                                                <button type="button" className="btn btn-primary" onClick={handleUnlock}>
                                                    {intl.formatMessage({id: "settings.users.unlockUser"})}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-primary" onClick={handleSave}>
                                                {intl.formatMessage({id: "settings.users.update"})}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "permissions" && (
                    <div className="tab-pane active" id="userPermissions">
                        <div className="panel panel-default" id="user-permissions-div">
                            <div className="page-header page-header-tab-title">
                                <div className="btn-toolbar pull-right">
                                    <button type="button" className="btn-xs btn-danger" onClick={handleRevokeAccess}>
                                        <span className="glyphicon glyphicon-remove"/>
                                        {" "}{intl.formatMessage({id: "settings.users.revokeAllAccess"})}
                                    </button>
                                </div>
                                <h2 className="panel-title">
                                    {intl.formatMessage({id: "settings.users.permissionsTitle"})}{user.name}
                                </h2>
                            </div>
                            <div className="panel-body">
                                <div className="panel-body">
                                    <form className="form-horizontal">
                                        {ROLE_GROUPINGS.map(({key, labelId}) => {
                                            const roles = getRolesForGrouping(key);
                                            const isRequired = key === "payreq";
                                            return (
                                                <div className="form-group" key={key}>
                                                    <label className="col-sm-3 control-label">
                                                        {intl.formatMessage({id: labelId})}
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            className="form-control"
                                                            value={selectedRoles[key] || ""}
                                                            onChange={(e) => handleRoleChange(key, e.target.value)}>
                                                            {!isRequired && (
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "passwordEvents" && (
                    <div className="tab-pane active" id="userPasswordEvents">
                        <div className="panel panel-default" id="user-password-events-div">
                            <div className="page-header page-header-tab-title">
                                <h2 className="panel-title">{user.name}</h2>
                            </div>
                            <div className="panel-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>{intl.formatMessage({id: "settings.users.eventType"})}</th>
                                            <th>{intl.formatMessage({id: "settings.users.eventTime"})}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passwordEvents.length > 0 ? (
                                            passwordEvents.map((event, idx) => (
                                                <tr key={idx}>
                                                    <td>{event.eventTypeDescription}</td>
                                                    <td>{event.eventTime}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">{intl.formatMessage({id: "settings.users.noPasswordEvents"})}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default injectIntl(UserDetail);
