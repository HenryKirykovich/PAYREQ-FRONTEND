import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import Loading from "../../Loading";

const UsersManagement = ({billerId, intl, children}) => {
    const [users, setUsers] = useState([]);
    const [biller, setBiller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const usersBaseUrl = `/portal/customer/biller/${billerId}/settings/users`;

    useEffect(() => {
        if (billerId) {
            // Fetch users
            axios.get("/data/users", {params: {billerId}})
                .then(({data}) => {
                    setUsers(data.users || []);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                    setIsLoading(false);
                });

            // Fetch biller info
            axios.get(`/data/billers/${billerId}`)
                .then(({data}) => {
                    setBiller(data.biller);
                })
                .catch(error => {
                    console.error("Error fetching biller:", error);
                });
        }
    }, [billerId]);

    if (isLoading) {
        return <Loading/>;
    }

    const canUpdateUser = true; // TODO: Check permissions
    const isNotQboBiller = true; // TODO: Check biller type
    const billerDoesNotHaveSsoSamlEnabled = !biller?.ssoSamlEnabled;

    return (
        <div>
            <div className="row">
                <p className="well">
                    {intl.formatMessage({id: "settings.users.instructions"})}
                </p>
                {billerDoesNotHaveSsoSamlEnabled && (
                    <p>
                        {biller?.mfaRequired ? 
                            intl.formatMessage({id: "settings.users.deactivateMfa"}) : 
                            <>
                                {intl.formatMessage({id: "settings.users.activateMfa"})}
                                {" "}
                                <a onClick={() => alert("MFA activation modal to be implemented")}>
                                    {intl.formatMessage({id: "settings.users.activateMfaButton"})}
                                </a>
                            </>
                        }
                    </p>
                )}
                <div className="right-margin">
                    <div className="col-md-3" id="user-list-div">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                {intl.formatMessage({id: "settings.users.users"})}
                            </div>
                            <div className="panel-body">
                                <ul className="nav nav-pills nav-stacked">
                                    {users.map(user => (
                                        <li key={user.id} className={user.active ? "active" : ""}>
                                            <Link to={`${usersBaseUrl}/${user.id}`} className="user-list-item">
                                                {user.isPending && (
                                                    <>
                                                        <span className="glyphicon glyphicon-envelope glyphicon-user-list"></span>
                                                        <span><em>{user.email}</em></span>
                                                    </>
                                                )}
                                                {user.isLocked && (
                                                    <>
                                                        <span className="glyphicon glyphicon-lock glyphicon-user-list"></span>
                                                        <span><em>{user.email}</em></span>
                                                    </>
                                                )}
                                                {!user.isPending && !user.isLocked && (
                                                    <>
                                                        <span className="glyphicon glyphicon-user glyphicon-user-list"></span>
                                                        <span>{user.email}</span>
                                                    </>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {canUpdateUser && isNotQboBiller && billerDoesNotHaveSsoSamlEnabled && (
                                <div className="panel-footer panel-footer-user-list">
                                    <Link to={`${usersBaseUrl}/create`} className="pull-right" title="Create/Invite a new user">
                                        <span className="glyphicon glyphicon-plus glyphicon-user-list"></span>
                                        {intl.formatMessage({id: "settings.users.inviteNewUser"})}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-8 col-sm-12" id="user-info-div">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(UsersManagement);
