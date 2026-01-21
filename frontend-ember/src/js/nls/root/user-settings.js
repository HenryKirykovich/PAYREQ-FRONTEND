define({
    "all": {
        "personalDetailsTitle": "Personal Details",
        "addressLine1": "Address Line 1",
        "addressLine2": "Address Line 2",
        "city": "City",
        "state": "State",
        "postcode": "Postcode",
        "defaultBillStatus": "Default Bill Status",
        "showHelpMessages": "Show help messages",
        "defaultSearchDateRange": "Default search date range",
        "changeEmailTitle": "Change Your Account Email Address",
        "newEmail": "New Email",
        "currentPassword": "Current password",
        "emailChangePendingStatus": "Pending Confirmation",
        "emailChangePendingLine1": "A confirmation email has been sent to",
        "emailChangePendingLine2": "You can still continue to login to Payreq using",
        "emailChangePendingLine3": "No longer want to update your email address?",
        "emailChangeErrors": {
            "invalid.details": "Invalid email or password entered.",
            "invalid.password": "Invalid password entered"
        },
        "emailChangeFailed": "Unable to update email address. Please try again later.",
        "emailChangeSuccess": "Email update request sent to %@",
        "emailCancelled": "Email update request cancelled.",
        "emailCancelledFailed": "Unable to cancel email update request. Please try again later.",
        "emailChangeResent": "Confirmation email update was re-sent to %@",
        "emailChangeResendFailed": "Unable to cancel email update request. Please try again later.",
        "emailChangeResendErrors": {
            "max.resends": "Maxmium number of re-sends has been reached. Please contact Payreq Support"
        },

        "cancelEmailUpdateLink": "Cancel Email Update",
        "resendEmailUpdateText": "Didn't receive the email?",
        "resendEmailUpdateLink": "Resend Confirmation Email",
        "changePasswordTitle": "Change Your Password",
        "currentPasswordIncorrect": "The current password you entered could not verified. Please re-enter your password and try again.",
        "passwordChangeSuccessful": "Password successfully changed.",
        "personalDetailsChangeSuccessful": "Personal details successfully changed.",
        "mybillsNotificationPrefrencesChangeSuccessful": "Notification preferences successfully changed.",
        "mybillsNotificationPrefrencesChangeFailed": "Unable to update notification preferences. Please contact Payreq Customer Service.",
        "notificationsTitle": "Your Notifications Settings",
        "myBillsNotificationsTitle": "MyBills Notifications Settings",
        "notificationPreferenceDescription": {
            "bill.waiting": "A mail could not be sent due to awaiting for approval",
            "account.permissions": "Permissions on this account have been modified",
            "autopayment.created": "Auto Payment created",
            "registration.failed": "A registration has failed",
            "bill.nondelivery": "Channel partner was unable to deliver a document",
            "registration.complete": "A registration has been successful",
            "registration.waiting": "A registration is waiting for approval",
            "bill.processed": "A mail was successfully sent",
            "bill.draft": "A mail could not be sent due to being in error",
            "deregistration.complete": "A registration has been deregistered",
            "contact.rejected": "A contact was rejected by an upstream provider",
            "bill.awaitingcredit": "A mail could not be sent due to insufficient credit",
            "job.failed": "A job has failed",
            "registration.contactchanged": "A registration is flagged for possible deregistration",
            "bill.pendingregistration": "A mail could not be sent due to no registration",
            "bill.contactchanged": "A mail could not be sent due to the registration being flagged for possible deregistration",
            "mybills.paymentreminder": "Payment reminder 3 days prior to due date",
            "mybills.forwardingfailed": "Bills failed forwarding",
            "mybills.forwardinginformation": "Bills waiting for information to be forwarded"
        },

        "addAcccount": {
            "heading": "Add Payreq Inbox Account",
            "acctNameLabel": "Payreq Inbox Name",
            "acctNameHelp": "The name of the Payreq Inbox to be added.",
            "isBusinessLabel": "Is your Payreq Inbox for a business?",
            "yes": "Yes",
            "no": "No",
            "add": "Add",
            "missingName": "Please enter value for mandatory field.",
            "addErrorResp": "Unable to add your Payreq account. Please try again later.",
            "addFailResp": "An error occurred while attempting to add your new Payreq account. Please try again later.",
            "addErrorMessage": "We are unable to add your new Payreq account. Please see fields for errors.",
            "maxName": "Please enter a Payreq Inbox name less than 256 characters"
        }
    },

    "bpv": {
        "notificationPreferenceDescription": {
            "bill.nondelivery": "A mail could not be delivered"
        }
    },

    "epost": {
        "notificationPreferenceDescription": {
            "registration.failed": "A subscription has failed",
            "bill.nondelivery": "EPOST was unable to deliver a document",
            "registration.complete": "A subscription has been successful",
            "registration.contactchanged": "A subscription is flagged for possible deactivation",
            "deregistration.complete": "A subscription has been deactivated",
            "registration.waiting": "A subscription is waiting for approval",
            "bill.contactchanged": "A mail could not be sent due to the subscription being flagged for possible deactivation"
        }
    },

    "dm": {
        "notificationPreferenceDescription": {
            "bill.nondelivery": "DM was unable to deliver a document"
        }
    }
});
