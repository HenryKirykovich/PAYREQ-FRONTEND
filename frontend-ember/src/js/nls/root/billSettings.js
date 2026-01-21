define({
    "all": {
        "billSetting": {
            "systemId": {
                "saasu": {
                    "bill": "Saasu sale"
                },
                "manual": {
                    "bill": "Manual system"
                }
            }
        },

        "editSettings": "Edit",
        "viewSettings": "View",
        "verifySettings": "Verify new settings",
        "cancel": "Cancel",
        "retest": "Retest",
        "confirm": "Confirm changes",

        "yes": "Yes",
        "no": "No",

        "noValueFound": "No value found",

        "billFieldRule": {
            "canBeFoundIn": "can be found in the",

            "systemInstruction1": "Payreq will find the",
            "systemInstruction2": "in the linked",

            "textOrLabel": "text or label",

            "lookIn": {
                "email-subject": "email subject",
                "email-body": "email text",
                "email-attachment": "email attachment (pdf)",
                "system": "%@",
            },
            "position": {
                "after": "after",
                "below": "below",
                "above": "above",
                "before": "before"
            }
        }
    },

    "bpv": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },

    "epost": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be extracted when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail message, there is no need to send another unless there is a problem with the mail message itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test mail message to the following temporary email address:",
        "testBillInstructions2": "The test mail message can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test mail message should be in the format of a standard mail message that would be sent by this mailer on a day-to-day basis. It can contain data for any account <em>(a fictional account is preferred)</em>, and will be discarded after the test. The test message <strong>will not</strong> be forwarded to EPost or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test mail message, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail message received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the test message, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail message.",
        "testBillWaiting1": "To test your mail settings, send a test mail message to the following address:",
        "testBillWaiting2": "When the test mail message has been received by Payreq (which could take up to a minute from when you send it) the mail message data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail message.</strong></p> <p>Please check that you have sent the test messahe to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of messages being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail message...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail message. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test message received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test mail message, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test mail message if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the mail message Payreq received at all. Please check the mail message sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test mail message.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test message, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test message,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the Change Mail Settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",

        "billFieldRule": {
            "willNotBeInBill": "will not be extracted",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found, mail sent to Payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this mailer",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "biller-customer-number": "Account number",
                "biller-invoice-number": "Mail ID"
            }
        },

    },

    "email": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },

    "xeroconnect": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },

    "myob": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },


    "einvoicing": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },

    "mybills": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },

    "mybillsagent": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },

    "reckon": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },

    "dm": {
        "billSettings": "Document settings",
        "viewBillSettings": "View document settings",
        "viewBillSettingsSub": "How incoming documents will be processed",
        "viewBillSettingsInstructions": "The following describes how documents and the values within the documents will be extracted when one is received by Payreq.",

        "editBillSettings": "Edit document settings",
        "verifyBillSettings": "Verify new document settings",

        "testBillReceived": "<p>As we have already received a test document message, there is no need to send another unless there is a problem with the document message itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test document message to the following temporary email address:",
        "testBillInstructions2": "The test document message can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test document message should be in the format of a standard document message that would be sent by this provider on a day-to-day basis. It can contain data for any account <em>(a fictional account is preferred)</em>, and will be discarded after the test. The test message <strong>will not</strong> be forwarded to Digital Mailbox or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test document message, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test document message received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the test message, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the document settings and verifing them against the test document message.",
        "testBillWaiting1": "To test your document settings, send a test document message to the following address:",
        "testBillWaiting2": "When the test document message has been received by Payreq (which could take up to a minute from when you send it) the document message data which we managed to extract will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test document message.</strong></p> <p>Please check that you have sent the test messahe to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of messages being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test document message...",
        "testBillWaitingLoading": "Waiting to receive test document...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test document message. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test message received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test document message, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test document message if you change the document settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the document message Payreq received at all. Please check the mail message sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change document settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test document message.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test message, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test message,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the Change Document Settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test document if you change the document settings",

        "billFieldRule": {
            "willNotBeInBill": "will not be extracted",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found, mail sent to Payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any document sent by this provider",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "biller-customer-number": "Account number",
                "biller-invoice-number": "Document ID"
            }
        },

    },

    "mybills-bills": {
        "billSettings": "Mail settings",
        "viewBillSettings": "View mail settings",
        "viewBillSettingsSub": "How incoming mail will be processed",
        "viewBillSettingsInstructions": "The following describes how mail and the values within the mail will be processed when one is received by Payreq.",

        "editBillSettings": "Edit mail settings",
        "verifyBillSettings": "Verify new mail settings",

        "testBillReceived": "<p>As we have already received a test mail, there is no need to send another, unless there is a problem with the mail itself.</p> <p>Make changes to the settings below, and click the <strong>Verify new settings</strong> button.</p>",
        "testBillInstructions1": "Before the settings can be saved, they must be tested by sending a test invoice to the following temporary email address:",
        "testBillInstructions2": "The test invoice can be sent now, or after you have pressed the <strong>Verify new settings</strong> button.",
        "testBillInstructions3": "The test invoice should be in the format of a standard invoice that would be sent by this mailer on a day-to-day basis. It can contain data for any payer <em>(a fictional payer is preferred)</em>, and will be discarded after the test. The test invoice <strong>will not</strong> be forwarded to BPay or any dispatch channel after the test has completed.",
        "testBillInstructions4": "Each field described below <strong>must</strong> be in the test invoice, otherwise verification cannot proceed.",

        "testBillNotReceivedTimeout1": "<strong>No test mail received.</strong>",
        "testBillNotReceivedTimeout2": "Try resending the mail, and once that you have confirmed that it is on its way, press the <strong>Retest</strong> button below.",

        "testBillReceived": "Payreq is applying the changes to the mail settings and verifing them against the test mail.",
        "testBillWaiting1": "To test your invoice settings, send a test invoice to the following address:",
        "testBillWaiting2": "When the mail has been received by Payreq, which could take up to a minute from when you send it, the mail data which we managed to find will be shown below.",
        "testBillStillWaitingWarning": "<p><strong>Payreq still hasn't received your test mail.</strong></p> <p>Please check that you have sent the test mail to the correct email address (above).</p> <p>If you have already sent the email, this could be because there is a heavy backlog of invoices being processed.</p>",

        "testBillReceivedLoading": "Applying changes to test mail...",
        "testBillWaitingLoading": "Waiting to receive test mail...",

        "testBillError": "<p><strong>An error has occurred</strong></p> <p>A error occurred while processing the test mail. Your changed settings have been saved, but cannot be applied at this time. Please try again later.</p>",

        "testBillMissing1": "Test invoice received, but is missing fields.",
        "testBillMissing2": "Payreq has received your test invoice, but it appears as if there are some missing fields.",
        "testBillMissing3": "This is usually caused by a mistyped label, or not selecting the correct location for where to find a field value.",
        "testBillMissing4": "<small>Note: there is no need to resend the test invoice if you change the mail settings</small>",
        "testBillMissing5Prefix": "Alternatively, it could be due to the fields not being in the invoice Payreq received at all. Please check the invoice sent to Payreq, resend it if necessary (to",
        "testBillMissing5Suffix": ") and click Retest button below to try again.",
        "testBillMissingChangeSettings": "Change mail settings",

        "testBillSuccess": "<strong>Success!</strong> Payreq has received your test invoice.",
        "testBillSuccessInstructions1": "<strong>Are these values correct?</strong>",
        "testBillSuccessInstructions2Prefix": "Check the values below closely, and if they match the values sent in the test invoice, click the",
        "testBillSuccessInstructions2Suffix": "button next to each before clicking the Confirm button.",
        "testBillSuccessInstructions3": "<strong>If any of the values do not match what was sent in the test invoice,</strong> then the settings may contain a mis-typed label, or the selected location of the field value may be incorrect. Click the change mail settings button below to fix this.",
        "testBillSuccessInstructions4": "Note: there is no need to resend the test invoice if you change the mail settings",


        "billFieldRule": {
            "willNotBeInBill": "will not be in the mail",
            "notDefined": "is not defined for this mail",
            "notDefinedAbbr": "This field is required, and by not defining how it can be found in a mail, mail sent to payreq will not be processed correctly.",

            "absentInstruction1": "Payreq will not extract the",
            "absentInstruction2": "from any mail sent by this biller",
        },

        "billField": {
            "fieldName": {
                "account-balance": "Account balance",
                "prev-account-balance": "Previous account balance",
                "min-amount-due": "Minimum amount due",
                "end-time": "Mail expiry date",
                "due-date": "Due date",
                "created-time": "Created date",
                "amount-due": "Amount due",
                "ext-ref-number": "CRN",
                "biller-customer-number": "Customer ID / BVRN",
                "biller-invoice-number": "Invoice number"
            }
        },
    },
});
