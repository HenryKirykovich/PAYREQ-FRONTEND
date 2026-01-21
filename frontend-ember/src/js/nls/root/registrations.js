define({
    "all": {
        "registered": "Active",
        "pendingFailed": "Pending failed",
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
        "cancel": "Cancel",
        "deregisterConfirm": "Deregister",
        "confirmExport": "Download csv file",

        "payreqSupport": "Payreq Support",
        "notAvailable": "N/A",

        "channels": {
            "archive": "Payreq (via archive)",
            "bpv": "BPAY View",
            "dm": "Australia Post Digital Mailbox",
            "einvoicing": "eInvoicing",
            "email": "Payreq",
            "epost": "EPost",
            "mastercard-bpx": "Mastercard",
            "mybills": "Payreq",
            "mybills-bills": "Payreq",
            "mybillsagent": "Payreq Group",
            "myob": "Payreq MYOB",
            "print": "Physical Copy",
            "reckon": "Payreq Reckon Accounts Hosted",
            "xeroconnect": "Payreq Xero"
        },

        "fastformEmail": "FastForm Email",
        "manualEmail": "Manual Email",

        "newContactName": "New customer name",
        "contactUpdatedOn": "Customer name updated on",
        "acceptContactChange": "Accept customer name change",
        "noContactValue": "No Value",

        "exportModal": {
            "previousExport": "A previous export",
            "previousExportInstructions": "Select a previous export",
            "firstExport": "First export",
            "allRegistrationsSinceSelectInstructions": "Select a previous export",
        },

        "deregistrationModal": {},

        "statuses": {
            "inactive": "Failed",
            "active": "Active",
            "failed-auth-awaiting-manual": "Failed, pending manual",
            "unprocessed": "Pending processing",
            "confirmation-required": "External update required"
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
            "deactivation-biller-no-paper-bills": "Service cancelled by Mailer - paper mail will not recommence",
            "deactivation-customer-not-owner-manager": "Return to sender - Not the owner/manager of the account",
            "deactivation-customer-property-no-longer-managed": "Property no longer managed by agent",
            "deactivation-biller-ownership-transfer": "Service cancelled by Mailer due to ownership transfer",
            "deactivation-biller-subdivision": "Service cancelled by Mailer due to subdivision",
            "deactivation-mybills-takeover": "Payreq MyBills account created",
            "deactivation-biller-managing-agent": "Service cancelled by Mailer due to notification from managing agent",
            "deactivation-customer-email-bouncing": "Service cancelled due to bouncing customer email",
            "deactivation-einvoicing-terminated" : "Business Identifier no longer registered for eInvoicing"
        },

        "registrationApprovalCodeString": {
            "undefined": "N/A",
            "automatic": "Automatic",
            "manual": "Manual"
        },

        "acceptNewOwner": "Enter New Owner Name",
        "acceptNewOwnerInstructions": "Enter the name of the new owner as it appear on the bill.",
        "acceptNewOwnerName": "New Owner Name",

        "helpMsg": {
            "pendingFailed": "Registrations that have not validated successfully against a contact. <br/> <strong>Action: </strong> Click on each registration to review the Authentication Fields entered. For valid registrations click 'Approve this registration' otherwise click 'Registration has failed, because...' and select an appropriate reason",
            "registered": "Active registrations for digital mail",
            "contactChanged": "Registration where the contact name has changed. Eg. Property has changed hands. <br/> <strong>Action: </strong> Click on each registration to review the contact name change. For valid name changes click 'Accept customer name change' otherwise click 'Deregister' and select an appropriate option",
            "deregistered": "Registrations that have deregistered",
            "failed": "Registrations that have failed initial validation",
            "all": "All registrations"
        },

        "externalConfirmation": {
            "deactivated": "Please confirm you have deleted the Payreq email address from the corresponding contact record in your external system",
            "activated": "Please confirm you have added the above email address to the corresponding contact record in your external system and that the email template is the correct Payreq template"
        },

        "previous": "previous",
        "next": "next",
        "goToNextRecord": "Go to next record automatically",
        "accountNumberNoCheckDigit": "Account Number without check digit",
        "autoPayment": {
            "heading": "Auto payment details",
            "activeFrom": "Active for bills issued after",
            "amountPayable": {
                "label": "Amount payable",
                "min": "Quarterly/minimum",
                "total": "Annual/total"
            },
            "limit": "Limit ($)",
            "noLimit": "Not specified",
            "paymentDay": {
                "label": "Payment day",
                "due-date": "Due date",
                "received-date": "Received date",
            },
            "nextBillForAutoPayment": "Next bill for auto payment",
            "nextBillLink": "view bill",
            "noNextBill": "No upcoming bills will be auto paid",
            "status": {
                "scheduled": "Scheduled",
                "failed": "Failed payment",
                "above-limit": "Above limit set by payer"
            }
        }
        ,
    },

    "bpv": {
        "deregistered": "Deregistered",
        "billerAccountNumber": "BVRN",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",
        "mobiles": "Mobiles",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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
        "contactChanged": "Deactivate?",

        "deregistered": "Deactivated",
        "billerAccountNumber": "Employee ID",
        "extPayerName": "Subscription name",
        "payerName": "Employee name",
        "dateGenerated": "Subscription date",
        "deactivationDate": "Deactivation date",

        "payerDetails": "Account subscription details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Subscription method",
        "registrationDate": "Subscription date",
        "deregistrationDate": "Deactivation date",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deactivate...",
        "deregister": "Deactivate",
        "viewAuthenticationFields": "View subscription verification fields",
        "authenticationFields": "Subscription verification fields",

        "approveRegistration": "Approve this subscription",
        "rejectRegistrationEpost": "Fail this subscription",
        "employeeNameField": "Employee Name",
        "userEntered": "Employee has entered",
        "contactDetails": "Your Contact has",

        "missingAuthenticationField": "No Value Entered",
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
            "file": "Select file for import:"
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

        "helpMsg": {
            "registered": "Active subscription",
            "contactChanged": "Subscriptions where the contact name has changed. Eg. Property has changed hands. <br/> <strong>Action: </strong> Click on each registration to review the contact name change. For valid name changes click 'Accept customer name change' otherwise click 'Deregister' and select an appropriate option",
            "deregistered": "Subscriptions that have deregistered",
            "failed": "Subscriptions that have failed initial validation",
            "all": "All subscriptions"
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
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",

        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "Payer did not submit a value for this field",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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

    "dm": {
        "deregistered": "Deactivated",
        "billerAccountNumber": "Account number",
        "extPayerName": "Subscription name",
        "payerName": "Account name",
        "dateGenerated": "Subscription date",
        "deactivationDate": "Deactivation date",
        "emails": "Emails",

        "payerDetails": "Account subscription details",
        "destinationEmailAddress": "Payreq document email address",
        "registrationMethod": "Subscription method",
        "registrationDate": "Subscription date",
        "deregistrationDate": "Deactivation date",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deactivate...",
        "deregister": "Deactivate",
        "viewAuthenticationFields": "View subscription verification fields",
        "authenticationFields": "Subscription verification fields",

        "missingAuthenticationField": "No Value Entered",
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
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Subscription has failed, because...",
        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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

    "mybills-bills": {
        "deregistered": "Deregistered",
        "billerAccountNumber": "Account number",
        "extPayerId": "Payer Id",
        "extPayerName": "Payer name",
        "payerName": "Customer name",
        "dateGenerated": "Registration date",
        "deactivationDate": "Deregistration date",
        "emails": "Emails",

        "payerDetails": "Payer details",
        "destinationEmailAddress": "Payreq mail email address",
        "registrationMethod": "Registration method",
        "registrationDate": "Registration date",
        "deregistrationDate": "Deregistration date",
        "deregistrationReason": "Deregistration reason",
        "deregisteredBy": "Deregistered by",

        "deregisterSelect": "Deregister...",
        "deregister": "Deregister",
        "viewAuthenticationFields": "View registration authentication fields",
        "authenticationFields": "Registration authentication fields",
        "missingAuthenticationField": "No Value Entered",
        "fieldsNotRequired": "This mailer does not require authentication fields for registering payers.",

        "approveRegistration": "Approve this registration",
        "approveRegistrationOptions": "Approve this registration...",
        "approveRegistrationCurrent": "Approve current owner",
        "approveRegistrationNew": "Approve new owner",
        "rejectRegistration": "Registration has failed, because...",

        "userEntered": "Customer has Entered",
        "contactDetails": "Your Contact has",

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
            "file": "Select file for import:"
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

});
