import React, {useEffect, useState} from "react";
import axios from "axios";
import {Panel, FormControl, Button, Alert} from "react-bootstrap";
import {useAppState} from "../../../state";
import {useParams} from "react-router-dom";
import Loading from "../../Loading";

const BillerChannelSettings = ({billerId}) => {
    const {channelId} = useParams();
    const [{user}] = useAppState();
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (billerId && channelId) {
            fetchChannelSettings();
        }
    }, [billerId, channelId]);

    const fetchChannelSettings = () => {
        setIsLoading(true);
        axios.get(`/data/settings/biller/channel/${channelId}`, {params: {billerId}})
            .then(({data}) => {
                setModel(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching channel settings:", error);
                setIsLoading(false);
            });
    };

    const handleSaveChannel = () => {
        setIsSaving(true);
        const updateData = {
            billerId,
            channel: {
                channelPartnerSystemId: model.channel.channelPartnerSystemId,
                authItem1Value: model.channel.authItem1Value,
                authItem2Value: model.channel.authItem2Value,
                authItem3Value: model.channel.authItem3Value,
                authItem4Value: model.channel.authItem4Value,
                checkPayerCred: model.channel.checkPayerCred,
                userId: model.channel.userId,
                secret: model.channel.secret,
                useAuthItem1: model.channel.useAuthItem1,
                useAuthItem2: model.channel.useAuthItem2,
                useAuthItem3: model.channel.useAuthItem3,
                useAuthItem4: model.channel.useAuthItem4,
                contactRequiredForRegistationApproval: model.channel.contactRequiredForRegistationApproval,
                registrationContactIdHelp: model.channel.registrationContactIdHelp,
                authItem1Help: model.channel.authItem1Help,
                authItem2Help: model.channel.authItem2Help,
                authItem3Help: model.channel.authItem3Help,
                authItem4Help: model.channel.authItem4Help,
                emailBillDeliveryType: model.channel.emailBillDeliveryType,
                emailBillFrom: model.channel.emailBillFrom,
                emailBillTo: model.channel.emailBillTo,
                emailBillNoticeType: model.channel.emailBillNoticeType,
                emailBillContact: model.channel.emailBillContact,
                emailMarkEachAsFailed: model.channel.emailMarkEachAsFailed,
                emailTemplate: model.channel.emailTemplate,
                emailTemplateType: model.channel.emailTemplateType,
                emailTemplateText: model.channel.emailTemplateText,
                defaultEmailTemplateBrandColour: model.channel.defaultEmailTemplateBrandColour,
                agentNoticeIdContactIdField: model.channel.agentNoticeIdContactIdField
            }
        };

        axios.post("/data/settings/biller/channel", updateData)
            .then(({data}) => {
                if (data.success) {
                    alert("Channel settings updated successfully.");
                    fetchChannelSettings();
                } else {
                    alert("Failed to update channel settings.");
                }
                setIsSaving(false);
            })
            .catch(error => {
                console.error("Error updating channel:", error);
                alert("An error occurred while updating biller settings. Please try again later.");
                setIsSaving(false);
            });
    };

    const handleSendTestEmail = () => {
        axios.post("/data/settings/biller/email/test", {billerId})
            .then(({data}) => {
                if (data.success) {
                    alert("A test email has been sent successfully.");
                } else {
                    alert(data.error || "Failed to send test email.");
                }
            })
            .catch(error => {
                console.error("Error sending test email:", error);
                alert("An error occurred sending a test email. Please try again later.");
            });
    };

    const handleDownloadEmailTemplate = () => {
        axios.get("/data/emailTemplates/download", {params: {billerId}})
            .then(({data}) => {
                window.open(`/download/emailTemplate/download?downloadFileId${data.downloadFileId}`);
                alert("Successfully downloaded email template.");
            })
            .catch(error => {
                console.error("Error downloading template:", error);
                alert("An error occurred downloading an email template. Please try again later.");
            });
    };

    const handleUploadTemplate = () => {
        alert("Template upload modal - to be implemented with modals migration");
    };

    const updateChannelField = (field, value) => {
        setModel({
            ...model,
            channel: {
                ...model.channel,
                [field]: value
            }
        });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!model || !model.channel) {
        return (
            <div className="alert alert-danger">
                Failed to load channel settings
            </div>
        );
    }

    const isEmail = model.channel.channelPartnerSystemId === "email";
    const isAgent = model.channel.channelPartnerSystemId === "mybillsagent";
    const isAdmin = model.channel.isPayreqAdmin;
    const isAdminAndNotSub = model.channel.isPayreqAdmin && !model.channel.isSub;
    const isNotAdminAndNotSub = !model.channel.isPayreqAdmin && !model.channel.isSub;
    const isCustomEmailTemplate = model.channel.emailTemplateType == 2;
    const isTemplateNotProvidedByMailhouse = model.channel.emailTemplateType != 3;
    const contactFieldsSelect = model.meta?.contactIdFields || [];

    const emailTemplateTypes = [
        {id: 1, name: "Default"},
        {id: 2, name: "Custom"},
        {id: 3, name: "Provided in SFTP document load"}
    ];

    const emailTypes = [{id: 1, name: "Email With Attachment"}];

    return (
        <Panel>
            <div className="tab-content" id="user-tab-content">
                <div className="tab-pane active" id="userDetails">
                    <div className="panel panel-default" id="user-details-div">
                        <div className="page-header page-header-tab-title">
                            <h2 className="panel-title">
                                {model.channel.channelPartnerSystemId}
                                {isEmail && !model.channel.showInMybills && " - Manual email only"}
                            </h2>
                        </div>
                    </div>
                    <div className="panel-body">
                        <form className="form-horizontal" role="form" id="update-user-form">
                            {isEmail ? (
                                <>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Maximum Emails per Registration</label>
                                        <div className="col-sm-9">
                                            <label className="control-label">{model.channel.maxNoDetails}</label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Fail delivery when first email bounces</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.emailMarkEachAsFailed || false}
                                                onChange={(e) => updateChannelField('emailMarkEachAsFailed', e.target.checked)}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Template Type</label>
                                        <div className="col-sm-9">
                                            <FormControl
                                                componentClass="select"
                                                value={model.channel.emailTemplateType || 1}
                                                onChange={(e) => updateChannelField('emailTemplateType', parseInt(e.target.value))}
                                            >
                                                {emailTemplateTypes.map(type => (
                                                    <option key={type.id} value={type.id}>{type.name}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>

                                    {isCustomEmailTemplate && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Email as Text</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.emailTemplateText || ""}
                                                        onChange={(e) => updateChannelField('emailTemplateText', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Email Template</label>
                                                <div className="col-sm-6">
                                                    {model.channel.emailTemplate ? (
                                                        <a href="#" onClick={(e) => {e.preventDefault(); handleDownloadEmailTemplate();}}>
                                                            <label className="control-label">{model.channel.emailTemplate}</label>
                                                        </a>
                                                    ) : (
                                                        <label className="control-label">No Template</label>
                                                    )}
                                                </div>
                                                <div className="actions btn-group col-sm-2">
                                                    <Button onClick={handleUploadTemplate}>
                                                        <span className="glyphicon glyphicon-upload"></span> Upload
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Default Email Template Brand Colour</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.defaultEmailTemplateBrandColour || ""}
                                                        onChange={(e) => updateChannelField('defaultEmailTemplateBrandColour', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {isTemplateNotProvidedByMailhouse && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Email Type</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        componentClass="select"
                                                        value={model.channel.emailBillDeliveryType || 1}
                                                        disabled
                                                    >
                                                        {emailTypes.map(type => (
                                                            <option key={type.id} value={type.id}>{type.name}</option>
                                                        ))}
                                                    </FormControl>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Email From Text</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.emailBillFrom || ""}
                                                        onChange={(e) => updateChannelField('emailBillFrom', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Email To Text</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.emailBillTo || ""}
                                                        onChange={(e) => updateChannelField('emailBillTo', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Email Notice Type Text</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.emailBillNoticeType || ""}
                                                        onChange={(e) => updateChannelField('emailBillNoticeType', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Email Contact Text</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.emailBillContact || ""}
                                                        onChange={(e) => updateChannelField('emailBillContact', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-xs-12">
                                                    <Button className="col-xs-12" onClick={handleSendTestEmail}>
                                                        <span className="glyphicon glyphicon-envelope"></span> Send Test Email
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {isNotAdminAndNotSub && (
                                        <div className="form-group">
                                            <div className='btn-toolbar pull-right'>
                                                <Button
                                                    bsStyle="primary"
                                                    onClick={handleSaveChannel}
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? "Updating..." : "Update"}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <hr/>
                                </>
                            ) : null}

                            {isAdminAndNotSub ? (
                                <>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Channel Id</label>
                                        <div className="col-sm-9">
                                            <FormControl
                                                componentClass="select"
                                                value={model.channel.registrationContactIdField || ""}
                                                onChange={(e) => updateChannelField('registrationContactIdField', e.target.value)}
                                            >
                                                <option value="">Select a field</option>
                                                {contactFieldsSelect.map(field => (
                                                    <option key={field.id} value={field.id}>{field.value}</option>
                                                ))}
                                            </FormControl>
                                        </div>
                                    </div>

                                    {model.channel.requiresSelfservice && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Channel Id Help Message</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.registrationContactIdHelp || ""}
                                                        onChange={(e) => updateChannelField('registrationContactIdHelp', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    )}

                                    {isAgent && model.channel.allowAgentRegistrationsFromContacts && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Notice Id Contact Field</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        componentClass="select"
                                                        value={model.channel.agentNoticeIdContactIdField || ""}
                                                        onChange={(e) => updateChannelField('agentNoticeIdContactIdField', e.target.value)}
                                                    >
                                                        <option value="">Select a field</option>
                                                        {contactFieldsSelect.map(field => (
                                                            <option key={field.id} value={field.id}>{field.value}</option>
                                                        ))}
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    )}

                                    {/* Auth Field 1 */}
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Field 1</label>
                                        <div className="col-sm-6">
                                            {model.channel.useAuthItem1 ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={model.channel.authItem1Value || ""}
                                                    onChange={(e) => updateChannelField('authItem1Value', e.target.value)}
                                                >
                                                    <option value="">Select a field</option>
                                                    {contactFieldsSelect.map(field => (
                                                        <option key={field.id} value={field.id}>{field.value}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <FormControl
                                                    type="text"
                                                    value={model.channel.authItem1Value || ""}
                                                    onChange={(e) => updateChannelField('authItem1Value', e.target.value)}
                                                />
                                            )}
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 1</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem1 || false}
                                                onChange={(e) => updateChannelField('useAuthItem1', e.target.checked)}
                                            />
                                        </div>
                                    </div>

                                    {model.channel.requiresSelfservice && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Field 1 Help Message</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.authItem1Help || ""}
                                                        onChange={(e) => updateChannelField('authItem1Help', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    )}

                                    {/* Auth Field 2 */}
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Field 2</label>
                                        <div className="col-sm-6">
                                            {model.channel.useAuthItem2 ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={model.channel.authItem2Value || ""}
                                                    onChange={(e) => updateChannelField('authItem2Value', e.target.value)}
                                                >
                                                    <option value="">Select a field</option>
                                                    {contactFieldsSelect.map(field => (
                                                        <option key={field.id} value={field.id}>{field.value}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <FormControl
                                                    type="text"
                                                    value={model.channel.authItem2Value || ""}
                                                    onChange={(e) => updateChannelField('authItem2Value', e.target.value)}
                                                />
                                            )}
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 2</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem2 || false}
                                                onChange={(e) => updateChannelField('useAuthItem2', e.target.checked)}
                                            />
                                        </div>
                                    </div>

                                    {model.channel.requiresSelfservice && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Field 2 Help Message</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.authItem2Help || ""}
                                                        onChange={(e) => updateChannelField('authItem2Help', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    )}

                                    {/* Auth Field 3 */}
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Field 3</label>
                                        <div className="col-sm-6">
                                            {model.channel.useAuthItem3 ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={model.channel.authItem3Value || ""}
                                                    onChange={(e) => updateChannelField('authItem3Value', e.target.value)}
                                                >
                                                    <option value="">Select a field</option>
                                                    {contactFieldsSelect.map(field => (
                                                        <option key={field.id} value={field.id}>{field.value}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <FormControl
                                                    type="text"
                                                    value={model.channel.authItem3Value || ""}
                                                    onChange={(e) => updateChannelField('authItem3Value', e.target.value)}
                                                />
                                            )}
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 3</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem3 || false}
                                                onChange={(e) => updateChannelField('useAuthItem3', e.target.checked)}
                                            />
                                        </div>
                                    </div>

                                    {model.channel.requiresSelfservice && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Field 3 Help Message</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.authItem3Help || ""}
                                                        onChange={(e) => updateChannelField('authItem3Help', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    )}

                                    {/* Auth Field 4 */}
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Field 4</label>
                                        <div className="col-sm-6">
                                            {model.channel.useAuthItem4 ? (
                                                <FormControl
                                                    componentClass="select"
                                                    value={model.channel.authItem4Value || ""}
                                                    onChange={(e) => updateChannelField('authItem4Value', e.target.value)}
                                                >
                                                    <option value="">Select a field</option>
                                                    {contactFieldsSelect.map(field => (
                                                        <option key={field.id} value={field.id}>{field.value}</option>
                                                    ))}
                                                </FormControl>
                                            ) : (
                                                <FormControl
                                                    type="text"
                                                    value={model.channel.authItem4Value || ""}
                                                    onChange={(e) => updateChannelField('authItem4Value', e.target.value)}
                                                />
                                            )}
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 4</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem4 || false}
                                                onChange={(e) => updateChannelField('useAuthItem4', e.target.checked)}
                                            />
                                        </div>
                                    </div>

                                    {model.channel.requiresSelfservice && (
                                        <>
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Field 4 Help Message</label>
                                                <div className="col-sm-9">
                                                    <FormControl
                                                        type="text"
                                                        value={model.channel.authItem4Help || ""}
                                                        onChange={(e) => updateChannelField('authItem4Help', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    )}

                                    <div className="form-group">
                                        <div className='btn-toolbar pull-right'>
                                            <Button
                                                bsStyle="primary"
                                                onClick={handleSaveChannel}
                                                disabled={isSaving}
                                            >
                                                {isSaving ? "Updating..." : "Update"}
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Non-email channels - read-only view */}
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Channel Id</label>
                                        <div className="col-sm-10">
                                            <FormControl
                                                type="text"
                                                value={model.channel.registrationContactIdField || ""}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Field 1</label>
                                        <div className="col-sm-7">
                                            <FormControl
                                                type="text"
                                                value={model.channel.authItem1Field || ""}
                                                disabled
                                            />
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 1</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem1 || false}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Field 2</label>
                                        <div className="col-sm-7">
                                            <FormControl
                                                type="text"
                                                value={model.channel.authItem2Field || ""}
                                                disabled
                                            />
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 2</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem2 || false}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Field 3</label>
                                        <div className="col-sm-7">
                                            <FormControl
                                                type="text"
                                                value={model.channel.authItem3Field || ""}
                                                disabled
                                            />
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 3</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem3 || false}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Field 4</label>
                                        <div className="col-sm-7">
                                            <FormControl
                                                type="text"
                                                value={model.channel.authItem4Field || ""}
                                                disabled
                                            />
                                        </div>
                                        <label className="col-sm-2 control-label">Use Auth Field 4</label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                checked={model.channel.useAuthItem4 || false}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default BillerChannelSettings;
