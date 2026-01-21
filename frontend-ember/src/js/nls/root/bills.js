define({
    "all": {
        "sendPending": "Pending send",
        "error": "Error",
        "pendingRegistration": "Pending Subscription",
        "sent": "Sent",
        "readyForDispatch": "Queued",
        "archived": "Archived",
        "undelivered": "Undeliverable",
        "undeliveredActioned": "Undeliverable actioned",
        "all": "All",
        "inProgress": "In progress",
        "pending": "Pending",

        "yes": "Yes",
        "no": "No",

        "backToBills": "Back to list",

        "status": "Status",
        "action": "Action",
        "sentTo": "sent to",

        "billStatusPlaceholder": "Select a Status...",

        "minAmountDue": "Minimum amount due",
        "prevAccountBalance": "Previous account balance",
        "accountBalance": "Account balance",
        "createdTime": "Date created",
        "receivedTime": "Received by Payreq",
        "contactId": "Contact ID",
        "sendToPrinter": "Sent By",
        "documentPages": "No. Pages",
        "customerReference": "Customer Reference",

        "print": "Print",
        "digital": "Digital",

        "accountingPlan": "Accounting Plan",
        "availableCreditsPrefixText": "There are",
        "availableCreditsSuffixText": "available for this upload.",

        "splittingIndicatorText": "Documents will be split by <strong>'%@'</strong> indicating a new starting page",
        "splittingEndIndicatorText": "Documents will be split by <strong>'%@'</strong> indicating a end page",

        "uploadInstructions": "Choose a PDF file, wait for the upload to complete, and click the <em>Upload</em> button to execute.",
        "uploadFile": "Select file for upload",
        "uploadContacts": "Contacts instructions",
        "selectBillLoadType": "Load Type",
        "billFormats": "Select mail formats",
        "billFormatsInstructions": "",
        "uploadActions": {
            "cancel": "Cancel",
        },

        "invoiceStatus": "Invoice status",

        "exactSearch": "Search for exact match on Contact ID",
        "exactSearchJobId": "Search for exact match on Job ID",
        "advancedSearch": "Advanced Search on status and template:",

        "deregModalTitle": "Action Required: Registrations in 'Deregister?' tab",
        "deregModalMessage": "There are registration in the 'Deregister?' tab requiring action. Action these to continue uploading mail.",
        "deregModalConfirm": "View",
        "deregModalClose": "Close",

        "externalAction": {
            "cancel": "Cancel",
            "save": "Save action",
            "modalTitle": "Enter external action",
            "title": "External action",
            "actionDescriptionLabel": "Action description",
            "actionedOnLabel": "Actioned on",
            "cancelActionButton": "Cancel external action"
        },

        "downloadModalHeading": "Download Mail",
        "downloadModalTitle": "Download search results of <strong>%@ documents</strong>",
        "mailDownloads": "Download as:",
        "csvOption": "CSV",
        "pdfMergedOption": "Merged PDF",
        "pdfIndividualOption": "Individual PDFs",
        "pagesAllOption": "All pages",
        "pagesFirstOption": "First page of each document",
        "emailNotification": "Email me when the download is complete",
        "pagesTitle": "Document pages to include:",


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

        "validationErrors": "Validation errors",

        "statusLabel": {
            "draft": "Error",
            "review-by-biller": "Approval needed",
            "ready-for-dispatch": "Queued",
            "dispatched": "Sent",
            "ready-for-dispatch-awaiting-credit": "Awaiting credit",
            "rejected": "Rejected",
            "pending-registration": "Awaiting registration",
            "contact-changed": "Contact changed",
            "ready-for-dispatch-archived": "Archived",
            "undelivered": "Sent"
        },

        "validationFailure": {
            "required": "%@1 was not provided, and is required",
            "required-number": "%@1 must be a number and must be provided",
            "number": "%@1 must be a number",
            "minimum-amount-must-be-less-than-due": "Minimum amount must be less than the total amount due",
            "invalid-email-delivery-details": "Invalid email delivery details provided by SFTP"
        },

        "uploadModal": {
            "add": "Update contacts",
            "replace": "Replace contacts",
            "ignore": "Do Not update contacts",

            "billLoadTypes": {
                "standard": "Standard: Mail delivered to registration channels",
                "archive": "Archive: Standard load but mail without registrations will be saved in archive",
                "historical": "Historical: Loading previously sent mail to be saved in archive",
            },

            "errors": {
                "validationErrors": "Validation error occurred while validating first 5 mails for the following formats.",
                "billError": "In %@1, Field : %@2,  Reason : %@3",
                "jobRunning": "The uploaded file is being processed by the following running jobs. Please wait until those jobs finish prior to re-uploading this file."
            }
        },

        "approveAll": "Send all",
        "rejectAll": "Delete all",

        "helpMsg": {
            "error": "Mails that cannot be sent due to validation errors. <br/> <strong>Action: </strong> Please click into mail details to view validation errors.",
            "sendPending": "Mails in pending send require a biller action to be sent. <br/> <strong>Awaiting credit:</strong> requires addition credit to be purchased in Settings > Accounting Plans > Purchase. <br/> <strong>Contact Changed: </strong> Hold mail item from being sent until registration under Deregister? is actioned. <br/> <strong>Awaiting Review:</strong> Mail items waiting review to be sent. To send all mail items in this status click 'Send All' to reject click 'Delete All'.",
            "readyForDispatch": "Mail queued for sending. These will be sent automatically shortly.",
            "archived": "Mail archived and not sent digitally.",
            "sent": "Mails sent to registered payers",
            "undelivered": "Mails that have not been delivered to a registered payer. <br/> <strong>Action:</strong> Billers please print each mail item in this tab and add 'External Action' note in Mail Detail screen once actioned",
            "undeliveredActioned": "Mails that could not been delivered by have been actioned.",
            "all": "All mails",
            "pendingRegistration": "Mails in pending registration are stored until the employee subscribes"
        },

        "billFieldDescription": {
            "account-balance": "Account balance",
            "created-time": "Created time",
            "no-payment-override": "No payment override",
            "amount-due": "Amount due",
            "min-amount-due": "Minimum amount due",
            "prev-account-balance": "Previous account balance",
            "address-line-1": "Auth field 1",
            "end-time": "End time",
            "due-date": "Due date",
            "contact-name": "Contact name",
            "auth-item-1": "Auth field 1",
            "name": "Contact name"
        },

        "template": "Template",

        "billPayer": {
            "nonDeliveredReason": {
                "invalid-expiry-date": "The expiry date in the mail was invalid.",
                "invalid-creation-date": "The creation date of the mail was invalid.",
                "invalid-payer-account": "The payer account details in the mail were invalid.",
                "not-owner-manager": "Return to sender. Not the owner or manager of the account.",
                "olb-failed-to-email-payer": "The payer's financial institution was unable to email the payer.",
                "olb-failed-to-deliver-bill-summary": "The payer's financial institution was unable to deliver the mail to the payer.",
                "bpv-failed-to-deliver-bill-summary-to-olb": "BPay was unable to deliver the mail summary to the payer's financial institution.",
                "xeroconnect/undeliverable": "Payreq was unable to deliver the mail to Xero",
                "xeroconnect/no-active-registration": "Payreq was unable to deliver the mail to Xero, as there was no active registration",
                "email/undeliverable": "Payreq was unable to deliver the mail by Email",
                "email/no-active-email-addresses": "There are no active email addresses for the active payer. Please review registration.",
                "myob/undeliverable": "Payreq was unable to deliver the mail by MYOB",
                "myob/no-active-registration": "Payreq was unable to deliver the mail by MYOB, as there was no active registration",
                "mybillsagent/undeliverable": "Payreq was unable to deliver the mail by MyBills Agent",
                "mybillsagent/no-active-registration": "Payreq was unable to deliver the mail by MyBills Agent, as there was no active registration",
                "mybills/undeliverable": "Payreq was unable to deliver the mail by MyBills",
                "mybills/no-active-registration": "Payreq was unable to deliver the mail, as there was no active registration",
                "reckon/undeliverable": "Payreq was unable to deliver the mail by Reckon",
                "reckon/no-active-registration": "Payreq was unable to deliver the mail by Reckon, as there was no active registration",
                "einvoicing/undeliverable": "Payreq was unable to deliver the mail by eInvoicing",
                "einvoicing/duplicate-invoice-number": "Payreq was unable to send the mail by eInvoicing as the invoice number is a duplicate of one previously sent.",
                "archive/undeliverable": "Payreq was unable to deliver the mail from the archive.",
                "archive/no-active-registration": "Payreq was unable to deliver the mail from the archive, as there was no active registration",
                "mastercard-bpx/undeliverable": "Payreq was unable to deliver the mail by Mastercard",
                "mybills-bills/undeliverable": "Payreq was unable to deliver the mail to a Payreq account",
                "mybills-bills/no-active-registration": "Payreq was unable to deliver the mail, as there was no active registration",
            }
        },
        "autoPaymentStatus": "Auto Payment Status",
        "autoPaymentStatusLabel": {
            "scheduled": "Scheduled",
            "above-limit": "Above limit set by payer",
            "failed": "Failed Payment",
            "none": "No payment scheduled"
        },
        "reviewedBy": "Approved",
        "reviewedByValue": "By %@ on %@",

        "emailDeliveryDetails": "Email Delivery Details",
        "emailSubject": "Email subject",
        "emailReplyTo": "Reply-to address",
        "emailAttachment": "Includes attachment?",
        "emailHtml": "Email Content"
    },

    "bpv": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "BVRN",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail",
            "undelivered": "The mail has been sent by Payreq.",
        },

        "validationFailure": {
            "payer-must-be-active": "A BVRN was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found."
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "xeroconnect": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "BVRN",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "A BVRN was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found."
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "myob": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "BVRN",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "A BVRN was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found."
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "einvoicing": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "Account Number",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "A BVRN was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found."
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "email": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "BVRN",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "A BVRN was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found."
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "mybillsagent": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "BVRN",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "A BVRN was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found."
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "mybills": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "BVRN",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "deregModalTitle": "Action Required: Subscriptions in 'Deregister?' tab",
        "deregModalMessage": "There are subscriptions in the 'Deregister?' tab requiring action. Action these to continue uploading mail.",
        "deregModalConfirm": "View",
        "deregModalClose": "Close",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "An account number was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found.",
            "no-contact-found": "Could not find a matching contact for the employee name",
            "multiple-contacts": "More than one contact found for employee name",
            "max-pdf-size-exceeded": "Pdf document size cannot be greater than 200KB for a payslip",
            "max-pages-exceeded": "Pdf document cannot be greater than max pages"
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "reckon": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "BVRN",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "A BVRN was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found."
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "BVRN",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "BVRN",
            "ext-ref-number": "CRN"
        }

    },

    "epost": {
        "outgoingBills": "Outgoing mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",
        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Mail Document ID",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "payerName": "Employee name",
        "billerAccountNumber": "Employee ID",
        "amountDue": "Amount due",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "numPayersSentTo": "No. recipients",
        "numPayersFailed": "No. failed recipients",
        "jobId": "Job Id",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No outgoing mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "deregModalTitle": "Action Required: Subscriptions in 'Deregister?' tab",
        "deregModalMessage": "There are subscriptions in the 'Deregister?' tab requiring action. Action these to continue uploading mail.",
        "deregModalConfirm": "View",
        "deregModalClose": "Close",

        "recipients": {
            "payerName": "Recipient name",
            "receivedDate": "Recipient subscribed date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },

        "abbr": {
            "billerAccountNumber": "Account number"
        },

        "statusLabel": {
            "pending-registration": "Awaiting subscription"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the mailer.",
            "pending-registration": "No active subscription found for the mail"
        },

        "billTypes": {
            "statement": "Statement",
            "notice": "Notice",
            "bill": "Bill"
        },

        "validationFailure": {
            "payer-must-be-active": "An account number was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found.",
            "no-contact-found": "Could not find a matching contact for the employee name",
            "multiple-contacts": "More than one contact found for employee name",
            "max-pdf-size-exceeded": "Pdf document size cannot be greater than 200KB for a payslip",
            "max-pages-exceeded": "Pdf document cannot be greater than max pages"
        },

        "billPayer": {
            "nonDeliveredReason": {
                "invalid-expiry-date": "The expiry date in the mail was invalid.",
                "invalid-creation-date": "The creation date of the mail was invalid.",
                "invalid-payer-account": "The account details in the mail were invalid.",
                "epost/unidentified": "Unclear",
                "epost/invalid-accntno": "No epost subscription matches the account number.",
                "epost/closed-ebox": "The epost box has been closed.",
                "epost/invalid-ebox": "The epost box does not exist.",
                "epost/wrong-ebox": "A subscription exists, but for a different epost box.",
                "epost/closed-subscription": "The subscription has been closed.",
                "epost/invalid-subscription-id": "The subscription ID provided does not exist.",
                "epost/invalid-detail-file-path": "The file containing the document (i.e. PDF) does not exist or is not referenced properly.",
                "epost/wrong-pubid": "There is an open subscription for the account number, but under a different publication.",
                "epost/provider-notactive": "The active flag for the Mailer name is 0. No Mailpieces are available for review.",
                "epost/invalid-provider": "This Mailer does not exist. No Mailpieces are available for review.",
                "epost/payment-data-missing": "If Mail Type = “B” then payment-data resource is required."
            }
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload Mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>approve the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>reject the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "Account number",
            "biller-invoice-number": "Mail Document ID",
            "biller-account-number": "Account number"
        }
    },

    "dm": {
        "outgoingBills": "Outgoing documents",
        "outgoingBill": "Outgoing Documents",

        "upload": "Upload documents",
        "uploadActions": {
            "confirm": "Upload documents",
        },

        "billerInvoiceNumber": "Document ID",
        "billDocumentSize": "Document size",
        "billPageNumbers": "Number of pages",
        "payerName": "Account name",
        "billerAccountNumber": "Account number",
        "amountDue": "Amount due",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Document type",
        "firstActionedTime": "Sent",
        "numPayersSentTo": "No. recipients",
        "numPayersFailed": "No. failed recipients",
        "jobId": "Job Id",

        "downloadDocument": "Download document",
        "approveBill": "Approve document",
        "noBillsFound": "No outgoing documents found.",

        "billDetails": "Document details",
        "billAccounting": "Document Accounting",

        "noAttachmentFound": "No attachment found.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Recipients",

        "recipients": {
            "payerName": "Recipient name",
            "receivedDate": "Recipient subscribed date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found.",
        },

        "abbr": {
            "billerAccountNumber": "Account number"
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The provider has requested that all documents be reviewed prior to being sent.",
            "ready-for-dispatch": "The document has been sent by Payreq.",
            "dispatched": "The document has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this document. Please contact the Payreq help desk to top up your account.",
            "rejected": "The document has been rejected by the provider.",
            "pending-registration": "No active subscription found for the document"
        },

        "billTypes": {
            "statement": "Statement",
            "notice": "Notice",
            "bill": "Bill"
        },

        "validationFailure": {
            "payer-must-be-active": "An account number was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the document was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the document was created",
            "document-not-found": "Image file for document was not found."
        },

        "billPayer": {
            "nonDeliveredReason": {
                "dm/internal-error": "An internal error occurred while delivering the document.",
                "dm/configuration-error": "An internal error occurred while delivering the document.",
                "dm/file-already-processed": "An internal error occurred while delivering the document.",
                "dm/schema-validation-failure": "An internal error occurred while delivering the document.",
                "dm/delivery-package-invalid": "An internal error occurred while delivering the document.",
                "dm/failure-limit-reached": "An internal error occurred while delivering the document.",
                "dm/invalid-job-name": "An internal error occurred while delivering the document.",
                "dm/invalid-connection-id-limit-reached": "An internal error occurred while delivering the document.",
                "dm/metadata-upload-failure": "An internal error occurred while delivering the document.",
                "dm/subscription-invalid-state": "Subscription could not receive this document as it is in an incorrect state in Digital Mailbox.",
                "dm/foreign-id-not-found": "Subscription could not be found in Digital Mailbox for this recipient.",
                "dm/content-file-not-found": "An internal error occurred while delivering the document.",
                "dm/document-upload-failure": "An internal error occurred while delivering the document."
            }
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send documents",
            "replace-no-bills": "Replace Contacts only, do not send documents",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload documents' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>approve the %@</strong> document(s) currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>reject the %@</strong> document(s) currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "Account number",
            "biller-invoice-number": "Document ID",
            "biller-account-number": "Account number"
        },

        "parFileModal": {
            "hasFiles": "%@ payment files found",
            "noFilesFound": "No payment files found",
            "pressDownloadInstructions": "Click the Download button to download the archive file.",
        }
    },

    "mybills-bills": {
        "outgoingBills": "Outgoing Mail",
        "outgoingBill": "Outgoing Mail",

        "upload": "Upload mail",

        "uploadActions": {
            "confirm": "Upload mail",
        },

        "billerInvoiceNumber": "Invoice no.",
        "billDocumentSize": "Mail document size",
        "billPageNumbers": "Number of pages",
        "extRefNumber": "CRN",
        "ext-ref-number": "CRN",
        "payerName": "Customer name",
        "billerAccountNumber": "Account Number",
        "amountDue": "Total",
        "dueDate": "Minimum Due",
        "dueDateTotal": "Total Due",
        "billType": "Mail type",
        "firstActionedTime": "Sent",
        "jobId": "Job Id",
        "numPayersSentTo": "No. payers",
        "numPayersFailed": "No. failed payers",

        "downloadDocument": "Download mail document",
        "approveBill": "Approve mail",
        "noBillsFound": "No mail found.",

        "billDetails": "Mail details",
        "billAccounting": "Mail Accounting",

        "noAttachmentFound": "No attachment found for invoice.",
        "noViewPermission": "Permission to view documents disabled",

        "billRecipients": "Mail recipients",

        "deregModalTitle": "Action Required: Subscriptions in 'Deregister?' tab",
        "deregModalMessage": "There are subscriptions in the 'Deregister?' tab requiring action. Action these to continue uploading mail.",
        "deregModalConfirm": "View",
        "deregModalClose": "Close",

        "recipients": {
            "payerName": "Payer name",
            "receivedDate": "Payer registered date",
            "sentOn": "Mail sent on",
            "nonDeliveryDate": "Non-delivery date",
            "nonDeliveryReason": "Non-delivery reason",
            "deliveredSuccessfully": "Delivered successfully",
            "noRecipients": "No recipients found for this mail.",
        },

        "billViewLog": "Mail view log",

        "log": {
            "payerName": "Payer name",
            "viewedOn": "Viewed on",
            "noLogs": "No view logs found for this mail.",
        },


        "billTypes": {
            "bill-payment-not-required": "Mail, no payment required",
            "bill-for-payment": "Mail, payment required",
            "mandatory-bill-payment-not-required": "Mail, no payment required, payer must view",
            "mandatory-bill-for-payment": "Mail, payment required, payer must view",
            "replacement-bill-payment-not-required": "Replacement mail, no payment required",
            "replacement-bill-for-payment": "Replacement mail, payment required",
            "replacement-mandatory-bill-payment-not-required": "Replacement mail, payment required, payer must view",
            "replacement-mandatory-bill-for-payment": "Replacement mail, payment required, payer must view",
            "invalid-bill": "Invalid mail"
        },

        "abbr": {
            "billerAccountNumber": "Bpay View Reference Number",
            "extRefNumber": "Bpay Customer Reference Number",
            "extRefNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
            "CRN": "Bpay Customer Reference Number",
            "CRNNotFound": "A specific Bpay Customer Reference number could not be found for this mail. The BVRN will be used instead.",
        },

        "statusLabel": {
            "pending-registration": "Awaiting registration"
        },

        "statusDescription": {
            "draft": "Error. The mail has been placed in error status due to validation errors.",
            "ignored": "Error. The mail has been placed in error status as there is no active subscription",
            "review-by-biller": "The mailer has requested that all mail be reviewed prior to being sent.",
            "ready-for-dispatch": "The mail has been queued for sending by Payreq",
            "dispatched": "The mail has been sent by Payreq.",
            "ready-for-dispatch-awaiting-credit": "There was not enough credit to dispatch this mail. Please contact the Payreq help desk to top up your account.",
            "rejected": "The mail has been rejected by the biller.",
            "pending-registration": "No active registration found for the mail"
        },

        "validationFailure": {
            "payer-must-be-active": "An account number was provided, but was not found or is inactive",
            "after-created-time": "%@1 must be after the date the mail was created",
            "less-than-18-months-after-created-time": "%@1 must be less than 18 months after the date the mail was created",
            "document-not-found": "Image file for mail was not found.",
            "no-contact-found": "Could not find a matching contact for the employee name",
            "multiple-contacts": "More than one contact found for employee name",
            "max-pdf-size-exceeded": "Pdf document size cannot be greater than 200KB for a payslip",
            "max-pages-exceeded": "Pdf document cannot be greater than max pages"
        },

        "uploadModal": {
            "add-no-bills": "Update Contacts only, do not send mail",
            "replace-no-bills": "Replace Contacts only, do not send mail",

            "errors": {
                "confirmationRequired": "The uploaded file has been previously processed for the following formats. Press the 'Upload mail' button again to re-run the uploaded file."
            }

        },

        "acceptAllConfirm": "Are you sure you want to <strong>send the %@</strong> mail currently in \"Approval needed\" status?",
        "rejectAllConfirm": "Are you sure you want to <strong>delete the %@</strong> mail currently in \"Approval needed\" status?",

        "billFieldDescription": {
            "biller-customer-number": "Account Number",
            "biller-invoice-number": "Invoice no.",
            "biller-account-number": "Account Number",
            "ext-ref-number": ""
        }

    },
});
