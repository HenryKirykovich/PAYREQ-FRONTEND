import React, {useState, useEffect} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {TextInput, Checkbox} from "../../common";
import Loading from "../../Loading";

const CreateUser = ({billerId, intl}) => {
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // Fetch available roles
        axios.get("/data/roles")
            .then(({data}) => {
                setAvailableRoles(data.roles || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching roles:", error);
                setIsLoading(false);
            });
    }, []);

    const handleRoleToggle = (roleId) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(selectedRoles.filter(id => id !== roleId));
        } else {
            setSelectedRoles([...selectedRoles, roleId]);
        }
    };

    const validate = () => {
        const newErrors = [];

        if (!email.match(/\w+@\w+/)) {
            newErrors.push(intl.formatMessage({id: "settings.users.invalidEmail"}));
        }

        if (selectedRoles.length === 0) {
            newErrors.push(intl.formatMessage({id: "settings.users.selectRole"}));
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSaving(true);

        const inviteData = {
            billerId,
            email,
            roleIds: selectedRoles
        };

        axios.post("/data/users/invite", inviteData)
            .then(() => {
                alert(intl.formatMessage({id: "settings.users.inviteSent"}));
                history.push(`/portal/customer/biller/${billerId}/settings/users`);
            })
            .catch(error => {
                console.error("Error creating user:", error);
                alert(intl.formatMessage({id: "settings.users.inviteFailed"}));
                setIsSaving(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    // Group roles by grouping
    const rolesByGroup = availableRoles.reduce((acc, role) => {
        const group = role.grouping || "Other";
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(role);
        return acc;
    }, {});

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    {intl.formatMessage({id: "settings.users.inviteUser"})}
                </h4>
            </div>
            <div className="panel-body">
                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.email"})}
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={intl.formatMessage({id: "settings.users.emailPlaceholder"})}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">
                            {intl.formatMessage({id: "settings.users.roles"})}
                        </label>
                        <div className="col-sm-9">
                            {Object.keys(rolesByGroup).map(group => (
                                <div key={group}>
                                    <h5><strong>{group}</strong></h5>
                                    {rolesByGroup[group].map(role => (
                                        <div key={role.id} className="checkbox">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRoles.includes(role.id)}
                                                    onChange={() => handleRoleToggle(role.id)}
                                                />
                                                {" "}{role.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-9 col-sm-offset-3">
                            <Button bsStyle="primary" type="submit" disabled={isSaving}>
                                {intl.formatMessage({id: "settings.users.sendInvite"})}
                            </Button>
                            {" "}
                            <Button 
                                type="button"
                                onClick={() => history.push(`/customer/biller/${billerId}/settings/users`)}
                            >
                                {intl.formatMessage({id: "generic.cancel"})}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default injectIntl(CreateUser);
