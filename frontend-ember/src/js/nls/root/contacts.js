define({
    "all": {
        "contact": "Contact",
        "lastUpdated": "Last updated",
        "actions": "Actions",

        "create": "Create",
        "clear": "Clear",

        "deleteContact": "Delete contact",
        "deleteContactConfirmation": "Are you sure you want to delete contact",
        "createSuccessMessage": "Successfully created contact.",
        "updateSuccessMessage": "Successfully updated contact.",
        "deleteSuccessMessage": "Successfully deleted contact.",
        "updateContact": "Update contact",
        "noContactsFound": "No contacts found.",
        "backToContacts": "Back to list",
        "contactDetails": "Contact details",

        "contactAccountId": "Contact ID",
        "contactAccountIdLabel": "Contact ID",
        "fullName": "Full name",
        "address": "Address",
        "firstName": "First name",
        "lastName": "Last name",
        "middleName": "Middle name",
        "address1": "Address line 1",
        "address2": "Address line 2",
        "businessIdLabel": "Business Identifier (Eg. ABN)",

        "exactSearch": "Search for exact match on %@",

        "validation": {
            "authFieldMissing": "Please enter a value for %@.",
        },

        "contactsImportModal": {
            "importTypeDisplay": "Replace all contacts with file values. If a contact does not exist in the file will be deleted.",
            "importConfirmation": "Import summary listed below. Press Import Contacts button to continue.<br>%@",
            "validating": "Validating the import...",
            "error": {
                "fileAlreadyUploadedConfirm": "The selected file has been processed previously in the job listed below. If you are sure that you wish to process this file again, press the Import Contacts button below.",
                "fileAlreadyUploadedRunning": "The selected file cannot be processed, as another job is currently processing the same file."
            }
        },
    },

    "bpv": {
        "billerAccountNumber": "BVRN",
        "billerAccountNumberLabel": "Bpay View Reference Number",
        "name": "Customer name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postcode",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter a BVRN.",
            "nameMissing": "Please enter a customer name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",

        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"BVRN\",\"Customer name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Customer name\"</strong>%@%@",
        },
    },

    "xeroconnect": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Customer name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postcode",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter a BVRN.",
            "nameMissing": "Please enter a customer name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"BVRN\",\"Customer name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Customer name\"</strong>%@%@",
        },
    },

    "epost": {
        "billerAccountNumber": "Employee ID",
        "billerAccountNumberLabel": "Employee ID",
        "name": "Employee name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "Municipality",
        "province": "Province",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this Employee ID already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format:<br><strong>\"Employee Id\",\"Customer name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format:<br><strong>\"Contact Id\",\"Customer name\"</strong>%@%@",
        },
    },

    "dm": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },

    "email": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },

    "myob": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },

    "einvoicing": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },


    "mybills": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },

    "mybillsagent": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },

    "mybills-bills": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },

    "reckon": {
        "billerAccountNumber": "Account number",
        "billerAccountNumberLabel": "Account number",
        "name": "Account name",

        "extraFieldsNote": "The following fields are <strong>optional</strong>.",
        "municipality": "City",
        "province": "State",
        "postalCode": "Postal code",
        "country": "Country",

        "validation": {
            "billerAccountNumberMissing": "Please enter an account number.",
            "nameMissing": "Please enter an account name.",
            "invalidBillerAccountNumberLength": "Length of Contact ID is not correct",
            "invalidBillerAccountNumberDuplicate": "Contact with this account number already exists.",
            "contactErrorMsg": "An error occurred while creating the new contact. (%@)",
            "contactError": "An error occurred while creating the new contact. Please try again later.",
        },

        "contactsImportModal": {
            "instructions": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Account number\",\"Account name\"</strong>%@%@",
            "instructionsMultiChannel": "Choose a file with contacts details and wait for the confirmation information to appear. Sample file format :<br><strong>\"Contact Id\",\"Account name\"</strong>%@%@",
        },
    },

    "epost-payreqmypay": {
        "billerAccountNumber": "Employee ID",
        "billerAccountNumberLabel": "Employee ID",
        "name": "Employee name"
    },
});
