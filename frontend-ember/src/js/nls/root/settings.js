define({
    "all": {
        "notifications": "Notifications",
        "permissions": "Permissions",
        "passwordEvents": "Password events",
        "userDetails": "User details",
        "accounting": "Accounting plans",
        "payments": "Payments",
        "contactDetails": "Contact Details",
        "apiDetails": "Payreq API",
        "bulkDownloadPreference": "Bulk Download Preference",
        "billTemplates": "Shared Documents",
        "accountPermissions": "Account Permissions",
        "users": "Users",
        "connections": "Connections",
        "channels": "Channels",
        "update": "Update",
        "consents": "Authorisations",
        "forwardingRules": "Forwarding Rules",

        "activateMfa":  "To activate Multi-Factor Authentication for all user logins.",
        "activateMfaButton":  "Activate",
        "deactivateMfa":  "Multi-Factor Authentication is required for all users. To deactivate Multi-Factor Authentication please contact Payreq Support.",
        "mfaActivateSuccess": "Multi-Factor Authentication has been activated",
        "mfaActivateError": "Multi-Factor Authentication could not be activated. Please contact Payreq Support.",
        "mfaActivateFailed":  "An error occurred while activating Multi-Factor Authentication on this account. Please contact Payreq Support.",
        "mfaResetSuccess": "Multi-Factor Authentication has been reset for %@",
        "mfaResetError": "Multi-Factor Authentication could not be reset for %@. Please contact Payreq Support.",
        "mfaResetFailed":  "An error occurred while resetting Multi-Factor Authentication for %@. Please contact Payreq Support.",

        "templates": {
            "noTemplatesFound": "No shared documents found for this mailer.",
            "name": "Name",
            "filename": "File name",
            "createdOn": "Created on",
            "createdBy": "Created by",
            "action": "Action",
        },
        "successfulTemplateUpload": "We will let you know shortly when you can begin sending the document type to your employees. If you have any queries, contact us at support@payreq.com",
        "templateErrors": {
            "invalid.filetype": "The selected file can not be uploaded as it has an unsupported file type. Please upload a file with a valid file type.",
            "invalid.filetype.csv": "The selected file can not be imported as it has an unsupported file type. Please upload a CSV file with columns matching the format detailed above.",
            "invalid.filetype.html": "The selected file can not be imported as it has an unsupported file type. Please upload a HTML file.",
            "invalid.filetype.pdf": "The selected file can not be imported as it has an unsupported file type. Please upload a PDF file.",
        },
        "genericTemplateError":  "Unable to create mail template. Please contact Payreq Support.",
        "genericTemplateFail": "An error occurred while uploading mail template for this mailer. Please try again later.",

        "subBillerInfo": "%@ %@ Mailer Id: %@",

        "consentSettings": {
            "status": {
                "pending": "Pending",
                "authorised": "Authorised",
                "deactivated": "Deactivated",
                "cancelled": "Cancelled",
            },

            "heading": "Payreq MyBills Agent Authorisations",
            "searchPlaceholder": "Search for an Authoristion by Agent email or name",
            "billerLabel": "Biller",
            "agentLabel": "Agent",
            "emailLabel": "Email Address",
            "statusLabel": "Status",
            "noticeIdLabel": "Notice Id",
            "authorisedOnLabel": "Authorised On",
            "unAuthorisedOnLabel": "Unauthorised On",
            "actions": "Actions",
            "noAuthorisations": "No MyBills Agent Authorisations.",

            "billerHeading": "MyBills Agent Request Consent",
            "billerText": "To manage registrations on behalf of an Agent please enter their Payreq MyBills account email and click 'Send Request'. The Agent will receive an email request and must verify authorisation before you can use this feature.",
            "billerAgentEmail": "MyBills Agent Email",
            "requestButton": "Send Request",

            "errors": {
                "invalid.email": "Invalid MyBills Agent email address entered.",
                "max.retries": "Maximum number of invalid tries to find a Payreq account reached. Please contact Payreq Support.",
                "no.user": "Payreq user doesn't exist for %@",
                "pending.rego": "Pending MyBills Agent Authorisation already exists for %@. Please see MyBills Agent Authorisations below."
            },

            "resendSuccess": "Payreq MyBills Agent authorisation email re-sent to %@",
            "resendErrorMessage": "An error occurred while resending the MyBills Agent Authorisation email. Please try again later.",
            "resendErrors": {
                "max.resends": "Maxmium number of re-sends have been reached for %@. Please contact Payreq Support"
            },

            "authUpdate": "Successfully updated authorisation.",
            "authUpdateError": "An error occured while updating the selected Payreq MyBills Authorisation. Please try again later.",

            "cancel": "Cancel",
            "ok": "OK",
            "unauthoriseModalHeading": "MyBills Agent Registration Management Unauthorise",
            "unauthoriseModalText": "Are you sure you want to unauthorise MyBills Agent Registration Management for <strong>{{{email}}}</strong>?",

            "removeAuth": "Registration management unauthorised ( %@ )",
            "removeAuthBiller": "Registration management unauthorised for Agency %@ ( %@ )",
            "removeAuthError": "An error occurred while updating your MyBills Agent Authorisation. Please try again later.",

            "sentConsent": "Email request for consent has been sent to: %@",
            "setConsentError": "An error occurred while sending a consent request. Please try again later.",
            "getAuthError": "An error occurred while refreshing MyBills Agent Authorisations for this biller. Please try again later."
        },

        "billerSettings": {
            "options": "Options",

            "sendInactiveToPrinter": "Documents without an active registration will be sent for printing",
            "checkMaxPrintingDocumentPages": "Max pages size for printing:",
            "checkMaxDocumentPagesMsg": "Payreq will validate documents are not greater than %@ page(s) before sending.",
            "mailhouseId": "Mailhouse ID: ",
            "printKey": "Print Key: ",

            "errorMaxPagesRequired": "Unable to update settings options. Contact Payreq Support to setup max pages validation",

            "dueDateReplacementWords": "Due date replacement words (comma separated)",
            "noPaymentRequiredReplacementWord": "No payment required replacement word",

            "field1": "Field #1",
            "field2": "Field #2",
            "field3": "Field #3",
            "field4": "Field #4",

            "useAuthField1": "Mandatory?",
            "useAuthField2": "Mandatory?",
            "useAuthField3": "Mandatory?",
            "useAuthField4": "Mandatory?",

            "contactIdField1": "Contact Field #1",
            "contactIdField2": "Contact Field #2",
            "contactIdField3": "Contact Field #3",
            "contactIdField4": "Contact Field #4",
            "contactIdField5": "Contact Field #5",
            "contactIdField6": "Contact Field #6",
            "contactIdField7": "Contact Field #7",
            "contactIdField8": "Contact Field #8",

            "billRefField1": "Bill Field #1",
            "billRefField2": "Bill Field #2",
            "billRefField3": "Bill Field #3",
            "billRefField4": "Bill Field #4",
            "billRefField5": "Bill Field #5",
            "billRefField6": "Bill Field #6",

            "contactIdFields": "Contact Field Settings",
            "updateContactIdFields": "Update contact fields",
            "deliveryChannelFields": "Delivery Channel Settings",
            "billRefFields": "Bill Field Settings",
            "updateBillRefFields": "Update bill fields",
            "updateOptions": "Update options",
            "IdHeader": "Id",
            "AuthHeader": "Auth",
            "update": "Update channel",

            "systemProperties": "System Properties",
            "generateEmailAddress": "Generate one now",
            "mandatoryDocumentSizeValidation": "Validate document < 200KB",
            "checkEmployeeName": "Check subscription name matches employee name",
            "checkMaxDocumentPages": "Validate document number of pages",

            "saasuAccountProperties": "SAASU Account Properties",
            "fileId": "File ID",
            "webServiceKey": "Web Services Key",

            "qboPayrollAccountProperties": "QuickBooks Online Properties",

            "mailerOptionsUpdated": "Mailer settings updated successfully.",
            "mailerOptionsUpdateFailed": "An error occurred while updating biller settings. Please try again later.",
            "contactFieldsUpdated": "Mailer contact field settings updated successfully.",
            "contactFieldsUpdateFailed": "An error occurred while updating biller settings. Please try again later.",
            "billFieldsUpdated": "Mailer bill field settings updated successfully.",
            "billFieldsUpdateFailed": "An error occurred while updating biller settings. Please try again later.",
            "qboDisconnected": "QuickBooks Online account has been disconnected from Payreq.",
            "qboDisconnectFailed": "An error occurred while disconnecting your QuickBooks Online account. Please try again later."
        },

        "userSettings": {
            "notificationInstructions": "This page allows you to modify the notification settings for a user.",
            "userNameMissing": "Please enter a name.",
            "userNameMax": "Please enter a name less than 256 characters",
            "notesMax": "Please enter notes less than 2000 characters",
            "workPhoneNumberMissing": "Please enter a work phone number.",
            "invalidPhoneNumber": "Please enter a valid phone number. Can contain only digits, +, - and space. Number of digits should be greater than 7 and less than 13",
            "emailMissing": "Please enter a valid email address.",
            "inviteNewUser": "Invite new user",
            "inviteUser": "Invite user",
            "permissionError": "Have to assign at least one permission from %@",
            "roles": {
                "1": "Registration Viewer",
                "2": "Registration Approver",
                "3": "Mailer Settings Administrator",
                "4": "Mail Viewer",
                "5": "Mail Manager",
                "6": "Contacts Viewer",
                "7": "Contacts Editor",
                "8": "Customer Administrator",
                "9": "Payreq API User",
                "10": "Payreq Console User",
                "100": "Incoming Mail Manager",
                "101": "Incoming Registrations Manager",
                "102": "Incoming Settings Administrator",
                "11": "Mailhouse Job Submitter",
                "12": "Mail Viewer - No PDF Document",
            },

            "languages": {
                "en": "English",
                "fr": "Français"
            },
            "preferredLanguage": "Language",
            "preferredLanguagePrompt": "Select language",

            "billersToAdd": "Add to Billers",
            "billersToAddPlaceholder": "Select a Biller...",

            "billStatusPlaceholder": "Select a Status...",

            "user": {
                "uid": "User Id",
                "email": "Email",
                "status": "Status",
                "lastAccessOn": "Last access on",
                "name": "Name",
                "workPhoneNumber": "Work phone number",
                "mobileNumber": "Mobile number",
                "mfaActivated":"MFA Activated",
                "yes": "Yes",
                "no": "No",
                "apiAccess": "API access",
                "notes": "Notes",
                "passwordResetRequest": "Password reset request",
                "passwordResetRequestDesc": "Password reset requested by this user",
                "passwordResetRequestDescWithDate": "Password reset requested by this user on ",
                "copyPasswordResetLink": "Copy password reset link",
                "copyPasswordResetLinkDesc": "This is the password reset link sent to user via email"
            },
            "revokeAllAccess": "Revoke access",
            "update": "Update user",
            "notificationSettings": "Notification settings",
            "resendInvitation": "Resend invitation",
            "statusList": {
                "pending": "Pending",
                "active": "Active",
                "locked": "Locked"
            },
            "permissions": {
                "title": "Permissions for ",
                "apiAccess": "API access",
                "payreq": "User type",
                "contacts": "Contacts permission",
                "registrations": "Registrations permission",
                "bills": "Mail permission",
                "billerSettings": "Mailer settings permission",
                "emptyPrompt": "No access",
                "subBillerEmptyPrompt": "Inherit from parent biller"
            },
            "apiUserRoleId": "9",

            "notificationUpdateSuccessMessage": "Notification settings updated successfully.",
            "notificationsIntro": "Notification emails can be sent to your registered email address when specific events occur in the Payreq system. Each notification can be sent at a particular frequency.",
            "notificationsTitle": "Notifications Settings for",
            "notificationPreferenceValues": {
                "never": "Never",
                "immediate": "Immediately",
                "frequent": "Hourly",
                "infrequent": "Daily",
                "immediateDescription": "The notification will be sent as soon as the event happens.",
                "frequentDescription": "All notifications for the event that occur within the hour will be sent as a single notification on the hour.",
                "infrequentDescription": "All notifications for the event that occur during the day will be sent as a single notification at the end of the day."
            },
            "notificationPreferenceDescription": {
                "autopayment.created": "Auto Payment created",
                "bill.waiting": "A mail could not be sent due to awaiting for approval",
                "account.permissions": "Permissions on this account have been modified",
                "registration.failed": "A payer registration has failed",
                "bill.nondelivery": "Channel partner was unable to deliver a document",
                "registration.complete": "A payer registration has been successful",
                "registration.waiting": "A failed pending payer registration is waiting for approval",
                "bill.processed": "A mail was successfully sent",
                "bill.draft": "A mail could not be sent due to being in error",
                "deregistration.complete": "A payer has been successfully deregistered",
                "contact.rejected": "A contact was rejected by an upstream provider",
                "bill.awaitingcredit": "A mail could not be sent due to insufficient credit",
                "job.failed": "A job has failed",
                "registration.contactchanged": "A payer registration flagged for possible deregistration",
                "bill.pendingregistration": "A mail could not be sent due to no registration",
                "bill.contactchanged": "A mail could not be sent due to the registration being flagged for possible deregistration"
            },

            "passwordEvents": {
                "noEventsFound": "No events found for this user",
                "eventList": {
                    "reset-password": "Password reset",
                    "request-reset-password": "Password reset request"
                },
            },
            "frequency": "Frequency",
            "method": "Method",
            "alertTypes": {
                "email": "Email"
            },
            "payerInstructions": "This page allows you to manage the user logins that have access to this account.",
            "mfaActivateModalHeading": "Activate Multi-Factor Authentication",
            "mfaActivateModalText": "Are you sure you want to activate <strong>Multi-Factor Authentication</strong> for all users?",
            "mfaActivateModalCancel": "Cancel",
            "mfaActivateModalActivate": "Activate",

            "revokeModalHeading": "Revoke all access",
            "revokeModalText": "Are you sure you want to revoke all access for <strong>{{revokeAllAccessUser.email}}</strong>?",
            "revokeModalCancelButton": "Cancel",
            "revokeModalSubmitButton": "Revoke all access",
            "revokeAccessSuccess": "All access successfully revoked for %@.",
            "revokeAccessFailed": "An error occurred while revoking all access for the user. Please try again later.",

            "updateRoleSuccessful": "Permission updated successfully.",
            "updateRoleFailed": "An error occurred while updating the permission. Please try again later.",
            "updateNotificationSuccessful": "Notification settings updated successfully.",
            "updateNotificationFailed": "An error occurred while updating notification settings. Please try again later.",
            "resendInviteSuccessful": "An email has been sent to %@ with an invitation code.",
            "resendInviteFailed": "An error occurred while resending an invite for the user. Please try again later.",
            "savedUser": "Successfully updated user.",
            "savedUserError": "An error occurred while updating the selected user. Please try again later.",
            "savedUserUnsuccessful": "Unable to update the selected user. Please contact Payreq support.",

            "inviteExistingUserSuccess": "User with email address %@ assigned selected permissions for this customer.",
            "inviteNewUserSuccess": "An email has been sent to %@ with an invitation code.",
            "inviteUserFailed": "An error occurred while inviting the new user. Please try again later.",
            "inviteUnsuccessful": "Unable to invite new user. Please contact Payreq support."
        },

        "connectionSettings": {
            "headingSme": "Accounting Software Connections",
            "connected": "Connected",
            "reconnect": "Reconnection required",
            "disconnected": "Disconnected",
            "headingAgents": "Property Management Software Connections",
            "disconnect": "Disconnect",
            "cancel": "Cancel",
            "or": "OR",
            "connectionDate": "Connected Since: ",

            "xero": {
                "product": "Xero",
                "authorisationIssue": "Unable to connect to Xero due to an Authorization error. Please reconnect to xero.",
                "connectionIssue": "Unable to connect to Xero",
                "partnerStatus": "Partner Status: ",
                "usageHeader": "Payreq Xero Usage",
                "usageMessage1": "The only information accessed by Payreq from your Xero account is:",
                "usageMessage2": "Your general ledger account codes to allow you select an account code for your invoice. Only the account code selected is stored in Payreq.",
                "usageMessage3": "Your company name. This is stored in Payreq and is visible to your registered billers.",
                "usageMessage4": "No other information from Xero is accessed by Payreq, registered billers or any other third party.",
                "usageMessage5": "Payreq will use your Xero connection to push biller invoices into your Xero accounts payable.",
                "disconnectMessage": "Disconnect from Xero",
                "modalMessage": "Are you sure you want disconnect from <strong>Xero</strong>? All Xero Connect subscriptions will be de-activated."
            },

            "myob": {
                "product": "MYOB",
                "authorisationIssue": "Unable to connect to MYOB due to an Authorization error. Please reconnect to MYOB.",
                "usernameDetailLabel": "MYOB User Name: ",
                "productDetailLabel": "MYOB Product: ",
                "reconnectButton": "Reconnect to MYOB",
                "usageHeading": "Payreq MYOB Usage",
                "usageMessage1": "Payreq needs to access your MYOB account to obtain the following details:",
                "usageMessage2": "Your MYOB Business Names and Identifiers to allow you to select the MYOB Business for invoice delivery. Only the Business Identifier is stored n Payreq.",
                "usageMessage3": "Your profile Username. This is stored in Payreq and is visible to your registered Billers.",
                "usageMessage4": "No other information form MYOB is accessed by Payreq, registered Billers or any other third party.",
                "usageMessage5": "Payreq will use your MYOB connection to create a Supplier Contact if authorised by you and push biller invoices to your MYOB InTray.",
                "productLabel": "MYOB Product",
                "connectButton": "Connect to MYOB",
                "disconnectMessage": "Disconnect from MYOB",
                "modalMessage": "Are you sure you want disconnect from <strong>MYOB</strong>? All MYOB subscriptions will be de-activated."
            },

            "reckon":{
                "product": "Reckon Accounts Hosted",
                "authorisationIssue": "Unable to connect to Reckon due to an Authorization error. Please reconnect to Reckon.",
                "unableToConnect": "Unable to connect to Reckon",
                "disconnectMessage": "Disconnect from Reckon",
                "usageHeading": "Payreq Reckon Accounts Hosted Usage",
                "usageMessage1": "The only information accessed by Payreq from your Reckon Hosted account is:",
                "usageMessage2": "Your general ledger account codes to allow you select an account code for your invoice. Only the ID of the account code selected is stored in Payreq.",
                "usageMessage3": "Your suppliers to allow you to select a supplier for your invoice. Only the ID of the account code selected is stored in Payreq.",
                "usageMessage4": "Your tax codes to allow you to select a sale tax code for your invoice. Only the ID of the tax code selected is stored in Payreq.",
                "usageMessage5": "No other information from Reckon is accessed by Payreq, registered billers or any other third party.",
                "usageMessage6": "Payreq will use your Reckon connection to push biller invoices into your Reckon accounts payable.",
                "productCountry": "Reckon Product Country",
                "message1": "For a company file that <strong>is not</strong> shared with other users Q:\\File name.QBW E.g. Q:\\API2019.QBW",
                "message2": "For a company file that <strong>is</strong> shared with other users \\\\Shared-Folder-Name\\FileName.QBW or \\\\\\\\Shared-Folder-Name\\\\FileName.QBW or \\\\FS-Path\\Full-Shared-Folder-Name\\File name.QBW or \\\\\\\\FS-Path\\\\Full-Shared-Folder-Name\\\\File name.QBW E.g. \\\\\\\\api2019\\\\API2019.QBW or \\\\\\\\RAH-FSS-07-AP2A\\\\067185-1574783-API2019\\\\API2019.QBW.",
                "message3": "Click <a href=\"https://help.payreq.com/en/support/solutions/articles/11000091756\">here</a> for more information on finding your company file path.",
                "companyFile": "Reckon Company File",
                "companyFileUsername": "Reckon Accounts Hosted Company File Username",
                "companyFilePassword": "Reckon Accounts Hosted Company File Password",
                "modalMessage": "Are you sure you want disconnect from <strong>Reckon</strong>? All Reckon subscriptions will be de-activated.",
                "updateMessage": "Update Reckon Connection"
            },

            "propertyMe": {
                "product": "PropertyMe",
                "reconnect": "Reconnect to PropertyMe",
                "needsAttention": "Unable to connect to PropertyMe due to an Authorization error. Please reconnect to PropertyMe.",
                "usageHeading": "Payreq PropertyMe Usage",
                "usageLine1": "Payreq needs to access your PropertyMe portfolio to obtain the following details:",
                "usageLine2": "Your PropertyMe Supplier Contacts to link the PropertyMe supplier to the same Payreq Biller. Only the Supplier Contact Name and Identifier is stored in Payreq.",
                "usageLine3": "Your PropertyMe Properties to link the PropertyMe property to the same Payreq Biller and account number. Only the Property Address and Identifier is stored in Payreq.",
                "usageLine4": "No other information from PropertyMe is accessed by Payreq, registered Billers or any other third party.",
                "usageLine5": "Payreq will use your PropertyMe connection to push Biller bills to your PropertyMe Bills.",
                "button": "Connect to PropertyMe",
                "buttonDisconnect": "Disconnect from PropertyMe",
                "modalMessage": "Are you sure you want disconnect from <strong>PropertyMe</strong>? All PropertyMe forwarding rules will be removed."
            }
        },

        "accountingPlan": {
            "accountingPlan": "Accounting plan",
            "totalRemainingHeader": "Total credit remaining for this period",
            "totalPayStubRemainingHeader" : "Total Paystub credit remaining for this period",
            "totalNonPayStubRemainingHeader" : "Total Non-Paystub credit remaining for this period",
            "purchaseButton": "Purchase credits",
            "name": "Name",
            "creditRemaining": "Credit remaining",
            "expiresOn": "Expires/Rollsover on",
            "selectPlansToPurchase": "Select plans to purchase",
            "checkout": "Checkout",
            "backButton": "Back",
            "proceedToPay": "Proceed to pay",
            "purchaseAccountingPlans": "Purchase accounting plans",
            "unitCost": "Unit cost",
            "quantity": "Quantity",
            "total": "Total",
            "subTotal": "Sub total",
            "totalPayable": "Total payable",
            "transationHistoryTitle": "Accounting Plan Transaction History",
            "transationHistorySubTitle": "History of all accounting plan purchases made",
            "paymentDate": "Payment date",
            "tax": "Tax",
            "invoice": "Invoice",
            "noPaymentsMade": "No payments have been made.",
            "billerCredits": "Credits being used by:",

            "accountingPlanGroups": {
                "pay-stub": "Paystub credits",
                "non-pay-stub": "Non-Paystub credits",
                "oversize-credit": "Oversize credits",
                "combo": "Bundles/combo",
            },
            "gatewaySetupHeading": "Payment Gateway Configuration",
            "gatewaySetupAction1": "Click",
            "gatewaySetupAction2": "here",
            "gatewaySetupAction3": "to view or edit your payment gateway configuration for accepting bill payments",

            "payDockIFrameSource": "%@?public_key=%@&configuration_token=%@&background_color=%23ffffff&background_color=%23ffffff&fields_validation=true&title=Pay%20for%20accounting%20plan&background_color=%23ffffff&button_color=%23357ebd&fields_validation=true&supported_card_types=mastercard,visa"
        },

        "uploadMailTemplateTitle": "Upload new shared document",
        "uploadMailTemplateNameLabel": "Name",
        "uploadMailTemplateCancel": "Cancel",
        "uploadMailTemplateConfirm": "Upload",
        "uploadBillTemplateButton": "Upload document"
    },

    "bpv": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },

    "epost": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Dispatching",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Subscriptions",
            "checkCredentials": "Check Credentials in Accounting System",
            "reviewFailedReg": "Review Failed Subscriptions",
            "authenticationFields": "Contact Verification Fields",
            "checkPotentialDeregistration": "Check for potential deactivations?",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "cannotUncheckPotentialDeregistration": "Still subscriptions marked for potential deactivation",
            "holdContactChangedBill": "Don't send mail if any subscriptions are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if subscriptions are flagged for potential deactivation",

            "emailAddress": "Incoming mail email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward mail to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other mailers in group",
            "childBiller": "Permissions for Mailer",
            "phoneNumberFormat": "+x xxx xxx xxxx",

            "roles": {
                "1": "Subscription Viewer",
                "2": "Subscription Approver",
                "3": "Mailer Settings Administrator",
                "4": "Mail Viewer",
                "5": "Mail Manager",
                "100": "Incoming Mail Manager",
                "12": "Mail Viewer - No PDF Document",
            },

            "notificationPreferenceDescription": {
                "registration.failed": "A subscription has failed",
                "bill.nondelivery": "Unable to deliver a document",
                "registration.complete": "A subscription has been successful",
                "registration.contactchanged": "A subscription is flagged for possible deactivation",
                "deregistration.complete": "A subscription has been deactivated",
                "registration.waiting": "A subscription is waiting for approval",
                "bill.contactchanged": "A mail could not be sent due to the subscription being flagged for possible deactivation"
            }
        }
    },

    "xeroconnect": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },

    "myob": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },

    "email": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },

    "mybillsagent": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },

    "einvoicing": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },

    "mybills": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any subscriptions are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if subscriptions are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },

    "reckon": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },


    "dm": {
        "biller": "Provider",
        "bills": "Documents",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Documents Before Dispatching",
            "saveBillWithoutRegistration": "Save Documents Without ACTIVE Subscriptions",
            "checkCredentials": "Check Credentials in Accounting System",
            "reviewFailedReg": "Review Failed Subscriptions",
            "authenticationFields": "Contact Verification Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any registrations are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if registrations are flagged for potential deactivation",

            "emailAddress": "Incoming mail email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward documents to Payreq for this provider without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all providers in group <strong>%@</strong>. You can also invite a new or existing user to manage this provider, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Provider settings",
            "childBillersInstructions": "You can also add roles for users linked to other providers in group",
            "childBiller": "Permissions for Provider",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "roles": {
                "1": "Subscription Viewer",
                "2": "Subscription Approver",
                "3": "Provider Settings Administrator",
                "4": "Document Viewer",
                "5": "Document Manager",
                "100": "Incoming Documents Manager",
                "12": "Mail Viewer - No PDF Document",
            },

            "notificationPreferenceDescription": {
                "bill.nondelivery": "DM was unable to deliver a document"
            }
        }
    },

    "epost-payreqmypay": {
        "userSettings": {
            "notificationPreferenceDescription": {
                "bill.nondelivery": "MyPay was unable to deliver a document"
            }
        }
    },

    "mybills-bills": {
        "biller": "Mailer",
        "bills": "Mail",

        "billerSettings": {
            "reviewBillBeforeSending": "Review Mail Before Sending",
            "saveBillWithoutRegistration": "Save Mail Without ACTIVE Registrations",
            "contactRequiredForRegistationApproval": "Contact MUST exist for registration",
            "allowAgentRegistrationsFromContacts": "Allow MyBills Agent registrations from contacts",
            "checkCredentials": "Check Credentials in Billing System",
            "reviewFailedReg": "Review Failed Registrations",
            "authenticationFields": "BPAY View Authentication Fields",
            "checkPotentialDeregistration": "Check for potential deregistrations?",
            "cannotUncheckPotentialDeregistration": "Still registrations marked for potential deregistration",
            "holdContactChangedBill": "Don't send mail if any subscriptions are flagged for potential deactivation",
            "noUploadPotentialDeregistration": "Don't allow mail upload if subscriptions are flagged for potential deactivation",

            "emailAddress": "Invoice email address",
            "noEmailAddress": "No email address has been generated. You will be unable to forward invoices to Payreq for this mailer without an email address.",
        },

        "userSettings": {
            "instructions": "This page allows you to modify existing user's info & roles for all mailers in group <strong>%@</strong>. You can also invite a new or existing user to manage this mailer, by clicking the <strong>Plus button</strong> under the user list.",
            "billerSettings": "Mailer settings",
            "childBillersInstructions": "You can also add roles for users linked to other billers in group",
            "childBiller": "Permissions for Biller",
            "phoneNumberFormat": "+xx xxx xxx xxx",

            "notificationPreferenceDescription": {
                "bill.nondelivery": "A mail could not be delivered"
            }
        }
    },
});
