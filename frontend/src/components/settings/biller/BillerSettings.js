import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";

const BillerSettings = ({billerId, intl}) => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (billerId) {
            axios.get("/data/settings/biller", {params: {billerId}})
                .then(({data}) => {
                    setSettings(data.billerSettings);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching biller settings:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId]);

    const handleCheckboxChange = (field) => {
        setSettings({...settings, [field]: !settings[field]});
    };

    const handleTextChange = (field, value) => {
        setSettings({...settings, [field]: value});
    };

    const handleUpdateOptions = () => {
        setIsSaving(true);
        const updateData = {
            billerId,
            billerSettings: {
                reviewBillBeforeSending: settings.reviewBillBeforeSending,
                checkPayerCred: settings.checkPayerCred,
                reviewFailedReg: settings.reviewFailedReg,
                mandatoryCheckOnDocumentSize: settings.mandatoryCheckOnDocumentSize,
                saveBillWithoutRegistration: settings.saveBillWithoutRegistration,
                allowAgentRegistrationsFromContacts: settings.allowAgentRegistrationsFromContacts,
                checkPotentialDeregistration: settings.checkPotentialDeregistration,
                holdContactChangedBill: settings.holdContactChangedBill,
                noUploadPotentialDeregistration: settings.noUploadPotentialDeregistration,
                validateCustomerName: settings.validateCustomerName,
                contactRequiredForRegistationApproval: settings.contactRequiredForRegistationApproval,
                validatePageSize: settings.validatePageSize,
                dueDateReplacementWords: settings.dueDateReplacementWords,
                noPaymentRequiredReplacementWord: settings.noPaymentRequiredReplacementWord
            }
        };

        axios.post("/data/settings/biller", updateData)
            .then(({data}) => {
                if (data.success) {
                    alert(intl.formatMessage({id: "settings.biller.optionsUpdated"}));
                } else {
                    alert(intl.formatMessage({id: "settings.biller.optionsUpdateFailed"}));
                }
                setIsSaving(false);
            })
            .catch(error => {
                console.error("Error updating settings:", error);
                alert(intl.formatMessage({id: "settings.biller.optionsUpdateFailed"}));
                setIsSaving(false);
            });
    };

    const handleUpdateBillFields = () => {
        setIsSaving(true);
        const updateData = {
            billerId,
            billerSettings: {
                billRef1Field: settings.billRef1Field,
                billRef2Field: settings.billRef2Field,
                billRef3Field: settings.billRef3Field,
                billRef4Field: settings.billRef4Field,
                billRef5Field: settings.billRef5Field,
                billRef6Field: settings.billRef6Field
            }
        };

        axios.post("/data/settings/biller/bill-fields", updateData)
            .then(() => {
                alert(intl.formatMessage({id: "settings.biller.billFieldsUpdated"}));
                setIsSaving(false);
            })
            .catch(error => {
                console.error("Error updating bill fields:", error);
                alert(intl.formatMessage({id: "settings.biller.billFieldsUpdateFailed"}));
                setIsSaving(false);
            });
    };

    const handleUpdateContactFields = () => {
        setIsSaving(true);
        const updateData = {
            billerId,
            billerSettings: {
                contactId1Field: settings.contactId1Field,
                contactId2Field: settings.contactId2Field,
                contactId3Field: settings.contactId3Field,
                contactId4Field: settings.contactId4Field,
                contactId5Field: settings.contactId5Field,
                contactId6Field: settings.contactId6Field,
                contactId7Field: settings.contactId7Field,
                contactId8Field: settings.contactId8Field
            }
        };

        axios.post("/data/settings/biller/contact-fields", updateData)
            .then(() => {
                alert(intl.formatMessage({id: "settings.biller.contactFieldsUpdated"}));
                setIsSaving(false);
            })
            .catch(error => {
                console.error("Error updating contact fields:", error);
                alert(intl.formatMessage({id: "settings.biller.contactFieldsUpdateFailed"}));
                setIsSaving(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!settings) {
        return <div>Error loading settings</div>;
    }

    const hasUpdateAccess = true; // TODO: Check permissions
    const isAdmin = settings.isAdmin || false;
    const allowChangeCheckCredentials = true; // TODO: Check if allowed

    return (
        <div id="biller-settings" className="row">
            <div className="col-md-12">
                <form className="form-horizontal" role="form">
                    {/* Options Panel */}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                {intl.formatMessage({id: "settings.biller.options"})}
                            </h4>
                        </div>
                        <div className="panel-body">
                            {settings.sendNonDigitalToPrinter && (
                                <div className="form-group">
                                    <label className="col-sm-12">
                                        {intl.formatMessage({id: "settings.biller.sendInactiveToPrinter"})} - 
                                        {intl.formatMessage({id: "settings.biller.mailhouseId"})} {settings.sendingMailhouseSystemId} - 
                                        {intl.formatMessage({id: "settings.biller.printKey"})} {settings.printKey}
                                    </label>
                                    {settings.checkMaxPageSize && (
                                        <label className="col-sm-12">
                                            {intl.formatMessage({id: "settings.biller.checkMaxPrintingDocumentPages"})} {settings.checkMaxPageSize}
                                        </label>
                                    )}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="col-sm-3 control-label settings-checkboxes">
                                    {intl.formatMessage({id: "settings.biller.reviewBillBeforeSending"})}
                                </label>
                                <div className="col-sm-1">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={settings.reviewBillBeforeSending || false}
                                        onChange={() => handleCheckboxChange('reviewBillBeforeSending')}
                                    />
                                </div>

                                {allowChangeCheckCredentials && (
                                    <>
                                        <label className="col-sm-3 control-label settings-checkboxes">
                                            {intl.formatMessage({id: "settings.biller.checkCredentials"})}
                                        </label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                checked={settings.checkPayerCred || false}
                                                onChange={() => handleCheckboxChange('checkPayerCred')}
                                            />
                                        </div>
                                    </>
                                )}

                                <label className="col-sm-3 control-label settings-checkboxes">
                                    {intl.formatMessage({id: "settings.biller.reviewFailedReg"})}
                                </label>
                                <div className="col-sm-1">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={settings.reviewFailedReg || false}
                                        onChange={() => handleCheckboxChange('reviewFailedReg')}
                                    />
                                </div>

                                {settings.hasSizePricing && (
                                    <>
                                        <label className="col-sm-3 control-label settings-checkboxes">
                                            {intl.formatMessage({id: "settings.biller.mandatoryDocumentSizeValidation"})}
                                        </label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                checked={settings.mandatoryCheckOnDocumentSize || false}
                                                onChange={() => handleCheckboxChange('mandatoryCheckOnDocumentSize')}
                                            />
                                        </div>
                                    </>
                                )}

                                {settings.showSaveBillWithoutRegistration && (
                                    <>
                                        <label className="col-sm-3 control-label settings-checkboxes">
                                            {intl.formatMessage({id: "settings.biller.saveBillWithoutRegistration"})}
                                        </label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                checked={settings.saveBillWithoutRegistration || false}
                                                onChange={() => handleCheckboxChange('saveBillWithoutRegistration')}
                                            />
                                        </div>
                                    </>
                                )}

                                {settings.hasMybillsAgent && (
                                    <>
                                        <label className="col-sm-3 control-label settings-checkboxes">
                                            {intl.formatMessage({id: "settings.biller.allowAgentRegistrationsFromContacts"})}
                                        </label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                checked={settings.allowAgentRegistrationsFromContacts || false}
                                                onChange={() => handleCheckboxChange('allowAgentRegistrationsFromContacts')}
                                            />
                                        </div>
                                    </>
                                )}

                                <label className="col-sm-3 control-label settings-checkboxes">
                                    {intl.formatMessage({id: "settings.biller.checkPotentialDeregistration"})}
                                </label>
                                <div className="col-sm-1">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={settings.checkPotentialDeregistration || false}
                                        onChange={() => handleCheckboxChange('checkPotentialDeregistration')}
                                        disabled={settings.disableCheckPotentialDeregistration}
                                    />
                                </div>

                                {settings.checkPotentialDeregistration && (
                                    <>
                                        <label className="col-sm-3 control-label settings-checkboxes">
                                            {intl.formatMessage({id: "settings.biller.holdContactChangedBill"})}
                                        </label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                checked={settings.holdContactChangedBill || false}
                                                onChange={() => handleCheckboxChange('holdContactChangedBill')}
                                            />
                                        </div>

                                        <label className="col-sm-3 control-label settings-checkboxes">
                                            {intl.formatMessage({id: "settings.biller.noUploadPotentialDeregistration"})}
                                        </label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                checked={settings.noUploadPotentialDeregistration || false}
                                                onChange={() => handleCheckboxChange('noUploadPotentialDeregistration')}
                                            />
                                        </div>
                                    </>
                                )}

                                {settings.showCheckCustomerName && (
                                    <>
                                        <label className="col-sm-3 control-label settings-checkboxes">
                                            {intl.formatMessage({id: "settings.biller.checkEmployeeName"})}
                                        </label>
                                        <div className="col-sm-1">
                                            <input
                                                type="checkbox"
                                                className="form-control"
                                                checked={settings.validateCustomerName || false}
                                                onChange={() => handleCheckboxChange('validateCustomerName')}
                                            />
                                        </div>
                                    </>
                                )}

                                <label className="col-sm-3 control-label settings-checkboxes">
                                    {intl.formatMessage({id: "settings.biller.contactRequiredForRegistationApproval"})}
                                </label>
                                <div className="col-sm-1">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={settings.contactRequiredForRegistationApproval || false}
                                        onChange={() => handleCheckboxChange('contactRequiredForRegistationApproval')}
                                    />
                                </div>

                                <label className="col-sm-3 control-label settings-checkboxes">
                                    {intl.formatMessage({id: "settings.biller.checkMaxDocumentPages"})}
                                </label>
                                <div className="col-sm-1">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={settings.validatePageSize || false}
                                        onChange={() => handleCheckboxChange('validatePageSize')}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label settings-checkboxes">
                                    {intl.formatMessage({id: "settings.biller.dueDateReplacementWords"})}
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="dueDateReplacement"
                                        type="text"
                                        className="form-control"
                                        value={settings.dueDateReplacementWords || ""}
                                        onChange={(e) => handleTextChange('dueDateReplacementWords', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label settings-checkboxes">
                                    {intl.formatMessage({id: "settings.biller.noPaymentRequiredReplacementWord"})}
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="noPaymentRequired"
                                        type="text"
                                        className="form-control"
                                        value={settings.noPaymentRequiredReplacementWord || ""}
                                        onChange={(e) => handleTextChange('noPaymentRequiredReplacementWord', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12 settings-mailer-button">
                                    {hasUpdateAccess && (
                                        <Button bsStyle="primary" onClick={handleUpdateOptions} disabled={isSaving}>
                                            {intl.formatMessage({id: "settings.biller.updateOptions"})}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bill Reference Fields Panel */}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                {intl.formatMessage({id: "settings.biller.billRefFields"})}
                            </h4>
                        </div>
                        <div className="panel-body">
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <div className="form-group" key={`billRef${num}`}>
                                    <label className="col-sm-2 control-label">
                                        {intl.formatMessage({id: `settings.biller.billRefField${num}`})}
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settings[`billRef${num}Field`] || ""}
                                            onChange={(e) => handleTextChange(`billRef${num}Field`, e.target.value)}
                                            disabled={settings.isSub || !isAdmin}
                                        />
                                    </div>
                                </div>
                            ))}
                            {!settings.isSub && (
                                <div className="form-group">
                                    <label className="col-sm-2 control-label"></label>
                                    <div className="col-sm-8 settings-mailer-button">
                                        {hasUpdateAccess && (
                                            <Button bsStyle="primary" onClick={handleUpdateBillFields} disabled={isSaving}>
                                                {intl.formatMessage({id: "settings.biller.updateBillRefFields"})}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact ID Fields Panel */}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                {intl.formatMessage({id: "settings.biller.contactIdFields"})}
                            </h4>
                        </div>
                        <div>
                            <div className="col-sm-2"><h4><strong></strong></h4></div>
                            <div className="col-sm-8"><h4><strong></strong></h4></div>
                            <div className="col-sm-1"><h4><strong>{intl.formatMessage({id: "settings.biller.idHeader"})}</strong></h4></div>
                            <div className="col-sm-1"><h4><strong>{intl.formatMessage({id: "settings.biller.authHeader"})}</strong></h4></div>
                        </div>
                        <div className="panel-body">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                <div className="form-group" key={`contactId${num}`}>
                                    <label className="col-sm-2 control-label">
                                        {intl.formatMessage({id: `settings.biller.contactIdField${num}`})}
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settings[`contactId${num}Field`] || ""}
                                            onChange={(e) => handleTextChange(`contactId${num}Field`, e.target.value)}
                                            disabled={settings.isSub || !isAdmin}
                                        />
                                    </div>
                                    <div className="col-sm-1">
                                        {settings[`isContactField${num}Id`] ? (
                                            <span className="glyphicon glyphicon-ok form-control-static" aria-hidden="true" style={{color: "green"}}></span>
                                        ) : (
                                            <span className="glyphicon glyphicon-remove form-control-static" aria-hidden="true" style={{color: "red"}}></span>
                                        )}
                                    </div>
                                    <div className="col-sm-1">
                                        {settings[`isContactField${num}Auth`] ? (
                                            <span className="glyphicon glyphicon-ok form-control-static" aria-hidden="true" style={{color: "green"}}></span>
                                        ) : (
                                            <span className="glyphicon glyphicon-remove form-control-static" aria-hidden="true" style={{color: "red"}}></span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {!settings.isSub && (
                                <div className="form-group">
                                    <label className="col-sm-2 control-label"></label>
                                    <div className="col-sm-8 settings-mailer-button">
                                        {hasUpdateAccess && (
                                            <Button bsStyle="primary" onClick={handleUpdateContactFields} disabled={isSaving}>
                                                {intl.formatMessage({id: "settings.biller.updateContactIdFields"})}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default injectIntl(BillerSettings);
