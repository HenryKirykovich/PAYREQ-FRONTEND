define({
        "all": {
            "active": "actif",
            "pendingFailed": "Échec en attente",
            "pending": "En attente",
            "externalUpdateRequired": "Mise à jour externe requise",
            "failed": "Échoué",
            "contactChanged": "Se désinscrire?",
            "all": "Tout",

            "backToPayerRegistrations": "Retour à la liste",

            "status": "Statut",
            "registrationApprovalCode": "Méthode d'inscription",
            "contactUpdatedOn": "Mis à jour le",
            "contactExists": "Le contact existe",
            "channelPartnerSystemId": "Canal",
            "contactId": "Identifiant du contact",
            "action": "action",
            "click": "Cliquez sur",
            "here": "ici",

            "newContactName": "Nouveau nom de client",
            "acceptContactChange": "Accepter le changement de nom du client",

            "exportModal": {
                "previousExport": "Une exportation précédente",
                "previousExportInstructions": "Sélectionnez une exportation précédente",
                "firstExport": "Première exportation",
                "allRegistrationsSinceSelectInstructions": "Sélectionnez une exportation précédente",
            },

            "statusDisplay": {
                "pending": "En attente de l'approbation de Biller",
                "active": "actif",
                "deregistered": "Désinscrit",
                "failed": "Échec"
            },

            "deregistrationModal": {},

            "statusDescription": {
                "activation-paper-bill-stop-immediately": "Le payeur est entièrement actif, le courrier papier a été arrêté",
                "activation-data-insufficient": "Le payeur n'a pas pu être traité car les informations saisies au moment de l'inscription étaient incomplètes",
                "activation-data-not-correct": "Le payeur n'a pas pu être traité car les informations saisies au moment de l'inscription étaient incorrectes",
                "activation-biller-account-number-not-found": "Le payeur BVRN qui a été fourni est introuvable",
                "activation-name-does-not-match": "Le nom du payeur ne correspond pas",
                "activation-contact-biller-generic": "Le payeur a été invité à contacter l'expéditeur pour confirmation",
                "activation-already-registered": "Le payeur est déjà inscrit sur ce mailer dans Payreq",
                "activation-not-managing-agent": "L'agent de gestion n'a pas notifié le facturier",
                "deactivation-customer-paper-bills-recommence": "Service annulé par le payeur - le courrier papier recommencera",
                "deactivation-customer-no-paper-bills": "Service annulé par le payeur - le courrier papier ne recommencera pas",
                "deactivation-biller-paper-bills-recommence": "Service annulé par Mailer - le courrier papier recommencera",
                "deactivation-biller-no-paper-bills": "Service annulé par Mailer - le courrier papier ne recommencera pas",
                "deactivation-customer-not-owner-manager": "Retour à l'expéditeur - Pas le propriétaire / gestionnaire du compte",
                "deactivation-customer-property-no-longer-managed": "Propriété non gérée par l'agent",
                "deactivation-biller-owner-transfer": "Service annulé par Mailer en raison d'un transfert de propriété",
                "deactivation-biller-subdivision": "Service annulé par Mailer en raison d'une subdivision",
                "deactivation-biller-managing-agent": "Service annulé par Mailer en raison d'une notification de l'agent de gestion",
                "deactivation-customer-email-bouncing": "Service annulé en raison d'un courriel client renvoyé",
                "deactivation-einvoicing-terminated" : "L'identifiant d'entreprise n'est plus enregistré pour la facturation électronique"
            },

            "statuses": {
                "inactive": "Échoué",
                "active": "actif",
                "failed-auth-awaiting-manual": "Échec, manuel en attente",
                "unprocessed": "Traitement en attente",
                "confirmation-required": "Mise à jour externe requise",
            },

            "registrationApprovalCodeString": {
                "undefined": "N / A",
                "automatic": "Automatique",
                "manual": "Manuel",
            },

            "externalConfirmation": {
                "deactivated": "Veuillez confirmer que vous avez supprimé l'adresse e-mail Payreq de l'enregistrement de contact correspondant dans votre système externe",
                "activated": "Veuillez confirmer que vous avez ajouté l'adresse e-mail ci-dessus à l'enregistrement de contact correspondant dans votre système externe et que le modèle d'e-mail est le modèle Payreq correct.",
            },

            "previous": "précédent",
            "next": "suivant",
            "goToNextRecord": "Accéder automatiquement au prochain enregistrement",

            "deregModalTitle": "Se désabonner",
            "deregModalTextLine1": "Le désabonnement arrêtera la livraison numérique des factures et annulera tous les calendriers de paiement automatique Payreq associés à cet abonnement.",
            "deregModalTextLine2": "Êtes-vous sûr de vouloir vous désinscrire?",
            "deregModalCancel": "Annuler",
            "deregModalSubmit": "Se désabonner",

            "importText": {
                "heading": "Importer les enregistrements Payreq MyBills Agent",
                "backButton": "Retour",
                "text": "Copiez/collez les enregistrements à partir d'une feuille de calcul Excel avec deux colonnes.",
                "column1": "Colonne 1",
                "column2": "Colonne 2",
                "importButton": "Importer",
                "noRegos": "Aucune inscription Payreq MyBills Agent à importer.",
                "successMessage": "Enregistrement Payreq MyBills Agent importé.",
                "errorMessage": "Nous ne pouvons pas importer vos inscriptions. Veuillez contacter le support Payreq."
            }
        },

        "epost": {
            "billerAccountNumber": "ID d'employé",
            "contactChanged": "Désactiver?",

            "deregistered": "Désactivée",
            "accountNumber": "Numéro de compte",
            "extPayerName": "Nom de l'abonnement",
            "payerName": "Nom de l'employé",
            "dateGenerated": "Date d'abonnement",
            "deactivationDate": "Date de désactivation",

            "payerDetails": "Détails de l'abonnement au compte",
            "destinationEmailAddress": "Adresse courriel de Payreq",
            "registrationMethod": "Méthode d'abonnement",
            "registrationDate": "Date d'abonnement",
            "deregistrationDate": "Date de désactivation",

            "deregisterSelect": "Désactiver...",
            "deregister": "Désactiver",
            "viewAuthenticationFields": "Afficher les champs de vérification de l'abonnement",
            "authenticationFields": "Champs de vérification d'abonnement",

            "missingAuthenticationField": "Le propriétaire du compte n'a pas soumis de valeur pour ce champ",
            "fieldsNotRequired": "Cet expéditeur n'a pas besoin de champs de vérification pour les comptes d'abonnement.",

            "exportModal": {
                "instructions": "Choisissez un fichier d'abonnement à exporter, puis cliquez sur le bouton <em>Télécharger csv</em> ci-dessous.",
                "title": "Exporter les abonnements",

                "allRegistrationsSinceLast": "Toutes les modifications d'abonnement depuis la dernière exportation",
                "allRegistrationsSinceLastInstructions": "La dernière exportation d'abonnement de ce mailer comprenait des abonnements jusqu'à",
                "allRegistrationsSinceSelect": "Toutes les modifications d'abonnement d'une exportation précédente jusqu'à <em>maintenant</em>",

                "currentSnapshot": "Instantané de l'abonnement actuel",
                "currentSnapshotInstructions1": "Tous les abonnements et désactivations de compte à partir <em>maintenant.</em> Notez qu'il n'y aura qu'une seule ligne par compte client, quel que soit le nombre de personnes qui se sont abonnées pour recevoir le courrier.",
                "currentSnapshotInstructions2": "Cela ne sera pas enregistré comme une exportation précédente et ne sera pas affiché dans les listes ci-dessus.",
                "currentSnapshotDataSummary": "Il y a <strong>%@</strong> comptes actuellement actifs",
                "currentSnapshotDataStats": "(%@% de %@ contacts)",

                "firstExportInstructions1": "Il s'agit de la première exportation de cet émetteur de factures. Tous les abonnements à partir <em>maintenant</em> seront inclus.",

                "selectedSummary": {
                    "summary": "%@",
                    "last-export": "Le fichier téléchargé contiendra tous les abonnements et désactivations depuis %@2",
                    "from-previous-export": "Le fichier téléchargé contiendra tous les abonnements et désactivations depuis %@2 jusqu'à maintenant",
                    "previous-export": "Téléchargement de l'export précédent: %@ To %@",
                    "current-snapshot": "Le fichier téléchargé contiendra un instantané actuel de l'état de tous les abonnements, à partir de maintenant",
                },
            },

            "deregistrationModal": {
                "instructions": "Choisissez un fichier avec des numéros de compte à désactiver (un numéro de compte par ligne) et attendez que les informations de confirmation apparaissent",
                "summary": "Vous avez téléchargé des numéros de compte %@, dont le système a %@ abonnement (s).",
                "viewUnmatched": "pour afficher les numéros de compte inégalés",
            },

            "statuses": {
                "deregistered": "Désactivée",
            },

            "statusDescription": {
                "activation-paper-bill-stop-immediately": "Le compte est entièrement actif",
                "activation-biller-account-number-not-found": "Le numéro de compte fourni est introuvable.",
                "activation-name-does-not-match": "Le nom du compte ne correspond pas",
                "activation-contact-biller-generic": "Le propriétaire du compte a été invité à contacter l'expéditeur pour confirmation",
                "activation-already-registered": "Le compte est déjà enregistré avec ce mailer dans Payreq",
                "deactivation-customer-paper-bills-recommence": "Service annulé par le titulaire du compte",
                "deactivation-customer-no-paper-bills": "Service annulé par le titulaire du compte",
                "deactivation-biller-paper-bills-recommence": "Service annulé par l'expéditeur",
                "deactivation-biller-no-paper-bills": "Service annulé par l'expéditeur",
            },

            "messages": {
                "billerAccountNumberNotFound": "Le numéro de compte est introuvable dans le système de facturation",
                "noRegistrations": "Aucun abonnement trouvé.",
                "noDestinationEmailAddressYet": "Un courriel n'a pas encore été généré pour ce mailer.",
            },

            "abbrs": {
                "billerAccountNumber": "Numéro de compte",
                "destinationEmailAddress": "Le courrier à traiter par Payreq doit être envoyé à cette adresse courriel",
            }
        },

        "epost-payreqmypay": {
            "billerAccountNumber": "ID d'employé",
            "payerName": "Nom de l'employé",
            "contactChanged": "Désactiver?",
        },

    }
);
