import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";

const UserDetail = ({userId, billerId, intl}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (userId) {
            axios.get(`/data/users/${userId}`, {params: {billerId}})
                .then(({data}) => {
                    setUser(data.user);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                    setIsLoading(false);
                });
        }
    }, [userId, billerId]);

    const handleDelete = () => {
        if (window.confirm(intl.formatMessage({id: "settings.users.confirmDelete"}))) {
            axios.delete(`/data/users/${userId}`, {params: {billerId}})
                .then(() => {
                    alert(intl.formatMessage({id: "settings.users.userDeleted"}));
                    history.push(`/portal/customer/biller/${billerId}/settings/users`);
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                    alert(intl.formatMessage({id: "settings.users.userDeleteFailed"}));
                });
        }
    };

    const handleUnlock = () => {
        axios.post(`/data/users/${userId}/unlock`, {billerId})
            .then(() => {
                alert(intl.formatMessage({id: "settings.users.userUnlocked"}));
                // Refresh user data
                window.location.reload();
            })
            .catch(error => {
                console.error("Error unlocking user:", error);
                alert(intl.formatMessage({id: "settings.users.userUnlockFailed"}));
            });
    };

    const handleResendInvite = () => {
        axios.post(`/data/users/${userId}/resend-invite`, {billerId})
            .then(() => {
                alert(intl.formatMessage({id: "settings.users.inviteResent"}));
            })
            .catch(error => {
                console.error("Error resending invite:", error);
                alert(intl.formatMessage({id: "settings.users.inviteResendFailed"}));
            });
    };

    const handleResetMfa = () => {
        if (window.confirm(intl.formatMessage({id: "settings.users.confirmResetMfa"}))) {
            axios.post(`/data/settings/users/mfa/reset`, {billerId, userId})
                .then(() => {
                    alert(intl.formatMessage({id: "settings.users.mfaResetSuccess"}));
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Error resetting MFA:", error);
                    alert(intl.formatMessage({id: "settings.users.mfaResetFailed"}));
                });
        }
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!user) {
        return <div>{intl.formatMessage({id: "settings.users.userNotFound"})}</div>;
    }

    const canUpdateUser = true; // TODO: Check permissions

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">{user.email}</h4>
            </div>
            <div className="panel-body">
                <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.email"})}
                        </label>
                        <div className="col-sm-9">
                            <p className="form-control-static">{user.email}</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.name"})}
                        </label>
                        <div className="col-sm-9">
                            <p className="form-control-static">{user.name || "-"}</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.status"})}
                        </label>
                        <div className="col-sm-9">
                            <p className="form-control-static">
                                {user.isPending && <span className="label label-warning">Pending</span>}
                                {user.isLocked && <span className="label label-danger">Locked</span>}
                                {!user.isPending && !user.isLocked && <span className="label label-success">Active</span>}
                            </p>
                        </div>
                    </div>

                    {user.mfaActivated && (
                        <div className="form-group">
                            <label className="col-sm-3 control-label">
                                {intl.formatMessage({id: "settings.users.mfa"})}
                            </label>
                            <div className="col-sm-9">
                                <p className="form-control-static">
                                    <span className="label label-info">Activated</span>
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.roles"})}
                        </label>
                        <div className="col-sm-9">
                            <p className="form-control-static">
                                {user.userRoles && user.userRoles.length > 0 ? 
                                    user.userRoles.map(role => role.name).join(", ") : 
                                    "-"
                                }
                            </p>
                        </div>
                    </div>

                    {canUpdateUser && (
                        <div className="form-group">
                            <div className="col-sm-9 col-sm-offset-3">
                                {user.isPending && (
                                    <Button onClick={handleResendInvite} style={{marginRight: "10px"}}>
                                        {intl.formatMessage({id: "settings.users.resendInvite"})}
                                    </Button>
                                )}
                                {user.isLocked && (
                                    <Button bsStyle="primary" onClick={handleUnlock} style={{marginRight: "10px"}}>
                                        {intl.formatMessage({id: "settings.users.unlockUser"})}
                                    </Button>
                                )}
                                {user.mfaActivated && (
                                    <Button onClick={handleResetMfa} style={{marginRight: "10px"}}>
                                        {intl.formatMessage({id: "settings.users.resetMfa"})}
                                    </Button>
                                )}
                                <Button bsStyle="danger" onClick={handleDelete}>
                                    {intl.formatMessage({id: "settings.users.deleteUser"})}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default injectIntl(UserDetail);
