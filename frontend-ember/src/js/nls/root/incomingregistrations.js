define({
    "all": {
        "active": "Active",
        "pendingFailed": "Pending failed",
        "pending": "Pending",
        "externalUpdateRequired": "External update required",
        "failed": "Failed",
        "contactChanged": "Deregister?",
        "all": "All",

        "backToPayerRegistrations": "Back to list",

        "status": "Status",
        "registrationApprovalCode": "Registration method",
        "contactUpdatedOn": "Updated on",
        "contactExists": "Contact Exists",
        "channelPartnerSystemId": "Channel",
        "contactId": "Contact ID",
        "action": "Action",
        "click": "Click",
        "here": "here",

        "newContactName": "New customer name",
        "contactUpdatedOn": "Customer name updated on",
        "acceptContactChange": "Accept customer name change",

        "channels": {
            "bpv": "BPAY View",
            "epost": "EPost",
            "xeroconnect": "Xero",
            "email": "Email",
            "myob": "MYOB",
            "mybillsagent": "MyBills Agent",
            "mybills": "MyBills",
            "reckon": "Reckon Accounts Hosted",
            "einvoicing": "eInvoicing",
            "archive": "MyBills (via archive)",
        },

        "myobProducts": {
            "1": "Essentials AU",
            "2": "Essentials NZ",
            "3": "AccountRight"
        },

        "exportModal": {
            "previousExport": "A previous export",
            "previousExportInstructions": "Select a previous export",
            "firstExport": "First export",
            "allRegistrationsSinceSelectInstructions": "Select a previous export",
        },

        "statusDisplay": {
            "pending": "Awaiting Biller Approval",
            "active": "Active",
            "deregistered": "Deregistered",
            "failed": "Failed"
        },

        "mybillsagentImportModal": {
            "title": "Import MyBills Agent Registrations from CSV",
            "importTypeDisplay": "Replace all contacts with file values. If a contact does not exist in the file will be deleted.",
            "importConfirmation": "Import summary listed below. Press Import Contacts button to continue.<br>%@",
            "validating": "Validating the import...",
            "error": {
                "fileAlreadyUploadedConfirm": "The selected file has been processed previously in the job listed below. If you are sure that you wish to process this file again, press the Import Contacts button below.",
                "fileAlreadyUploadedRunning": "The selected file cannot be processed, as another job is currently processing the same file."
            },
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br>%@%@",
        },

        "deregistrationModal": {},

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence",
            "deactivation-customer-not-owner-manager": "Return to sender - Not the owner/manager of the account",
            "deactivation-customer-property-no-longer-managed": "Property no longer managed by agent",
            "deactivation-biller-ownership-transfer": "Service cancelled by Mailer due to ownership transfer",
            "deactivation-biller-subdivision": "Service cancelled by Mailer due to subdivision",
            "deactivation-biller-managing-agent": "Service cancelled by Mailer due to notification from managing agent",
            "deactivation-customer-email-bouncing": "Service cancelled due to bouncing customer email",
            "deactivation-einvoicing-terminated" : "Business Identifier no longer registered for eInvoicing"
        },

        "statuses": {
            "inactive": "Failed",
            "active": "Active",
            "failed-auth-awaiting-manual": "Failed, pending manual",
            "unprocessed": "Pending processing",
            "confirmation-required": "External update required"
        },

        "registrationApprovalCodeString": {
            "undefined": "N/A",
            "automatic": "Automatic",
            "manual": "Manual"
        },

        "externalConfirmation": {
            "deactivated": "Please confirm you have deleted the Payreq email address from the corresponding contact record in your external system",
            "activated": "Please confirm you have added the above email address to the corresponding contact record in your external system and that the email template is the correct Payreq template"
        },

        "previous": "previous",
        "next": "next",
        "goToNextRecord": "Go to next record automatically",

        "deregModalTitle": "Unsubscribe",
        "deregModalTextLine1": "Unsubscribing will stop digital delivery of bills and cancel any Payreq Auto Payment schedules associated with this subscription.",
        "deregModalTextLine2": "Are you sure you want to unsubscribe?",
        "deregModalCancel": "Cancel",
        "deregModalSubmit": "Unsubscribe",

        "importText": {
            "heading": "Import Payreq MyBills Agent Registrations",
            "backButton": "Back",
            "text": "Copy/Paste registrations from an Excel spreadsheet with two columns.",
            "column1": "Column 1",
            "column2": "Column 2",
            "importButton": "Import",
            "noRegos": "No Payreq MyBills Agent Registration to Import.",
            "successMessage": "Payreq MyBills Agent Registration Imported.",
            "errorMessage": "We are unable to import your registrations. Please contact Payreq Support."
        }
    },

    "bpv": {
        "deregistered": "Deregistered",
        "accountNumber": "Account Number",
        "tagName": "Biller",
        "billerId": "Biller Code",
        "createdDate": "Created Date",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivatedDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "BVRN could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "BPay View Reference Number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "epost": {
        "billerAccountNumber": "Employee ID",
        "contactChanged": "Deactivate?",

        "deregistered": "Deactivated",
        "accountNumber": "Account number",
        "extPayerName": "Subscription name",
        "payerName": "Employee name",
        "dateGenerated": "Subscription date",
        "deactivationDate": "Deactivation date",

        "payerDetails": "Account subscription details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Subscription method",
        "registrationDate": "Subscription date",
        "deregistrationDate": "Deactivation date",

        "deregisterSelect": "Deactivate...",
        "deregister": "Deactivate",
        "viewAuthenticationFields": "View subscription verification fields",
        "authenticationFields": "Subscription verification fields",

        "missingAuthenticationField": "Account owner did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require verification fields for subscribing accounts.",

        "exportModal": {
            "instructions": "Choose a subscription file to export, then click the <em>Download csv</em> button below.",
            "title": "Export subscriptions",

            "allRegistrationsSinceLast": "All subscription changes since last export",
            "allRegistrationsSinceLastInstructions": "The last subscription export from this mailer included subscriptions up until",
            "allRegistrationsSinceSelect": "All subscription changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current subscription snapshot",
            "currentSnapshotInstructions1": "All account subscriptions and deactivations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have subscribed to receive the mail.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> accounts currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All subscriptions as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all subscriptions and deactivations since %@2",
                "from-previous-export": "The downloaded file will contain all subscriptions and deactivations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all subscriptions, as of now"
            },
        },

        "deregistrationModal": {
            "instructions": "Choose a file with account numbers to deactivate (one account number per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ account numbers, of which the system has %@ subscriptions(s).",
            "viewUnmatched": "to view the unmatched account numbers",
        },

        "statuses": {
            "deregistered": "Deactivated",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Account is fully active",
            "activation-biller-account-number-not-found": "The account number that was provided could not be found",
            "activation-name-does-not-match": "The account name did not match",
            "activation-contact-biller-generic": "The account owner was asked to contact the mailer for confirmation",
            "activation-already-registered": "The account is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by account owner",
            "deactivation-customer-no-paper-bills": "Service cancelled by account owner",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by mailer",
            "deactivation-biller-no-paper-bills": "Service cancelled by mailer"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No subscriptions found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Mail to be processed by Payreq should be sent to this email address",
        }
    },

    "xeroconnect": {
        "deregistered": "Deregistered",
        "accountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "mybillsagent": {
        "deregistered": "Deregistered",
        "accountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "einvoicing": {
        "deregistered": "Deregistered",
        "accountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "mybills": {
        "deregistered": "Deregistered",
        "accountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "myob": {
        "deregistered": "Deregistered",
        "accountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "email": {
        "deregistered": "Deregistered",
        "accountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer BVRN that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "reckon": {
        "deregistered": "Deregistered",
        "accountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "rejectRegistration": "Registration has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the registration data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the registration data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>BVRN</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the mailer for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "exportModal": {
            "instructions": "Choose a registration file to export, then click the <em>Download csv</em> button below.",
            "title": "Export registrations",

            "allRegistrationsSinceLast": "All registration changes since last export",
            "allRegistrationsSinceLastInstructions": "The last registration export from this mailer included registrations up until",
            "allRegistrationsSinceSelect": "All registration changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current registration snapshot",
            "currentSnapshotInstructions1": "All customer registrations and deregistrations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have registered to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> BVRNs currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All registrations as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all registrations and deregistrations since %@2",
                "from-previous-export": "The downloaded file will contain all registrations and deregistrations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all registrations, as of now"
            }
        },

        "deregistrationModal": {
            "instructions": "Choose a file with BVRNs to deregister (one BVRN per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ BVRNs, of which the system has %@ registration(s).",
            "viewUnmatched": "to view the unmatched BVRNs",
        },

        "statuses": {
            "deregistered": "Deregistered",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Payer is fully active, paper mail have been stopped",
            "activation-data-insufficient": "Payer could not be processed because the information they entered at time of registration was incomplete",
            "activation-data-not-correct": "Payer could not be processed because the information they entered at time of registration was incorrect",
            "activation-biller-account-number-not-found": "The payer Account Number that was provided could not be found",
            "activation-name-does-not-match": "The payer's name did not match",
            "activation-contact-biller-generic": "The payer was asked to contact the mailer for confirmation",
            "activation-already-registered": "The payer is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by payer - paper mail will recommence",
            "deactivation-customer-no-paper-bills": "Service cancelled by payer - paper mail will not recommence",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by Mailer - paper mail will recommence",
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No payer registrations found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this mailer yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Invoices to be processed by Payreq should be sent to this email address",
            "authenticationValue": "This is the authentication value Payreq received from BPAY",
            "authenticationExpectedValue": "Payreq expected to receive this value, as it was registered to the BVRN via a Contact",
        }
    },

    "dm": {
        "deregistered": "Deactivated",
        "billerAccountNumber": "Account number",
        "extPayerName": "Subscription name",
        "payerName": "Account name",
        "dateGenerated": "Subscription date",
        "deactivationDate": "Deactivation date",

        "payerDetails": "Account subscription details",
        "destinationEmailAddress": "Payreq document email address",
        "registrationMethod": "Subscription method",
        "registrationDate": "Subscription date",
        "deregistrationDate": "Deactivation date",

        "deregisterSelect": "Deactivate...",
        "deregister": "Deactivate",
        "viewAuthenticationFields": "View subscription verification fields",
        "authenticationFields": "Subscription verification fields",

        "missingAuthenticationField": "Account owner did not submit a value for this field",
        "fieldsNotRequired": "This provider does not require verification fields for subscribing accounts.",

        "exportModal": {
            "instructions": "Choose a subscription file to export, then click the <em>Download csv</em> button below.",
            "title": "Export subscriptions",

            "allRegistrationsSinceLast": "All subscription changes since last export",
            "allRegistrationsSinceLastInstructions": "The last subscription export from this mailer included subscriptions up until",
            "allRegistrationsSinceSelect": "All subscription changes from a previous export until <em>now</em>",

            "currentSnapshot": "Current subscription snapshot",
            "currentSnapshotInstructions1": "All account subscriptions and deactivations as of <em>now.</em> Note that there will be only one row per customer account regardless of how many people have subscribed to receive the document.",
            "currentSnapshotInstructions2": "This will not be recorded as a previous export, and will not be displayed in the lists above.",
            "currentSnapshotDataSummary": "There are <strong>%@</strong> accounts currently active",
            "currentSnapshotDataStats": "(%@% of %@ Contacts)",

            "firstExportInstructions1": "This is the first export for this biller. All subscriptions as of <em>now</em> will be included.",

            "selectedSummary": {
                "summary": "%@",
                "last-export": "The downloaded file will contain all subscriptions and deactivations since %@2",
                "from-previous-export": "The downloaded file will contain all subscriptions and deactivations since %@2 til now",
                "previous-export": "Downloading the previous export: %@ To %@",
                "current-snapshot": "The downloaded file will contain a current snapshot of the status of all subscriptions, as of now"
            },
        },

        "approveRegistration": "Approve this subscription",
        "rejectRegistration": "Subscription has failed, because...",

        "rejectReason": {
            "activationDataInsufficient": "the subscription data is <strong>incomplete</strong> <span class='text-muted'>(values are missing, not enough information provided)</span>",
            "activationDataNotCorrect": "the subscription data is <strong>not correct</strong>",
            "activationBillerAccountNumberNotFound": "the <strong>Account Number</strong> entered is incorrect or cannot be found",
            "activationNameDoesNotMatch": "the contact <strong>name</strong> could not be found",
            "activationContactBillerGeneric": "the payer needs to contact the provider for confirmation",
            "activationNotManagingAgent": "the biller hasn't received notification from the managing agent",
        },

        "deregistrationModal": {
            "instructions": "Choose a file with account numbers to deactivate (one account number per line) and wait for the confirmation information to appear",
            "summary": "You have uploaded %@ account numbers, of which the system has %@ subscriptions(s).",
            "viewUnmatched": "to view the unmatched account numbers",
        },

        "statuses": {
            "deregistered": "Deactivated",
        },

        "statusDescription": {
            "activation-paper-bill-stop-immediately": "Account is fully active",
            "activation-biller-account-number-not-found": "The account number that was provided could not be found",
            "activation-name-does-not-match": "The account name did not match",
            "activation-contact-biller-generic": "The account owner was asked to contact the mailer for confirmation",
            "activation-already-registered": "The account is already registered with this mailer in Payreq",
            "activation-not-managing-agent": "The managing agent has not notified the biller",
            "deactivation-customer-paper-bills-recommence": "Service cancelled by account owner",
            "deactivation-customer-no-paper-bills": "Service cancelled by account owner",
            "deactivation-biller-paper-bills-recommence": "Service cancelled by provider",
            "deactivation-biller-no-paper-bills": "Service cancelled by provider"
        },

        "messages": {
            "billerAccountNumberNotFound": "Account number could not be found in invoice system",
            "noRegistrations": "No subscriptions found.",
            "noDestinationEmailAddressYet": "An email has not been generated for this provider yet.",
        },

        "abbrs": {
            "billerAccountNumber": "Account number",
            "destinationEmailAddress": "Documents to be processed by Payreq should be sent to this email address",
        }
    },

    "epost-payreqmypay": {
        "billerAccountNumber": "Employee ID",
        "payerName": "Employee name",
        "contactChanged": "Deactivate?"
    },

});
