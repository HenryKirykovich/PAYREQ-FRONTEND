define({

    "all": {
        "registered": "Actif",
        "pendingFailed": "Échec en attente",
        "externalUpdateRequired": "Mise à jour externe requise",
        "failed": "Échoué",
        "contactChanged": "Se désinscrire?",
        "all": "Tout",

        "backToPayerRegistrations": "Retour à la liste",

        "status": "Statut",
        "registrationApprovalCode": "Méthode d'inscription",
        "contactExists": "Le contact existe",
        "channelPartnerSystemId": "Canal",
        "contactId": "Identifiant du contact",
        "action": "action",
        "click": "Cliquez sur",
        "here": "ici",
        "cancel": "Annuler",
        "deregisterConfirm": "Se désinscrire",
        "confirmExport": "Télécharger le fichier csv",

        "payreqSupport": "Le support Payreq",
        "notAvailable": "S/O",

        "channels": {
            "archive": "Payreq (via archives)",
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
            "print": "Copie physique",
            "reckon": "Payreq Reckon Accounts Hosted",
            "xeroconnect": "Payreq Xero"
        },

        "fastformEmail": "Courriel FastForm",
        "manualEmail": "Courriel Manuel",

        "newContactName": "Nouveau nom de client",
        "contactUpdatedOn": "Nom du client mis à jour le",
        "acceptContactChange": "Accepter le changement de nom du client",
        "noContactValue": "Aucune valeur",

        "exportModal": {
            "previousExport": "Une exportation précédente",
            "previousExportInstructions": "Sélectionnez une exportation précédente",
            "firstExport": "Première exportation",
            "allRegistrationsSinceSelectInstructions": "Sélectionnez une exportation précédente",
        },

        "deregistrationModal": {
            "instructions": "Choisissez un fichier avec des numéros de compte à désactiver (un numéro de compte par ligne) et attendez que les informations de confirmation apparaissent",
            "summary": "Vous avez téléchargé des numéros de compte %@, dont le système a %@ abonnement (s).",
            "viewUnmatched": "pour afficher les numéros de compte sans correspondance",
            "file": "Sélectionnez le fichier à importer"
        },

        "statuses": {
            "inactive": "Échoué",
            "active": "Actif",
            "failed-auth-awaiting-manual": "Échec, manuel en attente",
            "unprocessed": "Traitement en attente",
            "confirmation-required": "Mise à jour externe requise",
        },

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
            "deactivation-mybills-takeover": "Compte Payreq MyBills créé",
            "deactivation-biller-managing-agent": "Service annulé par Mailer en raison d'une notification de l'agent de gestion",
            "deactivation-customer-email-bouncing": "Service annulé en raison d'un courriel client renvoyé",
            "deactivation-einvoicing-terminated" : "L'identifiant d'entreprise n'est plus enregistré pour la facturation électronique"
        },

        "registrationApprovalCodeString": {
            "undefined": "N/A",
            "automatic": "Automatique",
            "manual": "Manuel",
        },

        "helpMsg": {
            "pendingFailed": "Inscriptions qui n'ont pas été validées avec succès par rapport à un contact. <br/><strong>Action:</strong> Cliquez sur chaque inscription pour consulter les champs d'authentification entrés. Pour des enregistrements valides, cliquez sur \"Approuver cet enregistrement\", sinon cliquez sur \"L'enregistrement a échoué, car ...\" et sélectionnez une raison appropriée",
            "registered": "Inscriptions actives pour le courrier numérique",
            "contactChanged": "Inscription où le nom du contact a changé. Par exemple. La propriété a changé de mains. <br/><strong>Action:</strong> cliquez sur chaque inscription pour vérifier le changement de nom du contact. Pour des changements de nom valides, cliquez sur \"Accepter le changement de nom du client\", sinon cliquez sur \"Annuler l'enregistrement\" et sélectionnez une option appropriée",
            "deregistered": "Inscriptions radiées",
            "failed": "Inscriptions dont la validation initiale a échoué",
            "all": "Toutes les inscriptionss"
        },

        "externalConfirmation": {
            "deactivated": "Veuillez confirmer que vous avez supprimé l'adresse e-mail Payreq de l'enregistrement de contact correspondant dans votre système externe",
            "activated": "Veuillez confirmer que vous avez ajouté l'adresse courriel ci-dessus à l'enregistrement de contact correspondant dans votre système externe et que le gabarit de courriel est le gabarit Payreq correct.",
        },

        "previous": "précédent",
        "next": "suivant",
        "goToNextRecord": "Accéder automatiquement au prochain enregistrement",
        "accountNumberNoCheckDigit": "Numéro de compte sans chiffre de contrôle",
        "autoPayment": {
            "heading": "Détails du paiement automatique",
            "activeFrom": "Actif pour les factures émises après",
            "amountPayable": {
                "label": "Montant à payer",
                "min": "Trimestriel / minimum",
                "total": "Annuel / total"
            },
            "limit": "Limite ($)",
            "noLimit": "Non spécifié",
            "paymentDay": {
                "label": "Jour de paiement",
                "due-date": "Date d'échéance",
                "receive-date": "Date de réception",
            },
            "nextBillForAutoPayment": "Prochaine facture pour le paiement automatique",
            "nextBillLink": "afficher la facture",
            "noNextBill": "Aucune facture à venir ne sera payée automatiquement",
            "status": {
                "scheduled": "Scheduled",
                "failed": "Paiement échoué",
                "above-limit": "Au-dessus de la limite fixée par le payeur"
            }
        }
    },

    "epost": {
        "contactChanged": "Désactiver?",

        "deregistered": "Désactivé",
        "billerAccountNumber": "Numéro d’identification d'employé",
        "extPayerName": "Nom de l'abonnement",
        "payerName": "Nom de l'employé",
        "dateGenerated": "Date d'abonnement",
        "deactivationDate": "Date de désabonnement",

        "payerDetails": "Détails de l'abonnement au compte",
        "destinationEmailAddress": "Adresse courriel de Payreq",
        "registrationMethod": "Méthode d'abonnement",
        "registrationDate": "Date d'abonnement",
        "deregistrationDate": "Date de désabonnement",
        "deregisteredBy": "Désenregistré par",

        "deregisterSelect": "Désactiver...",
        "deregister": "Désactiver",
        "viewAuthenticationFields": "Afficher les champs de vérification de l'abonnement",
        "authenticationFields": "Champs de vérification d'abonnement",

        "approveRegistration": "Approuver cet abonnement",
        "rejectRegistrationEpost": "Échouer cet abonnement",
        "employeeNameField": "Nom de l'employé",
        "userEntered": "L'employé est entré",
        "contactDetails": "Votre contact a",

        "missingAuthenticationField": "Aucune valeur saisie",
        "fieldsNotRequired": "Cet expéditeur n'a pas besoin de champs de vérification pour les comptes d'abonnement.",

        "exportModal": {
            "instructions": "Choisissez un fichier d'abonnement à exporter, puis cliquez sur le bouton <em>Télécharger csv</em> ci-dessous.",
            "title": "Exporter les abonnements",

            "allRegistrationsSinceLast": "Toutes les modifications d'abonnement depuis la dernière exportation",
            "allRegistrationsSinceLastInstructions": "La dernière exportation d'abonnement de cet expéditeur comprenait des abonnements jusqu'à",
            "allRegistrationsSinceSelect": "Toutes les modifications d'abonnement d'une exportation précédente jusqu'à <em>maintenant</em>",

            "currentSnapshot": "Aperçu de l'abonnement actuel",
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
                "current-snapshot": "Le fichier téléchargé contiendra un aperçu actuel de l'état de tous les abonnements, à partir de maintenant",
            },
        },

        "deregistrationModal": {
            "instructions": "Choisissez un fichier avec des numéros de compte à désactiver (un numéro de compte par ligne) et attendez que les informations de confirmation apparaissent",
            "summary": "Vous avez téléchargé des numéros de compte %@, dont le système a %@ abonnement (s).",
            "viewUnmatched": "pour afficher les numéros de compte sans correspondance",
            "file": "Sélectionnez le fichier à importer"
        },

        "statuses": {
            "deregistered": "Désactivé",
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

        "helpMsg": {
            "registered": "Abonnement actif",
            "contactChanged": "Abonnements dont le nom du contact a changé. Par exemple. La propriété a changé de mains. <br/><strong>Action:</strong> cliquez sur chaque inscription pour vérifier le changement de nom du contact. Pour des changements de nom valides, cliquez sur \"Accepter le changement de nom du client\", sinon cliquez sur \"Annuler l'enregistrement\" et sélectionnez une option appropriée",
            "deregistered": "Abonnements désinscrits",
            "failed": "Abonnements dont la validation initiale a échoué",
            "all": "Tous les abonnements",
        },

        "messages": {
            "billerAccountNumberNotFound": "Le numéro de compte est introuvable dans le système de facturation",
            "noRegistrations": "Aucun abonnement trouvé.",
            "noDestinationEmailAddressYet": "Un courriel n'a pas encore été généré pour cet expéditeur.",
        },

        "abbrs": {
            "billerAccountNumber": "Numéro de compte",
            "destinationEmailAddress": "Le courrier à traiter par Payreq doit être envoyé à cette adresse courriel",
        }
    },

    "epost-payreqmypay": {
        "billerAccountNumber": "Numéro d’identification d'employé",
        "payerName": "Nom de l'employé",
        "extPayerName": "Nom de l'abonnement",
        "contactChanged": "Désactiver?",
    },

    "bpv": {
        "contactChanged": "Désactiver?",

        "deregistered": "Désactivé",
        "billerAccountNumber": "Numéro de compte",
        "extPayerName": "Nom de l’inscription",
        "payerName": "Nom de l'employé",
        "dateGenerated": "Date d'abonnement",
        "deactivationDate": "Date de désabonnement",

        "payerDetails": "Détails de l'abonnement au compte",
        "destinationEmailAddress": "Adresse courriel de Payreq",
        "registrationMethod": "Méthode d'abonnement",
        "registrationDate": "Date d'abonnement",
        "deregistrationDate": "Date de désabonnement",
        "deregisteredBy": "Désenregistré par",

        "deregisterSelect": "Désactiver...",
        "deregister": "Désactiver",
        "viewAuthenticationFields": "Afficher les champs de vérification de l'abonnement",
        "authenticationFields": "Champs de vérification d'abonnement",

        "approveRegistration": "Approuver cet abonnement",
        "rejectRegistrationEpost": "Échouer cet abonnement",
        "employeeNameField": "Nom de l'employé",
        "userEntered": "L'employé est entré",
        "contactDetails": "Votre contact a",

        "missingAuthenticationField": "Aucune valeur saisie",
        "fieldsNotRequired": "Cet expéditeur n'a pas besoin de champs de vérification pour les comptes d'abonnement.",

        "exportModal": {
            "instructions": "Choisissez un fichier d'abonnement à exporter, puis cliquez sur le bouton <em>Télécharger csv</em> ci-dessous.",
            "title": "Exporter les abonnements",

            "allRegistrationsSinceLast": "Toutes les modifications d'abonnement depuis la dernière exportation",
            "allRegistrationsSinceLastInstructions": "La dernière exportation d'abonnement de cet expéditeur comprenait des abonnements jusqu'à",
            "allRegistrationsSinceSelect": "Toutes les modifications d'abonnement d'une exportation précédente jusqu'à <em>maintenant</em>",

            "currentSnapshot": "Aperçu de l'abonnement actuel",
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
                "current-snapshot": "Le fichier téléchargé contiendra un aperçu actuel de l'état de tous les abonnements, à partir de maintenant",
            },
        },

        "deregistrationModal": {
            "instructions": "Choisissez un fichier avec des numéros de compte à désactiver (un numéro de compte par ligne) et attendez que les informations de confirmation apparaissent",
            "summary": "Vous avez téléchargé des numéros de compte %@, dont le système a %@ abonnement (s).",
            "viewUnmatched": "pour afficher les numéros de compte sans correspondance",
            "file": "Sélectionnez le fichier à importer"
        }
    },

    "mybills-bills": {
        "contactChanged": "Désactiver?",

        "deregistered": "Désactivé",
        "billerAccountNumber": "Numéro de compte",
        "extPayerName": "Nom de l’inscription",
        "payerName": "Nom du client",
        "dateGenerated": "Date d'abonnement",
        "deactivationDate": "Date de désabonnement",

        "statuses": {
            "deregistered": "Désactivé",
        },

        "exportModal": {
            "instructions": "Choisissez un fichier d'abonnement à exporter, puis cliquez sur le bouton <em>Télécharger csv</em> ci-dessous.",
            "title": "Exporter les abonnements",

            "allRegistrationsSinceLast": "Toutes les modifications d'abonnement depuis la dernière exportation",
            "allRegistrationsSinceLastInstructions": "La dernière exportation d'abonnement de cet expéditeur comprenait des abonnements jusqu'à",
            "allRegistrationsSinceSelect": "Toutes les modifications d'abonnement d'une exportation précédente jusqu'à <em>maintenant</em>",

            "currentSnapshot": "Aperçu de l'abonnement actuel",
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
                "current-snapshot": "Le fichier téléchargé contiendra un aperçu actuel de l'état de tous les abonnements, à partir de maintenant",
            },
        },

        "deregistrationModal": {
            "instructions": "Choisissez un fichier avec des numéros de compte à désactiver (un numéro de compte par ligne) et attendez que les informations de confirmation apparaissent",
            "summary": "Vous avez téléchargé des numéros de compte %@, dont le système a %@ abonnement (s).",
            "viewUnmatched": "pour afficher les numéros de compte sans correspondance",
            "file": "Sélectionnez le fichier à importer"
        }
    }

});
