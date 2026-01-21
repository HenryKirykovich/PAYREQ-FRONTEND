define({

    "all": {
        "contact": "Contact",
        "lastUpdated": "Dernière mise à jour",
        "actions": "Actions",

        "create": "Créér",
        "clear": "Effacer",

        "deleteContact": "Effacer le contact",
        "deleteContactConfirmation": "Voulez-vous vraiment supprimer le contact",
        "createSuccessMessage": "Contact créé avec succès.",
        "updateSuccessMessage": "Contact mis à jour avec succès.",
        "deleteSuccessMessage": "Contact supprimé avec succès.",
        "updateContact": "Mettre à jour le contact",
        "noContactsFound": "Aucun contact trouvé.",
        "backToContacts": "Retour à la liste",
        "contactDetails": "Détails du contact",

        "contactAccountId": "Identifiant du contact",
        "contactAccountIdLabel": "Identifiant du contact",
        "fullName": "Nom complet",
        "address": "Adresse",
        "firstName": "Prénom",
        "lastName": "Nom de famille",
        "middleName": "Deuxième nom",
        "address1": "Adresse 1",
        "address2": "Adresse Ligne 2",
        "businessIdLabel": "Identifiant d'entreprise (par exemple ABN)",

        "exactSearch": "Rechercher une correspondance exacte d’un %@",

        "validation": {
            "authFieldMissing": "Veuillez saisir une valeur pour %@.",
        },

        "contactsImportModal": {
            "importTypeDisplay": "Remplacez tous les contacts par des valeurs de fichier. Si un contact n'existe pas dans le fichier, il sera supprimé.",
            "importConfirmation": "Résumé d'importation répertorié ci-dessous. Appuyez sur le bouton Importer des contacts pour continuer. <br>%@",
            "validating": "Validation de l'importation ...",
            "error": {
                "fileAlreadyUploadedConfirm": "Le fichier sélectionné a été traité précédemment dans le travail répertorié ci-dessous. Si vous êtes sûr de vouloir traiter à nouveau ce fichier, appuyez sur le bouton Importer les contacts ci-dessous.",
                "fileAlreadyUploadedRunning": "Le fichier sélectionné ne peut pas être traité, car un autre travail traite actuellement le même fichier."
            }
        },
    },

    "epost": {
        "billerAccountNumber": "ID d'employé",
        "billerAccountNumberLabel": "ID d'employé",
        "name": "Nom de l'employé",

        "extraFieldsNote": "Les champs suivants sont <strong>facultatifs</strong>.",
        "municipality": "Municipalité",
        "province": "Province",
        "postalCode": "Code postal",
        "country": "Pays",

        "validation": {
            "billerAccountNumberMissing": "Veuillez saisir un numéro de compte.",
            "nameMissing": "Veuillez saisir un nom de compte.",
            "invalidBillerAccountNumberLength": "La longueur de l'identifiant du contact n'est pas correcte.",
            "invalidBillerAccountNumberDuplicate": "Le contact avec cet ID d'employé existe déjà",
            "contactErrorMsg": "Une erreur s'est produite lors de la création du nouveau contact. (%@)",
            "contactError": "Une erreur s'est produite lors de la création du nouveau contact. Veuillez réessayer plus tard.",
        },

        "contactsImportModal": {
            "instructions": "Choisissez un fichier avec les détails des contacts et attendez que les informations de confirmation apparaissent. Exemple de format de fichier: <br> <strong> \"ID employé\", \"Nom du client\" </strong>%@%@",
            "instructionsMultiChannel": "Choisissez un fichier avec les détails des contacts et attendez que les informations de confirmation apparaissent. Exemple de format de fichier:<br><strong>\"Contact Id \", \"Nom du client \"</strong>%@%@",
        },
    },

    "epost-payreqmypay": {
        "billerAccountNumber": "ID d'employé",
        "billerAccountNumberLabel": "ID d'employé",
        "name": "Nom de l'employé"
    },

    "mybills-bills": {
        "billerAccountNumber": "Numéro de compte",
        "billerAccountNumberLabel": "Numéro de compte",
        "name": "Nom du compte"
    },
});
