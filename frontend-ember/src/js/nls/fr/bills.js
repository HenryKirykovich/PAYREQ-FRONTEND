define({

    "all": {
        "sendPending": "Envoi en attente",
        "error": "Erreur",
        "pendingRegistration": "Abonnement en attente",
        "sent": "Envoyé",
        "readyForDispatch": "En file d'attente",
        "archived": "Archivé",
        "undelivered": "Non livrable",
        "undeliveredActioned": "Action non livrable",
        "all": "Tout",
        "inProgress": "En cours",
        "pending": "En attente",

        "yes": "Oui",
        "no": "Non",

        "backToBills": "Retour à la liste",

        "status": "Statut",
        "action": "action",
        "sentTo": "envoyé à",

        "billStatusPlaceholder": "Sélectionnez un statut...",

        "minAmountDue": "Montant minimum dû",
        "prevAccountBalance": "Solde du compte précédent",
        "accountBalance": "Solde du compte",
        "createdTime": "Date créée",
        "receivedTime": "Reçu par Payreq",
        "contactId": "Identifiant du contact",
        "sendToPrinter": "Envoyé par",
        "documentPages": "Nombre de pages",
        "customerReference": "Référence client",

        "print": "Impression",
        "digital": "Numérique",

        "accountingPlan": "Plan comptable",
        "availableCreditsPrefixText": "Il y a",
        "availableCreditsSuffixText": "disponibles pour ce téléchargement.",

        "splittingIndicatorText": "Les documents seront divisés par <strong>'%@'</strong> indiquant une nouvelle page de départ",
        "splittingEndIndicatorText": "Les documents seront divisés par <strong>'%@'</strong> indiquant une page de fin",

        "uploadInstructions": "Choisissez un fichier PDF, attendez la fin du téléchargement, puis cliquez sur le bouton <em> Télécharger </em> pour exécuter.",
        "uploadFile": "Sélectionnez le fichier à télécharger",
        "uploadContacts": "Instructions pour les contacts",
        "selectBillLoadType": "Type de charge",
        "billFormats": "Sélectionnez les formats de courrier",
        "billFormatsInstructions": "",
        "uploadActions": {
            "cancel": "Annuler",
        },

        "externalAction": {
            "cancel": "Annuler",
            "save": "Enregistrer l'action",
            "modalTitle": "Entrez une action externe",
            "title": "Action extérieure",
            "actionDescriptionLabel": "Description de l'action",
            "actionedOnLabel": "Action sur",
            "cancelActionButton": "Annuler une action extérieure"
        },

        "downloadModalHeading": "Télécharger le courrier",
        "downloadModalTitle": "Téléchargez les résultats de la recherche de <strong>%@ documents</strong>",
        "mailDownloads": "Télécharger en tant que:",
        "csvOption": "CSV",
        "pdfMergedOption": "Fusionner PDF",
        "pdfIndividualOption": "PDF individuels",
        "pagesAllOption": "Toutes les pages",
        "pagesFirstOption": "Première page de chaque document",
        "emailNotification": "Envoyez-moi un courriel lorsque le téléchargement est terminé",
        "pagesTitle": "Pages de document à inclure:",

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

        "validationErrors": "Erreurs de validation",

        "statusLabel": {
            "draft": "Erreur",
            "review-by-biller": "Approbation nécessaire",
            "ready-for-dispatch": "En file d'attente",
            "dispatched": "Envoyé",
            "ready-for-dispatch-awaiting-credit": "En attente de crédit",
            "rejected": "Rejeté",
            "pending-registration": "En attente d'inscription",
            "contact-changed": "Contact modifié",
            "ready-for-dispatch-archived": "Archived",
            "undelivered":  "Non livrable"
        },

        "validationFailure": {
            "required": "%@1 n'a pas été fourni et est requis",
            "required-number": "%@1 doit être un nombre et doit être fourni",
            "number": "%@1 doit être un nombre",
            "minimum-amount-must-be-less-than-due": "Le montant minimum doit être inférieur au montant total dû",
            "invalid-email-delivery-details": "Détails de livraison des e-mails non valides fournis par SFTP"
        },

        "uploadModal": {
            "add": "Mettre à jour les contacts",
            "replace": "Remplacer les contacts",
            "ignore": "Ne pas mettre à jour les contacts",

            "billLoadTypes": {
                "standard": "Standard",
                "archive": "Archive (les courriers sans inscription seront sauvegardés dans l'archive)",
                "historique": "Historique (documents précédemment envoyés à enregistrer uniquement)",
            },

            "errors": {
                "validationErrors": "Une erreur de validation s'est produite lors de la validation des 5 premiers e-mails pour les formats suivants.",
                "billError": "Dans %@1, champ: %@2, raison: %@3",
                "jobRunning": "Le fichier téléchargé est en cours de traitement par les travaux en cours d'exécution suivants. Veuillez attendre la fin de ces travaux avant de télécharger à nouveau ce fichier."
            }
        },

        "approveAll": "Envoyer tout",
        "rejectAll": "Supprimer tout",

        "helpMsg": {
            "error": "Courriers qui ne peuvent pas être envoyés en raison d'erreurs de validation. <br/> <strong> Action: </strong> veuillez cliquer sur les détails du courrier pour afficher les erreurs de validation.",
            "sendPending": "Les e-mails en attente d'envoi nécessitent l'envoi d'une action de facturation. <br/> <strong> En attente de crédit </strong>: un crédit supplémentaire doit être acheté dans Paramètres> Plans comptables> Achat. <br/> <strong> Contact modifié: </strong> Empêcher l'envoi de l'e-mail jusqu'à l'inscription sous Désenregistrement? est actionné. <br/> <strong> En attente de révision: </strong> envoyez les éléments en attente de révision à envoyer. Pour envoyer tous les éléments de courrier dans cet état, cliquez sur 'Envoyer tout' pour rejeter cliquez sur 'Supprimer tout'.",
            "readyForDispatch": "Courrier en attente d'envoi. Celles-ci seront envoyées automatiquement sous peu.",
            "archived": "Mail archived and not sent digitally.",
            "sent": "Courriers envoyés aux payeurs inscrits",
            "undelivered": "Courriers non remis à un payeur enregistré. <br/> <strong> Action: </strong> les émetteurs de factures, veuillez imprimer chaque élément de courrier dans cet onglet et ajouter une note 'Action externe' dans l'écran Détails du courrier une fois actionné",
            "undeliveredActioned": "Les courriers qui n'ont pas pu être livrés par ont été traités.",
            "all": "Tous les mails",
            "pendingRegistration": "Les e-mails en attente d'enregistrement sont stockés jusqu'à ce que l'employé s'abonne"
        },

        "billFieldDescription": {
            "account-balance": "Solde du compte",
            "created-time": "Temps créé",
            "no-payment-override": "Aucun remplacement de paiement",
            "amount-due": "Montant dû",
            "min-amount-due": "Montant minimum dû",
            "prev-account-balance": "Solde du compte précédent",
            "address-line-1": "Champ d'authentification 1",
            "end-time": "Heure de fin",
            "due-date": "Date d'échéance",
            "contact-name": "Nom du contact",
            "auth-item-1": "Champ d'authentification 1",
            "name": "Nom du contact"
        },

        "template": "Modèle",

        "billPayer": {
            "nonDeliveredReason": {
                "invalid-expiration-date": "La date d'expiration de l'e-mail n'était pas valide.",
                "invalid-creation-date": "La date de création du courrier n'était pas valide.",
                "invalid-payer-account": "Les détails du compte payeur dans l'e-mail étaient invalides.",
                "not-owner-manager": "Retour à l'expéditeur. Pas le propriétaire ou le gestionnaire du compte.",
                "olb-failed-to-email-payer": "L'institution financière du payeur n'a pas pu envoyer de courrier électronique au payeur.",
                "olb-failed-to-delivery-bill-summary": "L'institution financière du payeur n'a pas pu remettre le courrier au payeur.",
                "bpv-failed-to-delivery-bill-summary-to-olb": "BPay n'a pas pu remettre le récapitulatif du courrier à l'institution financière du payeur.",
                "xeroconnect/undeliverable": "Payreq n'a pas pu livrer le courrier à Xero",
                "xeroconnect/no-active-registration": "Payreq n'a pas pu livrer le courrier à Xero, car il n'y avait pas d'enregistrement actif",
                "email/undeliverable": "Payreq n'a pas pu livrer le courrier par e-mail",
                "email/no-active-email-addresses": "Il n'y a pas d'adresse e-mail active pour le payeur actif. Veuillez vérifier l'inscription.",
                "myob/undeliverable": "Payreq n'a pas pu livrer le courrier par MYOB",
                "myob/no-active-registration": "Payreq n'a pas pu livrer le courrier par MYOB, car il n'y avait pas d'enregistrement actif",
                "mybillsagent/undeliverable": "Payreq n'a pas pu livrer le courrier par MyBills Agent",
                "mybillsagent/no-active-registration": "Payreq n'a pas pu livrer le courrier par MyBills Agent, car il n'y avait pas d'enregistrement actif",
                "mybills/undeliverable": "Payreq n'a pas pu livrer le courrier par MyBills",
                "mybills/no-active-registration": "Payreq n'a pas pu livrer le courrier, car il n'y avait pas d'enregistrement actif",
                "reckon/undeliverable": "Payreq n'a pas pu livrer le courrier par Reckon",
                "reckon/no-active-registration": "Payreq n'a pas pu livrer le courrier par Reckon, car il n'y avait pas d'enregistrement actif",
                "einvoicing/undeliverable": "Payreq n'a pas pu livrer le courrier par eInvoicing",
                "einvoicing/duplicate-facture-number": "Payreq n'a pas pu envoyer l'e-mail par eInvoicing car le numéro de facture est un double de celui envoyé précédemment.",
                "archive/undeliverable": "Payreq n'a pas pu livrer le courrier de l'archive.",
                "archive/no-active-registration": "Payreq n'a pas pu livrer le courrier de l'archive, car il n'y avait pas d'enregistrement actif",
                "mastercard-bpx/undeliverable": "Payreq n'a pas pu livrer le courrier par Mastercard",
                "mybills-bills/undeliverable": "Payreq n'a pas pu livrer le courrier à un compte Payreq",
                "mybills-bills/no-active-registration": "Payreq n'a pas pu livrer le courrier de l'archive, car il n'y avait pas d'enregistrement actif",
            }
        },
        "autoPaymentStatus": "Statut du paiement automatique",
        "autoPaymentStatusLabel": {
            "Scheduled": "Scheduled",
            "above-limit": "Au-dessus de la limite fixée par le payeur",
            "failed": "Failed Payment",
            "none": "Aucun paiement prévu"
        },
        "reviewedBy": "Approuvé",
        "reviewedByValue": "Par %@ le %@",

        "emailDeliveryDetails": "Détails de la livraison par courriel",
        "emailSubject": "Sujet du courriel",
        "emailReplyTo": "RRépondre à l'adresse",
        "emailAttachment": "Comprend la pièce jointe?",
        "emailHtml": "Contenu de l'courriel"
    },

    "epost": {
        "outgoingBills": "Courrier sortant",
        "outgoingBill": "Courrier sortant",

        "upload": "Télécharger le courrier",
        "uploadActions": {
            "confirm": "Télécharger le courrier",
        },

        "billerInvoiceNumber": "Identifiant du document de messagerie",
        "billDocumentSize": "Taille du document de messagerie",
        "billPageNumbers": "Nombre de pages",
        "payerName": "Nom de l'employé",
        "billerAccountNumber": "ID d'employé",
        "amountDue": "Montant dû",
        "dueDate": "Minimum dû",
        "dueDateTotal": "Total dû",
        "billType": "Type de courrier",
        "firstActionedTime": "Envoyé",
        "numPayersSentTo": "Nombre de destinataires",
        "numPayersFailed": "Nombre de destinataires ayant échoué",
        "jobId": "Identifiant du travail",

        "downloadDocument": "Télécharger le document de courrier",
        "approveBill": "Approuver le courrier",
        "noBillsFound": "Aucun courrier sortant trouvé.",

        "billDetails": "Détails du courrier",
        "billAccounting": "Comptabilité du courrier",

        "noAttachmentFound": "Aucune pièce jointe trouvée.",
        "noViewPermission": "Autorisation d'afficher les documents désactivée",

        "exactSearch": "Rechercher une correspondance exacte d’un Contact ID",
        "exactSearchJobId": "Rechercher une correspondance exacte d’un Job ID",
        "advancedSearch": "Recherche avancée sur le statut et le modèle:",

        "deregModalTitle": "Action requise : abonnements dans 'Désactiver?' languette",
        "deregModalMessage": "Il y a des abonnements dans la section 'Désactiver' onglet nécessitant une action. Actionnez-les pour continuer à télécharger le courrier.",
        "deregModalConfirm": "Vue",
        "deregModalClose": "Fermer",

        "billRecipients": "Destinataires du courrier",

        "recipients": {
            "payerName": "Nom du destinataire",
            "receivedDate": "Date d'inscription du destinataire",
            "sentOn": "Courrier envoyé le",
            "nonDeliveryDate": "Date de non-livraison",
            "nonDeliveryReason": "Motif de non-livraison",
            "deliveredSuccessfully": "Livré avec succès",
            "noRecipients": "Aucun destinataire trouvé.",
        },

        "abbr": {
            "billerAccountNumber": "Numéro de compte"
        },

        "statusLabel": {
            "pending-registration": "En attente d'abonnement"
        },

        "statusDescription": {
            "draft": "Erreur. Le courrier a été placé dans un état d'erreur en raison d'erreurs de validation.",
            "ignored": "Erreur. Le courrier a été placé en état d'erreur car il n'y a pas d'abonnement actif",
            "review-by-biller": "L'expéditeur a demandé que tout le courrier soit examiné avant d'être envoyé.",
            "ready-for-dispatch": "Le courrier a été mis en file d'attente pour l'envoi par Payreq",
            "dispatched": "Le courrier a été envoyé par Payreq.",
            "ready-for-dispatch-awaiting-credit": "Il n'y avait pas assez de crédit pour envoyer ce courrier. Veuillez contacter le service d'assistance Payreq pour recharger votre compte.",
            "rejected": "Le courrier a été rejeté par l'expéditeur.",
            "pending-registration": "Aucun abonnement actif trouvé pour le courriel",
            "undelivered": "Le courrier a été envoyé par Payreq.",
        },

        "billTypes": {
            "statement": "Déclaration",
            "notice": "Remarquer",
            "bill": "Facture"
        },

        "validationFailure": {
            "payer-must-be-active": "Un numéro de compte a été fourni, mais est introuvable ou est inactif",
            "after-created-time": "%@1 doit être postérieur à la date de création du courrier",
            "less-than-18-months-after-created-time": "%@1 doit être inférieur à 18 mois après la date de création du courrier",
            "document-not-found": "Le fichier image pour le courrier est introuvable.",
            "no-contact-found": "Impossible de trouver un contact correspondant pour le nom de l'employé",
            "multiple-contacts": "Plus d'un contact trouvé pour le nom de l'employé",
            "max-pdf-size-exceeded": "La taille d'un document PDF ne peut pas dépasser 200 Ko pour une fiche de paie",
            "max-pages-exceeded": "Le document PDF ne peut pas dépasser le nombre maximum de pages"
        },

        "billPayer": {
            "nonDeliveredReason": {
                "invalid-expiry-date": "La date d'expiration de l'e-mail n'était pas valide.",
                "invalid-creation-date": "La date de création du courrier n'était pas valide.",
                "invalid-payer-account": "Les détails du compte dans l'e-mail n'étaient pas valides.",
                "epost/unidentified": "Pas clair",
                "epost/invalid-accntno": "Aucun abonnement postel ne correspond au numéro de compte.",
                "epost/closed-ebox": "La boîte postale a été fermée.",
                "epost/invalid-ebox": "La boîte postale n'existe pas.",
                "epost/wrong-ebox": "Un abonnement existe, mais pour une autre boîte postale.",
                "epost/closed-subscription": "L'abonnement a été clôturé.",
                "epost/invalid-subscription-id": "L'ID d'abonnement fourni n'existe pas.",
                "epost/invalid-detail-file-path": "Le fichier contenant le document (c'est-à-dire PDF) n'existe pas ou n'est pas référencé correctement.",
                "epost/wrong-pubid": "Il existe un abonnement ouvert pour le numéro de compte, mais sous une autre publication.",
                "epost/provider-notactive": "L'indicateur actif pour le nom de l'expéditeur est 0. Aucun envoi postal n'est disponible pour examen.",
                "epost/invalid-provider": "Ce Mailer n'existe pas. Aucun article postal n'est disponible pour examen.",
                "epost/payment-data-missing": "Si Type de courrier = \"B\", une ressource de données de paiement est requise."
            }
        },

        "uploadModal": {
            "add-no-bills": "Mettre à jour les contacts uniquement, ne pas envoyer de courrier",
            "replace-no-bills": "Remplacer les contacts uniquement, ne pas envoyer de courrier",

            "billLoadTypes": {
                "standard": "Standard",
                "archive": "Archive (les courriers sans inscription seront sauvegardés dans l'archive)",
                "historique": "Historique (documents précédemment envoyés à enregistrer uniquement)",
            },

            "errors": {
                "confirmationRequired": "Le fichier téléchargé a été précédemment traité pour les formats suivants. Appuyez à nouveau sur le bouton \"Télécharger le courrier\" pour réexécuter le fichier téléchargé."
            }

        },

        "acceptAllConfirm": "Voulez-vous vraiment <strong> approuver le courrier %@ </strong> actuellement dans le statut \"Approbation nécessaire \"?",
        "rejectAllConfirm": "Voulez-vous vraiment <strong> rejeter le message %@ </strong> actuellement dans le statut \"Approbation nécessaire \"?",

        "billFieldDescription": {
            "biller-customer-number": "Numéro de compte",
            "biller-invoice-number": "Identifiant du document de messagerie",
            "biller-account-number": "Numéro de compte"
        }
    },

    "mybills": {
        "outgoingBills": "Courrier sortant",
        "outgoingBill": "Courrier sortant",

        "upload": "Télécharger le courrier",
        "uploadActions": {
            "confirm": "Télécharger le courrier",
        },

        "billerInvoiceNumber": "Identifiant du document de messagerie",
        "billDocumentSize": "Taille du document de messagerie",
        "billPageNumbers": "Nombre de pages",
        "payerName": "Nom de l'employé",
        "billerAccountNumber": "ID d'employé",
        "amountDue": "Montant dû",
        "dueDate": "Minimum dû",
        "dueDateTotal": "Total dû",
        "billType": "Type de courrier",
        "firstActionedTime": "Envoyé",
        "numPayersSentTo": "Nombre de destinataires",
        "numPayersFailed": "Nombre de destinataires ayant échoué",
        "jobId": "Identifiant du travail",

        "downloadDocument": "Télécharger le document de courrier",
        "approveBill": "Approuver le courrier",
        "noBillsFound": "Aucun courrier sortant trouvé.",

        "billDetails": "Détails du courrier",
        "billAccounting": "Comptabilité du courrier",

        "noAttachmentFound": "Aucune pièce jointe trouvée.",
        "noViewPermission": "Autorisation d'afficher les documents désactivée",

        "billRecipients": "Destinataires du courrier",

        "recipients": {
            "payerName": "Nom du destinataire",
            "receivedDate": "Date d'inscription du destinataire",
            "sentOn": "Courrier envoyé le",
            "nonDeliveryDate": "Date de non-livraison",
            "nonDeliveryReason": "Motif de non-livraison",
            "deliveredSuccessfully": "Livré avec succès",
            "noRecipients": "Aucun destinataire trouvé.",
        },

        "abbr": {
            "billerAccountNumber": "Numéro de compte"
        },

        "statusLabel": {
            "pending-registration": "En attente d'abonnement"
        },

        "statusDescription": {
            "draft": "Erreur. Le courrier a été placé dans un état d'erreur en raison d'erreurs de validation.",
            "ignored": "Erreur. Le courrier a été placé en état d'erreur car il n'y a pas d'abonnement actif",
            "review-by-biller": "L'expéditeur a demandé que tout le courrier soit examiné avant d'être envoyé.",
            "ready-for-dispatch": "Le courrier a été mis en file d'attente pour l'envoi par Payreq",
            "dispatched": "Le courrier a été envoyé par Payreq.",
            "ready-for-dispatch-awaiting-credit": "Il n'y avait pas assez de crédit pour envoyer ce courrier. Veuillez contacter le service d'assistance Payreq pour recharger votre compte.",
            "rejected": "Le courrier a été rejeté par l'expéditeur.",
            "pending-registration": "Aucun abonnement actif trouvé pour le courriel"
        },

        "billTypes": {
            "statement": "Déclaration",
            "notice": "Remarquer",
            "bill": "Facture"
        },

        "validationFailure": {
            "payer-must-be-active": "Un numéro de compte a été fourni, mais est introuvable ou est inactif",
            "after-created-time": "%@1 doit être postérieur à la date de création du courrier",
            "less-than-18-months-after-created-time": "%@1 doit être inférieur à 18 mois après la date de création du courrier",
            "document-not-found": "Le fichier image pour le courrier est introuvable.",
            "no-contact-found": "Impossible de trouver un contact correspondant pour le nom de l'employé",
            "multiple-contacts": "Plus d'un contact trouvé pour le nom de l'employé",
            "max-pdf-size-exceeded": "La taille d'un document PDF ne peut pas dépasser 200 Ko pour une fiche de paie",
            "max-pages-exceeded": "Le document PDF ne peut pas dépasser le nombre maximum de pages"
        },

        "billPayer": {
            "nonDeliveredReason": {
                "invalid-expiry-date": "La date d'expiration de l'e-mail n'était pas valide.",
                "invalid-creation-date": "La date de création du courrier n'était pas valide.",
                "invalid-payer-account": "Les détails du compte dans l'e-mail n'étaient pas valides.",
                "epost/unidentified": "Pas clair",
                "epost/invalid-accntno": "Aucun abonnement postel ne correspond au numéro de compte.",
                "epost/closed-ebox": "La boîte postale a été fermée.",
                "epost/invalid-ebox": "La boîte postale n'existe pas.",
                "epost/wrong-ebox": "Un abonnement existe, mais pour une autre boîte postale.",
                "epost/closed-subscription": "L'abonnement a été clôturé.",
                "epost/invalid-subscription-id": "L'ID d'abonnement fourni n'existe pas.",
                "epost/invalid-detail-file-path": "Le fichier contenant le document (c'est-à-dire PDF) n'existe pas ou n'est pas référencé correctement.",
                "epost/wrong-pubid": "Il existe un abonnement ouvert pour le numéro de compte, mais sous une autre publication.",
                "epost/provider-notactive": "L'indicateur actif pour le nom de l'expéditeur est 0. Aucun envoi postal n'est disponible pour examen.",
                "epost/invalid-provider": "Ce Mailer n'existe pas. Aucun article postal n'est disponible pour examen.",
                "epost/payment-data-missing": "Si Type de courrier = \"B\", une ressource de données de paiement est requise."
            }
        },

        "uploadModal": {
            "add-no-bills": "Mettre à jour les contacts uniquement, ne pas envoyer de courrier",
            "replace-no-bills": "Remplacer les contacts uniquement, ne pas envoyer de courrier",

            "billLoadTypes": {
                "standard": "Standard",
                "archive": "Archive (les courriers sans inscription seront sauvegardés dans l'archive)",
                "historique": "Historique (documents précédemment envoyés à enregistrer uniquement)",
            },

            "errors": {
                "confirmationRequired": "Le fichier téléchargé a été précédemment traité pour les formats suivants. Appuyez à nouveau sur le bouton \"Télécharger le courrier\" pour réexécuter le fichier téléchargé."
            }

        },

        "acceptAllConfirm": "Voulez-vous vraiment <strong> approuver le courrier %@ </strong> actuellement dans le statut \"Approbation nécessaire \"?",
        "rejectAllConfirm": "Voulez-vous vraiment <strong> rejeter le message %@ </strong> actuellement dans le statut \"Approbation nécessaire \"?",

        "billFieldDescription": {
            "biller-customer-number": "Numéro de compte",
            "biller-invoice-number": "Identifiant du document de messagerie",
            "biller-account-number": "Numéro de compte"
        }
    },
    "mybills-bills": {
        "outgoingBills": "Courrier sortant",
        "outgoingBill": "Courrier sortant",

        "upload": "Télécharger le courrier",
        "uploadActions": {
            "confirm": "Télécharger le courrier",
        },

        "billerInvoiceNumber": "Identifiant du document de messagerie",
        "billDocumentSize": "Taille du document de messagerie",
        "billPageNumbers": "Nombre de pages",
        "payerName": "Nom du client",
        "billerAccountNumber": "Numéro de compte",
        "amountDue": "Montant dû",
        "dueDate": "Minimum dû",
        "dueDateTotal": "Total dû",
        "billType": "Type de courrier",
        "firstActionedTime": "Envoyé",
        "numPayersSentTo": "Nombre de destinataires",
        "numPayersFailed": "Nombre de destinataires ayant échoué",
        "jobId": "Identifiant du travail",

        "downloadDocument": "Télécharger le document de courrier",
        "approveBill": "Approuver le courrier",
        "noBillsFound": "Aucun courrier sortant trouvé.",

        "billDetails": "Détails du courrier",
        "billAccounting": "Comptabilité du courrier",

        "noAttachmentFound": "Aucune pièce jointe trouvée.",
        "noViewPermission": "Autorisation d'afficher les documents désactivée",

        "billRecipients": "Destinataires du courrier",

        "recipients": {
            "payerName": "Nom du destinataire",
            "receivedDate": "Date d'inscription du destinataire",
            "sentOn": "Courrier envoyé le",
            "nonDeliveryDate": "Date de non-livraison",
            "nonDeliveryReason": "Motif de non-livraison",
            "deliveredSuccessfully": "Livré avec succès",
            "noRecipients": "Aucun destinataire trouvé.",
        },

        "abbr": {
            "billerAccountNumber": "Numéro de compte"
        },

        "statusLabel": {
            "pending-registration": "En attente d'abonnement"
        },

        "statusDescription": {
            "draft": "Erreur. Le courrier a été placé dans un état d'erreur en raison d'erreurs de validation.",
            "ignored": "Erreur. Le courrier a été placé en état d'erreur car il n'y a pas d'abonnement actif",
            "review-by-biller": "L'expéditeur a demandé que tout le courrier soit examiné avant d'être envoyé.",
            "ready-for-dispatch": "Le courrier a été mis en file d'attente pour l'envoi par Payreq",
            "dispatched": "Le courrier a été envoyé par Payreq.",
            "ready-for-dispatch-awaiting-credit": "Il n'y avait pas assez de crédit pour envoyer ce courrier. Veuillez contacter le service d'assistance Payreq pour recharger votre compte.",
            "rejected": "Le courrier a été rejeté par l'expéditeur.",
            "pending-registration": "Aucun abonnement actif trouvé pour le courriel"
        },

        "billTypes": {
            "statement": "Déclaration",
            "notice": "Remarquer",
            "bill": "Facture"
        },

        "validationFailure": {
            "payer-must-be-active": "Un numéro de compte a été fourni, mais est introuvable ou est inactif",
            "after-created-time": "%@1 doit être postérieur à la date de création du courrier",
            "less-than-18-months-after-created-time": "%@1 doit être inférieur à 18 mois après la date de création du courrier",
            "document-not-found": "Le fichier image pour le courrier est introuvable.",
            "no-contact-found": "Impossible de trouver un contact correspondant pour le nom de l'employé",
            "multiple-contacts": "Plus d'un contact trouvé pour le nom de l'employé",
            "max-pdf-size-exceeded": "La taille d'un document PDF ne peut pas dépasser 200 Ko pour une fiche de paie",
            "max-pages-exceeded": "Le document PDF ne peut pas dépasser le nombre maximum de pages"
        },

        "billPayer": {
            "nonDeliveredReason": {
                "invalid-expiry-date": "La date d'expiration de l'e-mail n'était pas valide.",
                "invalid-creation-date": "La date de création du courrier n'était pas valide.",
                "invalid-payer-account": "Les détails du compte dans l'e-mail n'étaient pas valides.",
                "epost/unidentified": "Pas clair",
                "epost/invalid-accntno": "Aucun abonnement postel ne correspond au numéro de compte.",
                "epost/closed-ebox": "La boîte postale a été fermée.",
                "epost/invalid-ebox": "La boîte postale n'existe pas.",
                "epost/wrong-ebox": "Un abonnement existe, mais pour une autre boîte postale.",
                "epost/closed-subscription": "L'abonnement a été clôturé.",
                "epost/invalid-subscription-id": "L'ID d'abonnement fourni n'existe pas.",
                "epost/invalid-detail-file-path": "Le fichier contenant le document (c'est-à-dire PDF) n'existe pas ou n'est pas référencé correctement.",
                "epost/wrong-pubid": "Il existe un abonnement ouvert pour le numéro de compte, mais sous une autre publication.",
                "epost/provider-notactive": "L'indicateur actif pour le nom de l'expéditeur est 0. Aucun envoi postal n'est disponible pour examen.",
                "epost/invalid-provider": "Ce Mailer n'existe pas. Aucun article postal n'est disponible pour examen.",
                "epost/payment-data-missing": "Si Type de courrier = \"B\", une ressource de données de paiement est requise."
            }
        },

        "uploadModal": {
            "add-no-bills": "Mettre à jour les contacts uniquement, ne pas envoyer de courrier",
            "replace-no-bills": "Remplacer les contacts uniquement, ne pas envoyer de courrier",

            "billLoadTypes": {
                "standard": "Standard",
                "archive": "Archive (les courriers sans inscription seront sauvegardés dans l'archive)",
                "historique": "Historique (documents précédemment envoyés à enregistrer uniquement)",
            },

            "errors": {
                "confirmationRequired": "Le fichier téléchargé a été précédemment traité pour les formats suivants. Appuyez à nouveau sur le bouton \"Télécharger le courrier\" pour réexécuter le fichier téléchargé."
            }

        },

        "acceptAllConfirm": "Voulez-vous vraiment <strong> approuver le courrier %@ </strong> actuellement dans le statut \"Approbation nécessaire \"?",
        "rejectAllConfirm": "Voulez-vous vraiment <strong> rejeter le message %@ </strong> actuellement dans le statut \"Approbation nécessaire \"?",

        "billFieldDescription": {
            "biller-customer-number": "Numéro de compte",
            "biller-invoice-number": "Identifiant du document de messagerie",
            "biller-account-number": "Numéro de compte"
        }
    }
});
