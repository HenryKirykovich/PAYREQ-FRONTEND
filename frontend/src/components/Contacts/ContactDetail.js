import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {injectIntl} from "react-intl";
import {TextInput} from "../common";
import {Button} from "react-bootstrap";
import Loading from "../Loading";
import {getDateAsUTCFormatted} from "../../utils/date-utils";

const ContactDetail = ({match, history, intl, billerId}) => {
    const {contactId} = match.params;
    const [contact, setContact] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({});
    const [authFields, setAuthFields] = useState({});

    useEffect(() => {
        if (contactId) {
            axios.get(`/data/contacts/${contactId}`)
                .then(({data}) => {
                    setContact(data.contact);
                    setEditedContact(data.contact);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching contact:", error);
                    setIsLoading(false);
                });

            // Fetch auth fields configuration
            axios.get(`/data/contacts/${billerId}/getAuthFields`)
                .then(({data}) => {
                    setAuthFields(data);
                })
                .catch(error => {
                    console.error("Error fetching auth fields:", error);
                });
        }
    }, [contactId, billerId]);

    const handleBack = () => {
        history.push(`/portal/customer/biller/${billerId}/contacts`);
    };

    const handleRefresh = () => {
        setIsLoading(true);
        axios.get(`/data/contacts/${contactId}`)
            .then(({data}) => {
                setContact(data.contact);
                setEditedContact(data.contact);
                setIsEditing(false);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error refreshing contact:", error);
                setIsLoading(false);
            });
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete contact ${contact.billerAccountNumber}?`)) {
            axios.delete(`/data/contacts/${contactId}`)
                .then(() => {
                    handleBack();
                })
                .catch(error => {
                    console.error("Error deleting contact:", error);
                    alert("Error deleting contact. Please try again.");
                });
        }
    };

    const handleSave = () => {
        axios.put(`/data/contacts/${contactId}`, editedContact)
            .then(({data}) => {
                setContact(data.contact);
                setEditedContact(data.contact);
                setIsEditing(false);
                alert("Contact updated successfully");
            })
            .catch(error => {
                console.error("Error updating contact:", error);
                alert("Error updating contact. Please try again.");
            });
    };

    const handleChange = (field, value) => {
        setEditedContact({...editedContact, [field]: value});
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!contact) {
        return <div>Contact not found</div>;
    }

    const canUpdateContact = true; // TODO: Check permissions
    const canDeleteContact = true; // TODO: Check permissions

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-heading">
                        Contact "{contact.billerAccountNumber}"
                        <small> {contact.name}</small>
                    </h2>
                </div>
            </div>

            <div className="row actions-row btn-toolbar" role="toolbar">
                <div className="actions btn-group col-sm-4">
                    <Button onClick={handleBack}>
                        <span className="glyphicon glyphicon-arrow-left"></span> Back to Contacts
                    </Button>
                    <Button onClick={handleRefresh}>
                        <span className="glyphicon glyphicon-refresh"></span> Refresh
                    </Button>
                </div>

                {canDeleteContact && (
                    <div className="actions btn-group col-sm-3">
                        <Button bsStyle="danger" onClick={handleDelete}>
                            <span className="glyphicon glyphicon-remove"></span> Delete Contact
                        </Button>
                    </div>
                )}
            </div>

            <form className="form-horizontal" role="form">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">Contact Details</h4>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">
                                        <abbr title="Account Number">Account Number</abbr>
                                    </label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static"><strong>{contact.billerAccountNumber}</strong></p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Last Updated</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">
                                            {getDateAsUTCFormatted(contact.lastUpdated)}
                                            {contact.updatedBy && <span> by <strong>{contact.updatedBy}</strong></span>}
                                        </p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="customerName" className="col-sm-2 control-label">Name</label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="customerName"
                                                value={editedContact.name || ""}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static">{contact.name}</p>
                                        )}
                                    </div>
                                </div>

                                {authFields.contactField2Name && (
                                    <div className="form-group">
                                        <label htmlFor="contactId2" className="col-sm-2 control-label">
                                            {authFields.contactField2Name}
                                        </label>
                                        <div className="col-sm-10">
                                            {canUpdateContact && isEditing && !authFields.contactField2IsChannelId ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="contactId2"
                                                    value={editedContact.contactId2 || ""}
                                                    onChange={(e) => handleChange('contactId2', e.target.value)}
                                                />
                                            ) : (
                                                <p className="form-control-static"><strong>{contact.contactId2}</strong></p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {authFields.contactField3Name && (
                                    <div className="form-group">
                                        <label htmlFor="contactId3" className="col-sm-2 control-label">
                                            {authFields.contactField3Name}
                                        </label>
                                        <div className="col-sm-10">
                                            {canUpdateContact && isEditing && !authFields.contactField3IsChannelId ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="contactId3"
                                                    value={editedContact.contactId3 || ""}
                                                    onChange={(e) => handleChange('contactId3', e.target.value)}
                                                />
                                            ) : (
                                                <p className="form-control-static"><strong>{contact.contactId3}</strong></p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="businessIdentifier" className="col-sm-2 control-label">
                                        Business Identifier
                                    </label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="businessIdentifier"
                                                value={editedContact.businessIdentifier || ""}
                                                onChange={(e) => handleChange('businessIdentifier', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static"><strong>{contact.businessIdentifier}</strong></p>
                                        )}
                                    </div>
                                </div>

                                {canUpdateContact && isEditing && (
                                    <div className="alert alert-info">
                                        <p>
                                            These fields may be used for authentication purposes and can be included in bills sent to this contact.
                                        </p>
                                    </div>
                                )}

                                {/* Address Section */}
                                <div className="form-group">
                                    <label className="col-sm-2 control-label"><h4>Address</h4></label>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address1" className="col-sm-2 control-label">Address 1</label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address1"
                                                value={editedContact.address1 || ""}
                                                onChange={(e) => handleChange('address1', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static">{contact.address1}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address2" className="col-sm-2 control-label">Address 2</label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address2"
                                                value={editedContact.address2 || ""}
                                                onChange={(e) => handleChange('address2', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static">{contact.address2}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="municipality" className="col-sm-2 control-label">City</label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="municipality"
                                                value={editedContact.municipality || ""}
                                                onChange={(e) => handleChange('municipality', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static">{contact.municipality}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="province" className="col-sm-2 control-label">Province/State</label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="province"
                                                value={editedContact.province || ""}
                                                onChange={(e) => handleChange('province', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static">{contact.province}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postalCode" className="col-sm-2 control-label">Postal Code</label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="postalCode"
                                                value={editedContact.postalCode || ""}
                                                onChange={(e) => handleChange('postalCode', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static">{contact.postalCode}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="country" className="col-sm-2 control-label">Country</label>
                                    <div className="col-sm-10">
                                        {canUpdateContact && isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="country"
                                                value={editedContact.country || ""}
                                                onChange={(e) => handleChange('country', e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-static">{contact.country}</p>
                                        )}
                                    </div>
                                </div>

                                {canUpdateContact && (
                                    <div className="form-group">
                                        <div className="col-sm-10 pull-right">
                                            {isEditing ? (
                                                <React.Fragment>
                                                    <Button bsStyle="primary" type="button" onClick={handleSave}>
                                                        Update Contact
                                                    </Button>
                                                    {" "}
                                                    <Button type="button" onClick={() => {
                                                        setEditedContact(contact);
                                                        setIsEditing(false);
                                                    }}>
                                                        Cancel
                                                    </Button>
                                                </React.Fragment>
                                            ) : (
                                                <Button bsStyle="primary" type="button" onClick={() => setIsEditing(true)}>
                                                    Edit Contact
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default withRouter(injectIntl(ContactDetail));
