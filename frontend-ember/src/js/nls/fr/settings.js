define({
        "all": {
            "notifications": "Notifications",
            "permissions": "Permissions",
            "passwordEvents": "Événements de mot de passe",
            "userDetails": "Détails de l'utilisateur",
            "accounting": "Plans comptables",
            "payments": "Paiements",
            "contactDetails": "Détails du contact",
            "apiDetails": "Payreq API",
            "bulkDownloadPreference": "Préférence de téléchargement en masse",
            "billTemplates": "Documents partagés",
            "users": "Utilisateurs",
            "accountPermissions": "Autorisations de compte",
            "connections": "Connexions",
            "channels": "canaux",
            "update": "Enregistrer",
            "consents": "Authorisations",
            "forwardingRules": "Règle de transfert",

            "activateMfa":  "Pour activer l'authentification multifacteur pour toutes les connexions utilisateur.",
            "activateMfaButton":  "Activer",
            "deactivateMfa":  "Une authentification multifacteur est requise pour tous les utilisateurs. Pour désactiver l'authentification multifacteur, veuillez contacter le support Payreq.",
            "mfaActivateSuccess": "L'authentification multifacteur a été activée",
            "mfaActivateError": "L'authentification multifacteur n'a pas pu être activée. Veuillez contacter le support Payreq.",
            "mfaActivateFailed":  "Une erreur s'est produite lors de l'activation de l'authentification multifacteur sur ce compte. Veuillez contacter le support Payreq.",
            "mfaResetSuccess": "L'authentification multifacteur a été réinitialisée pour %@",
            "mfaResetError": "L'authentification multifacteur n'a pas pu être réinitialisée pour  %@. Veuillez contacter le support Payreq.",
            "mfaResetFailed":  "Une erreur s'est produite lors de la réinitialisation de l'authentification multifacteur pour %@.Veuillez contacter le support Payreq.",

            "templates": {
                "noTemplatesFound": "Aucun document partagé trouvé pour cet expéditeur.",
                "name": "Nom",
                "filename": "Nom du fichier",
                "createdOn": "Créé le",
                "createdBy": "Créé par",
                "action": "Action",
            },
            "successfulTemplateUpload": "Nous vous informerons sous peu lorsque vous pourrez commencer à envoyer le type de document à vos employés. Si vous avez des questions, contactez-nous à support@payreq.com",
            "templateErrors": {
                "invalid.filetype": "Le fichier sélectionné ne peut pas être téléchargé car son type de fichier n'est pas supporté. Veuillez télécharger un fichier avec un type de fichier valide",
                "invalid.filetype.csv": "Le fichier sélectionné ne peut pas être importé car son type de fichier n'est pas supporté. Veuillez télécharger un fichier CSV avec des colonnes correspondant au format détaillé ci-dessus.",
                "invalid.filetype.html": "Le fichier sélectionné ne peut pas être importé car son type de fichier n'est pas supporté. Veuillez télécharger un fichier HTML.",
                "invalid.filetype.pdf": "Le fichier sélectionné ne peut pas être importé car son type de fichier n'est pas supporté. Veuillez télécharger un fichier PDF.",
            },
            "genericTemplateError":  "mpossible de créer un modèle de courrier électronique. Veuillez contacter le support Payreq.",
            "genericTemplateFail": "Une erreur s'est produite lors du téléchargement du modèle de courrier électronique pour ce mailer. Veuillez réessayer plus tard.",

            "consentSettings": {
                "status": {
                    "pending": "En attente",
                    "authorised": "Autorisé",
                    "deactivated": "Désactivé",
                    "cancelled": "Annulé"
                },

                "heading": "Autorisations Payreq MyBills Agent",
                "searchPlaceholder": "Rechercher une autorisation par adresse courriel ou nom d'agent",
                "billerLabel": "Biller",
                "agentLabel": "Agent",
                "emailLabel": "Adresse courriel",
                "statusLabel": "Statut",
                "noticeIdLabel": "Identifiant de l'avis",
                "authorisedOnLabel": "Autorisé le",
                "unAuthorisedOnLabel": "Non autorisé sur",
                "actions": "Actions",
                "noAuthorisations": "Aucune autorisation Payreq MyBills Agent.",

                "billerHeading": "Demande de consentement MyBills Agent",
                "billerText": "Pour gérer les inscriptions au nom d'un Agent, veuillez saisir l'adresse e-mail de son compte Payreq MyBills et cliquez sur «Envoyer la demande». L'agent recevra une demande par e-mail et devra vérifier l'autorisation avant de pouvoir utiliser cette fonctionnalité.",
                "billerAgentEmail": "Adresse Courriel",
                "requestButton": "Envoyer une demande",

                "errors": {
                    "invalid.email": "Adresse courriel saisie incorrecte.",
                    "max.retries": "Nombre maximum d'essais invalides pour trouver un compte Payreq atteint. Veuillez contacter le support Payreq.",
                    "no.user": "L'utilisateur Payreq n'existe pas pour %@",
                    "pending.rego": "L'autorisation MyBills Agent en attente existe déjà pour %@. Veuillez consulter les autorisations d'agent MyBills ci-dessous."
                },

                "resendSuccess": "Courriel d'autorisation MyBills Agent renvoyé à %@",
                "resendErrorMessage": "Une erreur s'est produite lors de l'envoi de l'e-mail d'autorisation MyBills Agent. Veuillez réessayer plus tard.",
                "resendErrors": {
                    "max.resends": "Le nombre maximal de renvois a été atteint. Veuillez contacter le support Payreq"
                },

                "authUpdate": "Autorisation mise à jour avec succès.",
                "authUpdateError": "Une erreur s'est produite lors de la mise à jour de l'autorisation Payreq MyBills Agent sélectionnée. Veuillez réessayer plus tard.",

                "cancel": "Annuler",
                "ok": "D'accord",
                "unauthoriseModalHeading": "Gestion des inscriptions Payreq MyBills Agent non autorisée",
                "unauthoriseModalText": "Êtes-vous sûr de vouloir autoriser la gestion des inscriptions MyBills Agent pour <strong>{{{email}}}</strong>?",

                "removeAuth": "Gestion des inscriptions non autorisée ( %@ )",
                "removeAuthBiller": "Gestion des inscriptions non autorisée pour l'agence %@ ( %@ )",
                "removeAuthError": "Une erreur s'est produite lors de la mise à jour de votre autorisation MyBills Agent. Veuillez réessayer plus tard.",

                "sentConsent": "Une demande de consentement par courriel a été envoyée à %@",
                "setConsentError": "Une erreur s'est produite lors de l'envoi d'une demande de consentement. Veuillez réessayer plus tard.",
                "getAuthError": "Une erreur s'est produite lors de l'actualisation des autorisations MyBills Agent pour cet émetteur de factures. Veuillez réessayer plus tard."
            },

            "billerSettings": {
                "options": "Les options",

                "sendInactiveToPrinter": "Les documents sans inscription active seront envoyés pour impression.",
                "checkMaxPrintingDocumentPages": "Taille maximale des pages pour l'impression:",
                "checkMaxDocumentPagesMsg": "Payreq validera que les documents ne dépassent pas %@ page(s) avant l'envoi.",
                "mailhouseId": "Identifiant Mailhouse: ",
                "printKey": "Touche d'impression: ",

                "errorMaxPagesRequired": "Impossible de mettre à jour les options des paramètres. Contactez le support Payreq pour configurer la validation des pages maximales",

                "dueDateReplacementWords": "Mots de remplacement de la date d'échéance (séparés par des virgules)",
                "noPaymentRequiredReplacementWord": "Mot de remplacement pour « aucun paiement requis »",

                "field1": "Field #1",
                "field2": "Field #2",
                "field3": "Field #3",
                "field4": "Field #4",

                "useAuthField1": "Obligatoire?",
                "useAuthField2": "Obligatoire?",
                "useAuthField3": "Obligatoire?",
                "useAuthField4": "Obligatoire?",

                "contactIdField1": "Champ de contact #1",
                "contactIdField2": "Champ de contact #2",
                "contactIdField3": "Champ de contact #3",
                "contactIdField4": "Champ de contact #4",
                "contactIdField5": "Champ de contact #5",
                "contactIdField6": "Champ de contact #6",
                "contactIdField7": "Champ de contact #7",
                "contactIdField8": "Champ de contact #8",

                "billRefField1": "Champ de facture #1",
                "billRefField2": "Champ de facture #2",
                "billRefField3": "Champ de facture #3",
                "billRefField4": "Champ de facture #4",
                "billRefField5": "Champ de facture #5",
                "billRefField6": "Champ de facture #6",

                "contactIdFields": "Paramètres du champ de contact",
                "updateContactIdFields": "Mettre à jour les champs de contact",
                "deliveryChannelFields": "Paramètres du canal de livraison",
                "billRefFields": "Paramètres du champ de facturation",
                "updateBillRefFields": "Mettre à jour les champs de facture",
                "updateOptions": "Options de mise à jour",
                "IdHeader": "Identifiant",
                "AuthHeader": "Auto",
                "update": "Mettre à jour la chaîne",

                "systemProperties": "Propriétés du système",
                "generateEmailAddress": "Générez-en un maintenant",
                "mandatoryDocumentSizeValidation": "Valider le document < 200KB",
                "checkEmployeeName": "Vérifier que le nom de l'abonnement correspond au nom de l'employé",
                "checkMaxDocumentPages": "Valider le nombre de pages du document",

                "saasuAccountProperties": "SAASU Account Properties",
                "fileId": "Numéro d’identification du fichier",
                "webServiceKey": "Web Services Key",

                "qboPayrollAccountProperties": "QuickBooks Online Propriétés",

                "mailerOptionsUpdated": "Les paramètres de l'expéditeur ont bien été mis à jour.",
                "mailerOptionsUpdateFailed": "Une erreur s'est produite lors de la mise à jour des paramètres de facturation. Veuillez réessayer plus tard.",
                "contactFieldsUpdated": "Les paramètres du champ de contact de l'expéditeur ont bien été mis à jour.",
                "contactFieldsUpdateFailed": "Une erreur s'est produite lors de la mise à jour des paramètres de facturation. Veuillez réessayer plus tard.",
                "billFieldsUpdated": "Les paramètres du champ de facturation de l'expéditeur ont bien été mis à jour.",
                "billFieldsUpdateFailed": "Une erreur s'est produite lors de la mise à jour des paramètres de facturation. Veuillez réessayer plus tard.",
                "qboDisconnected": "Le compte QuickBooks en ligne a été déconnecté de Payreq.",
                "qboDisconnectFailed": "Une erreur s'est produite lors de la déconnexion de votre compte QuickBooks en ligne. Veuillez réessayer plus tard."
            },

            "userSettings": {
                "notificationInstructions": "Cette page vous permet de modifier les paramètres de notification d'un utilisateur.",
                "userNameMissing": "Veuillez saisir un nom.",
                "userNameMax": "Veuillez saisir un nom de moins de 256 caractères",
                "notesMax": "Veuillez saisir des notes de moins de 2000 caractères",
                "workPhoneNumberMissing": "Veuillez saisir un numéro de téléphone professionnel.",
                "invalidPhoneNumber": "S'il vous plaît entrer un numéro de téléphone valide. Peut contenir uniquement des chiffres, +, - et de l'espace. Le nombre de chiffres doit être supérieur à 7 et inférieur à 13",
                "emailMissing": "S'il vous plaît, mettez une adresse courriel valide.",
                "inviteNewUser": "Inviter un nouvel utilisateur",
                "inviteUser": "Inviter un utilisateur",
                "permissionError": "Vous devez attribuer au moins une autorisation de %@",
                "roles": {
                    "1": "Visionneuse d'inscription",
                    "2": "Approbateur d'inscription",
                    "3": "Administrateur des paramètres de messagerie",
                    "4": "Visionneuse de messagerie",
                    "5": "Gestionnaire de messagerie",
                    "6": "Visionneuse de contacts",
                    "7": "Éditeur de contacts",
                    "8": "Administrateur client",
                    "9": "Utilisateur de l'API Payreq",
                    "10": "Utilisateur de la console Payreq",
                    "100": "Gestionnaire de courrier entrant",
                    "101": "Responsable des inscriptions entrantes",
                    "102": "Administrateur des paramètres entrants",
                    "11": "Soumissionnaire de courrier",
                    "12": "Visionneuse de messagerie - Aucun document PDF",
                },
                "languages": {
                    "en": "English",
                    "fr": "Français"
                },
                "preferredLanguage": "Langue",
                "preferredLanguagePrompt": "Choisir la langue",

                "billersToAdd": "Ajouter aux émetteurs de factures",
                "billersToAddPlaceholder": "Sélectionnez un Biller...",

                "billStatusPlaceholder": "Sélectionnez un statut...",

                "user": {
                    "uid": "Identifiant d'utilisateur",
                    "email": "Email",
                    "status": "Statut",
                    "lastAccessOn": "Dernier accès le",
                    "name": "Nom",
                    "workPhoneNumber": "Numéro de téléphone professionnel",
                    "mobileNumber": "Numéro de cellulaire",
                    "mfaActivated":"MFA activé",
                    "yes": "Oui",
                    "no": "Non",
                    "apiAccess": "Accès API",
                    "notes": "Remarques",
                    "passwordResetRequest": "Demande de réinitialisation du mot de passe",
                    "passwordResetRequestDesc": "Réinitialisation du mot de passe demandée par cet utilisateur",
                    "passwordResetRequestDescWithDate": "Réinitialisation du mot de passe demandée par cet utilisateur le",
                    "copyPasswordResetLink": "Copier le lien de réinitialisation du mot de passe",
                    "copyPasswordResetLinkDesc": "Il s'agit du lien de réinitialisation du mot de passe envoyé à l'utilisateur par courriel"
                },
                "revokeAllAccess": "Accès révoqué",
                "update": "Mettre à jour l'utilisateur",
                "notificationSettings": "Paramètres de notification",
                "resendInvitation": "Renvoyer l'invitation",
                "statusList": {
                    "pending": "En attente",
                    "active": "Active",
                    "locked": "Fermé à clé"
                },
                "permissions": {
                    "title": "Autorisations pour",
                    "apiAccess": "Accès API",
                    "payreq": "Type d'utilisateur",
                    "contacts": "Autorisation des contacts",
                    "registrations": "Autorisation d'inscription",
                    "bills": "Autorisation de messagerie",
                    "billerSettings": "Autorisation des paramètres de messagerie",
                    "emptyPrompt": "Pas d'accès",
                    "subBillerEmptyPrompt": "Hériter du parent émetteur de factures"
                },
                "apiUserRoleId": "9",
                "notificationUpdateSuccessMessage": "Les paramètres de notification ont bien été mis à jour.",
                "notificationsIntro": "Des courriels de notification peuvent être envoyés à votre adresse courriel enregistrée lorsque des événements spécifiques se produisent dans le système Payreq. Chaque notification peut être envoyée à une fréquence particulière.",
                "notificationsTitle": "Paramètres de notification pour",
                "notificationPreferenceValues": {
                    "never": "Jamais",
                    "immediate": "Immédiatement",
                    "frequent": "À chaque heure",
                    "infrequent": "À chaque jour",
                    "immediateDescription": "La notification sera envoyée dès que l'événement se produira.",
                    "frequentDescription": "Toutes les notifications pour l'événement qui se produisent dans l'heure seront envoyées sous forme de notification unique à l'heure.",
                    "infrequentDescription": "Toutes les notifications d'événement survenant au cours de la journée seront envoyées en une seule notification à la fin de la journée."
                },
                "notificationPreferenceDescription": {
                    "autopayment.created": "Paiement automatique créé",
                    "bill.waiting": "Le courrier n'a pas pu être envoyé en raison de l'attente de l'approbation",
                    "account.permissions": "Les autorisations sur ce compte ont été modifiées",
                    "registration.failed": "Un abonnement a échoué",
                    "bill.nondelivery": "Le partenaire de distribution n'a pas pu livrer un document",
                    "registration.complete": "Un abonnement a réussi",
                    "registration.waiting": "Un abonnement est en attente d'approbation",
                    "bill.processed": "Le courrier a bien été envoyé",
                    "bill.draft": "Le courrier n'a pas pu être envoyé en raison d'une erreur",
                    "deregistration.complete": "Un abonnement a été désactivé",
                    "contact.rejected": "Un contact a été rejeté par un fournisseur en amont",
                    "bill.awaitingcredit": "Le courrier n'a pas pu être envoyé en raison d'un crédit insuffisant",
                    "job.failed": "Un travail a échoué",
                    "registration.contactchanged": "Un abonnement est signalé pour une éventuelle désactivation",
                    "bill.pendingregistration": "Le courrier n'a pas pu être envoyé faute d'enregistrement",
                    "bill.contactchanged": "Le courrier n'a pas pu être envoyé car l'inscription a été signalée pour une éventuelle désinscription"
                },

                "passwordEvents": {
                    "noEventsFound": "Aucun événement trouvé pour cet utilisateur",
                    "eventList": {
                        "reset-password": "Réinitialisation du mot de passe",
                        "request-reset-password": "Demande de réinitialisation du mot de passe"
                    },
                },
                "frequency": "Fréquence",
                "method": "Méthode",
                "alertTypes": {
                    "email": "Courriel"
                },
                "payerInstructions": "Cette page vous permet de gérer les connexions des utilisateurs qui ont accès à ce compte.",
                "mfaActivateModalHeading": "Activer l'authentification multifacteur",
                "mfaActivateModalText": "Voulez-vous vraiment activer l <strong>Authentification Multifacteur</strong> pour tous les utilisateurs?",
                "mfaActivateModalCancel": "Annuler",
                "mfaActivateModalActivate": "Activer",

                "revokeModalHeading": "Révoquer tous les accès",
                "revokeModalText": "Voulez-vous vraiment révoquer tous les accès pour <strong>{{revokeAllAccessUser.email}}</strong>?",
                "revokeModalCancelButton": "Annuler",
                "revokeModalSubmitButton": "Révoquer tous les accès",
                "revokeAccessSuccess": "Tous les accès ont été révoqués avec succès pour %@.",
                "revokeAccessFailed": "Une erreur s'est produite lors de la révocation de tous les accès pour l'utilisateur. Veuillez réessayer plus tard.",

                "updateRoleSuccessful": "Autorisation mise à jour avec succès.",
                "updateRoleFailed": "Une erreur s'est produite lors de la mise à jour de l'autorisation. Veuillez réessayer plus tard.",
                "updateNotificationSuccessful": "Les paramètres de notification ont bien été mis à jour.",
                "updateNotificationFailed": "Une erreur s'est produite lors de la mise à jour des paramètres de notification. Veuillez réessayer plus tard.",
                "resendInviteSuccessful": "Un courriel a été envoyé à %@ avec un code d'invitation.",
                "resendInviteFailed": "Une erreur s'est produite lors du renvoi d'une invitation pour l'utilisateur. Veuillez réessayer plus tard.",
                "savedUser": "Utilisateur mis à jour avec succès.",
                "savedUserError": "Une erreur s'est produite lors de la mise à jour de l'utilisateur sélectionné. Veuillez réessayer plus tard.",
                "savedUserUnsuccessful": "Impossible de mettre à jour l'utilisateur sélectionné. Veuillez contacter le support Payreq.",

                "inviteExistingUserSuccess": "L'utilisateur avec l'adresse courriel %@ a attribué les autorisations sélectionnées pour ce client.",
                "inviteNewUserSuccess": "Un e-mail a été envoyé à %@ avec un code d'invitation.",
                "inviteUserFailed": "Une erreur s'est produite lors de l'invitation du nouvel utilisateur. Veuillez réessayer plus tard.",
                "inviteUnsuccessful": "Impossible d'inviter un nouvel utilisateur. Veuillez contacter le support Payreq."
            },

            "connectionSettings": {
                "headingSme": "Connexions du logiciel de comptabilité",
                "connected": "Lié",
                "reconnect": "Reconnexion requise",
                "disconnected": "Débranché",
                "headingAgents": "Connexions du logiciel de gestion immobilière",
                "disconnect": "Déconnecter",
                "cancel": "Annuler",
                "or": "OU",
                "connectionDate": "Connecté depuis: ",

                "xero": {
                    "product": "Xero",
                    "authorisationIssue": "Impossible de se connecter à Xero en raison d'une erreur d'autorisation. Veuillez vous reconnecter à Xero.",
                    "connectionIssue": "Impossible de se connecter à Xero",
                    "partnerStatus": "Statut du partenaire: ",
                    "usageHeader": "Utilisation de Payreq Xero",
                    "usageMessage1": "Les seules informations auxquelles Payreq accède depuis votre compte Xero sont:",
                    "usageMessage2": "Vos codes de compte du grand livre pour vous permettre de sélectionner un code de compte pour votre facture. Seul le code de compte sélectionné est stocké dans Payreq.",
                    "usageMessage3": "Le nom de votre société. Ceci est stocké dans Payreq et est visible par vos émetteurs de factures enregistrés",
                    "usageMessage4": "Aucune autre information de Xero n'est accessible par Payreq, les émetteurs de factures enregistrés ou tout autre tiers.",
                    "usageMessage5": "Payreq utilisera votre connexion Xero pour pousser les factures des émetteurs de factures dans vos comptes fournisseurs Xero.",
                    "disconnectMessage": "Se déconnecter de Xero",
                    "modalMessage": "Voulez-vous vraiment vous déconnecter de <strong>Xero</strong>? Tous les abonnements Xero Connect seront désactivés."
                },

                "myob": {
                    "product": "MYOB",
                    "authorisationIssue": "Impossible de se connecter à MYOB en raison d'une erreur d'autorisation. Veuillez vous reconnecter à MYOB.",
                    "usernameDetailLabel": "Nom d'utilisateur MYOB: ",
                    "productDetailLabel": "Produit MYOB: ",
                    "reconnectButton": "Reconnectez-vous à MYOB",
                    "usageHeading": "Utilisation de Payreq MYOB",
                    "usageMessage1": "Payreq doit accéder à votre compte MYOB pour obtenir les détails suivants:",
                    "usageMessage2": "Vos noms commerciaux et identifiants MYOB pour vous permettre de sélectionner l'entreprise MYOB pour la livraison des factures. Seul le Business Identifier est stocké dans Payreq.",
                    "usageMessage3": "Votre profil Nom d'utilisateur. Ceci est stocké dans Payreq et est visible par vos émetteurs de factures enregistrés.",
                    "usageMessage4": "Aucun autre formulaire d'information MYOB n'est accessible par Payreq, les émetteurs de factures enregistrés ou tout autre tiers.",
                    "usageMessage5": "Payreq utilisera votre connexion MYOB pour créer un contact fournisseur si vous y êtes autorisé et transmettra les factures de l'émetteur de factures à votre MYOB InTray.",
                    "productLabel": "Produit MYOB",
                    "connectButton": "Connectez-vous à MYOB",
                    "disconnectMessage": "Se déconnecter de MYOB",
                    "modalMessage": "Voulez-vous vraiment vous déconnecter de <strong>MYOB</strong>? Tous les abonnements MYOB seront désactivés."
                },

                "reckon":{
                    "product": "Reckon Accounts Hosted",
                    "authorisationIssue": "Impossible de se connecter à Reckon en raison d'une erreur d'autorisation. Veuillez vous reconnecter à Reckon.",
                    "unableToConnect": "Impossible de se connecter à Reckon",
                    "disconnectMessage": "Déconnecter de Reckon",
                    "usageHeading": "Utilisation hébergée des comptes Payreq Reckon",
                    "usageMessage1": "Les seules informations accessibles par Payreq à partir de votre compte Reckon Hosted sont:",
                    "usageMessage2": "Vos codes de compte du grand livre pour vous permettre de sélectionner un code de compte pour votre facture. Seul l'ID du code de compte sélectionné est stocké dans Payreq.",
                    "usageMessage3": "Vos fournisseurs pour vous permettre de sélectionner un fournisseur pour votre facture. Seul l'ID du code de compte sélectionné est stocké dans Payreq.",
                    "usageMessage4": "Vos codes de taxe pour vous permettre de sélectionner un code de taxe de vente pour votre facture. Seul l'ID du code TVA sélectionné est stocké dans Payreq.",
                    "usageMessage5": "Aucune autre information de Reckon n'est accessible par Payreq, les émetteurs de factures enregistrés ou tout autre tiers.",
                    "usageMessage6": "Payreq utilisera votre connexion Reckon pour transférer les factures des émetteurs de factures dans vos comptes fournisseurs Reckon.",
                    "productCountry": "Calculer le pays du produit",
                    "message1": "Pour un fichier d'entreprise qui <strong>n'est pas</strong> partagé avec d'autres utilisateurs Q:\\File name.QBW Exemple: Q:\\API2019.QBW",
                    "message2": "Pour un fichier d'entreprise qui <strong>est</strong> partagé avec d'autres utilisateurs \\\\Shared-Folder-Name\\FileName.QBW ou \\\\\\\\Shared-Folder-Name\\\\FileName.QBW ou \\\\FS-Path\\Full-Shared-Folder-Name\\File name.QBW ou \\\\\\\\FS-Path\\\\Full-Shared-Folder-Name\\\\File name.QBW Exemple: \\\\\\\\api2019\\\\API2019.QBW ou \\\\\\\\RAH-FSS-07-AP2A\\\\067185-1574783-API2019\\\\API2019.QBW.",
                    "message3": "Cliquez <a href=\"https://help.payreq.com/en/support/solutions/articles/11000091756\">ici</a> pour plus d'informations sur la recherche du chemin d'accès au fichier de votre entreprise.",
                    "companyFile": "Reckon Company File",
                    "companyFileUsername": "Nom d'utilisateur du fichier d'entreprise Reckon Accounts Hosted",
                    "companyFilePassword": "Mot de passe du fichier d'entreprise Reckon Accounts Hosted",
                    "modalMessage": "Voulez-vous vraiment vous déconnecter de <strong>Reckon</strong>? Tous les abonnements Reckon seront désactivés.",
                    "updateMessage": "Mettre à jour la connexion Reckon"
                },

                "propertyMe": {
                    "product": "PropertyMe",
                    "reconnect": "Reconnectez-vous à PropertyMe",
                    "needsAttention": "Impossible de se connecter à PropertyMe en raison d'une erreur d'autorisation. Veuillez vous reconnecter à PropertyMe.",
                    "usageHeading": "Utilisation de Payreq PropertyMe",
                    "usageLine1": "Payreq doit accéder à votre portefeuille PropertyMe pour obtenir les détails suivants:",
                    "usageLine2": "Vos contacts fournisseurs PropertyMe pour lier le fournisseur PropertyMe au même fournisseur Payreq. Seuls le nom et l'identifiant du contact fournisseur sont stockés dans Payreq.",
                    "usageLine3": "Vos propriétés PropertyMe pour lier la propriété PropertyMe au même Biller Payreq et au même numéro de compte. Seuls l'adresse et l'identifiant de la propriété sont stockés dans Payreq.",
                    "usageLine4": "Aucune autre information de PropertyMe n'est accessible par Payreq, les émetteurs de factures enregistrés ou tout autre tiers.",
                    "usageLine5": "Payreq utilisera votre connexion PropertyMe pour envoyer les factures de vos factures PropertyMe.",
                    "button": "Connectez-vous à PropertyMe",
                    "buttonDisconnect": "Se déconnecter de PropertyMe",
                    "modalMessage": "Voulez-vous vraiment vous déconnecter de <strong> PropertyMe </strong>? Toutes les règles de transfert PropertyMe seront supprimées."
                }
            },

            "accountingPlan": {
                "accountingPlan": "Plan comptable",
                "totalRemainingHeader": "Crédit total restant pour cette période",
                "totalPayStubRemainingHeader" : "Crédit total pour talon de paie restant pour cette période",
                "totalNonPayStubRemainingHeader" : "Crédit total pour non-talon de paie restant pour cette période",
                "purchaseButton": "Acheter des crédits",
                "name": "Nom",
                "creditRemaining": "Crédit restant",
                "expiresOn": "Expire",
                "selectPlansToPurchase": "Sélectionnez les plans à acheter",
                "checkout": "Checkout",
                "backButton": "Retour",
                "proceedToPay": "Procéder au paiement",
                "purchaseAccountingPlans": "Acheter des plans comptables",
                "unitCost": "Coût unitaire",
                "quantity": "Quantité",
                "total": "Total",
                "subTotal": "sous-total",
                "totalPayable": "Total payable",
                "transationHistoryTitle": "Historique des transactions du plan comptable",
                "transationHistorySubTitle": "Historique de tous les achats de plans comptables effectués",
                "paymentDate": "Date de paiement",
                "tax": "Impôt",
                "invoice": "Facture d'achat",
                "noPaymentsMade": "Aucun paiement n'a été effectué.",
                "billerCredits": "Crédits utilisés par:",

                "accountingPlanGroups": {
                    "pay-stub": "Crédits de bulletin de paie",
                    "non-pay-stub": "Crédits autres que Paystub",
                    "oversize-credit": "Crédits surdimensionnés",
                    "combo": "Forfaits/combos",
                },

                "gatewaySetupHeading": "Configuration de la passerelle de paiement",
                "gatewaySetupAction1": "Cliquez",
                "gatewaySetupAction2": "ici",
                "gatewaySetupAction3": " pour afficher ou modifier la configuration de votre passerelle de paiement pour accepter les paiements de factures",
            },

            "uploadMailTemplateTitle": "Télécharger un nouveau document partagé",
            "uploadMailTemplateNameLabel": "Nom",
            "uploadMailTemplateCancel": "Annuler",
            "uploadMailTemplateConfirm": "Télécharger",
            "uploadBillTemplateButton": "Télécharger un document"
        },

        "bpv": {
            "biller": "Expéditeur",
            "bills": "Courrier",

            "billerSettings": {
                "reviewBillBeforeSending": "Vérifier le courrier avant l’envoi",
                "saveBillWithoutRegistration": "Enregistrer le courrier sans abonnement ACTIFS",
                "contactRequiredForRegistationApproval": "Le contact DOIT exister pour l'inscription",
                "allowAgentRegistrationsFromContacts": "Autoriser les enregistrements d'agent MyBills à partir de contacts",
                "checkCredentials": "Vérifier les informations d'identification dans le système comptable",
                "reviewFailedReg": "Examiner les enregistrements ayant échoué",
                "authenticationFields": "Champs d'authentification de vue BPAY",
                "checkPotentialDeregistration": "Vérifiez d'éventuelles radiations?",
                "cannotUncheckPotentialDeregistration": "Les inscriptions marquées pour une éventuelle désinscription",
                "holdContactChangedBill": "N'envoyez pas de courrier si des abonnements sont signalés pour une désactivation potentielle",
                "noUploadPotentialDeregistration": "Ne pas autoriser le téléchargement d'e-mails lorsque les abonnements sont signalés pour examen",

                "emailAddress": "Adresse courriel du courrier entrant",
                "noEmailAddress": "Aucune adresse e-mail n'a été générée. Vous ne pourrez pas envoyer de factures à Payreq pour cet envoi sans adresse e-mail.",
            },

            "userSettings": {
                "instructions": "Cette page vous permet de modifier les informations et les rôles des utilisateurs existants pour tous les expéditeurs du groupe <strong>%@</strong>. Vous pouvez également inviter un utilisateur nouveau ou existant à gérer cet expéditeur, en cliquant sur le <strong> bouton Plus </strong> sous la liste des utilisateurs.",
                "billerSettings": "Paramètres de l'expéditeur",
                "childBillersInstructions": "Vous pouvez également ajouter des rôles pour les utilisateurs liés à d'autres émetteurs de factures dans le groupe",
                "childBiller": "Autorisations pour l’Expéditeur",

                "notificationPreferenceDescription": {
                    "bill.nondelivery": "Un document n'a pas pu être remis"
                }
            }
        },

        "epost": {
            "biller": "Expéditeur",
            "bills": "Courrier",

            "billerSettings": {
                "reviewBillBeforeSending": "Vérifier le courrier avant l’envoi",
                "saveBillWithoutRegistration": "Enregistrer le courrier sans abonnement ACTIFS",
                "checkCredentials": "Vérifier les informations d'identification dans le système comptable",
                "reviewFailedReg": "Examiner les abonnements ayant échoué",
                "authenticationFields": "Champs de vérification des contacts",
                "checkPotentialDeregistration": "Vérifiez les désactivations potentielles?",
                "contactRequiredForRegistationApproval": "Le contact DOIT exister pour l'inscription",
                "allowAgentRegistrationsFromContacts": "Autoriser les enregistrements d'agent MyBills à partir de contacts",
                "cannotUncheckPotentialDeregistration": "Les inscriptions marquées pour une éventuelle désinscription",
                "holdContactChangedBill": "N'envoyez pas de courrier si des abonnements sont signalés pour une désactivation potentielle",
                "noUploadPotentialDeregistration": "Ne pas autoriser le téléchargement d'e-mails lorsque les abonnements sont signalés pour examen",

                "emailAddress": "Adresse courriel du courrier entrant",
                "noEmailAddress": "Aucune adresse courriel n'a été générée. Vous ne pourrez pas transférer de courrier à Payreq pour cet expéditeur sans adresse courriel.",
            },

            "userSettings": {
                "instructions": "Cette page vous permet de modifier les informations et les rôles des utilisateurs existants pour tous les expéditeurs du groupe <strong>%@</strong>. Vous pouvez également inviter un utilisateur nouveau ou existant à gérer cet expéditeur, en cliquant sur le <strong> bouton Plus </strong> sous la liste des utilisateurs.",
                "billerSettings": "Paramètres de l'expéditeur",
                "childBillersInstructions": "Vous pouvez également ajouter des rôles pour les utilisateurs liés à d'autres expéditeurs dans le groupe",
                "childBiller": "Autorisations pour Mailer",

                "roles": {
                    "1": "Visionneuse d'abonnement",
                    "2": "Approbateur d'abonnement",
                    "3": "Administrateur des paramètres de messagerie",
                    "4": "Visionneuse de messagerie",
                    "5": "Gestionnaire de messagerie",
                    "100": "Gestionnaire de courrier entrant",
                    "12": "Visionneuse de messagerie - Aucun document PDF",
                },

                "notificationPreferenceDescription": {
                    "registration.failed": "Un abonnement a échoué",
                    "bill.nondelivery": "Impossible de livrer un document",
                    "registration.complete": "Un abonnement a réussi",
                    "registration.contactchanged": "Un abonnement est signalé pour une éventuelle désactivation",
                    "deregistration.complete": "Un abonnement a été désactivé",
                    "registration.waiting": "Un abonnement est en attente d'approbation",
                    "bill.contactchanged": "Le courrier n'a pas pu être envoyé car l'abonnement a été signalé pour une désactivation possible"
                }
            }
        },

        "mybills-bills": {
            "biller": "Expéditeur",
            "bills": "Courrier",

            "billerSettings": {
                "reviewBillBeforeSending": "Vérifier le courrier avant l’envoi",
                "saveBillWithoutRegistration": "Enregistrer le courrier sans abonnement ACTIFS",
                "checkCredentials": "Vérifier les informations d'identification dans le système comptable",
                "reviewFailedReg": "Examiner les abonnements ayant échoué",
                "authenticationFields": "Champs de vérification des contacts",
                "checkPotentialDeregistration": "Vérifiez les désactivations potentielles?",
                "contactRequiredForRegistationApproval": "Le contact DOIT exister pour l'inscription",
                "allowAgentRegistrationsFromContacts": "Autoriser les enregistrements d'agent MyBills à partir de contacts",
                "cannotUncheckPotentialDeregistration": "Les inscriptions marquées pour une éventuelle désinscription",
                "holdContactChangedBill": "N'envoyez pas de courrier si des abonnements sont signalés pour une désactivation potentielle",
                "noUploadPotentialDeregistration": "Ne pas autoriser le téléchargement d'e-mails lorsque les abonnements sont signalés pour examen",

                "emailAddress": "Adresse courriel du courrier entrant",
                "noEmailAddress": "Aucune adresse courriel n'a été générée. Vous ne pourrez pas transférer de courrier à Payreq pour cet expéditeur sans adresse courriel.",
            },

            "userSettings": {
                "instructions": "Cette page vous permet de modifier les informations et les rôles des utilisateurs existants pour tous les expéditeurs du groupe <strong>%@</strong>. Vous pouvez également inviter un utilisateur nouveau ou existant à gérer cet expéditeur, en cliquant sur le <strong> bouton Plus </strong> sous la liste des utilisateurs.",
                "billerSettings": "Paramètres de l'expéditeur",
                "childBillersInstructions": "Vous pouvez également ajouter des rôles pour les utilisateurs liés à d'autres expéditeurs dans le groupe",
                "childBiller": "Autorisations pour Mailer",

                "roles": {
                    "1": "Visionneuse d'abonnement",
                    "2": "Approbateur d'abonnement",
                    "3": "Administrateur des paramètres de messagerie",
                    "4": "Visionneuse de messagerie",
                    "5": "Gestionnaire de messagerie",
                    "100": "Gestionnaire de courrier entrant",
                    "12": "Visionneuse de messagerie - Aucun document PDF",
                },

                "notificationPreferenceDescription": {
                    "registration.failed": "Un abonnement a échoué",
                    "bill.nondelivery": "Impossible de livrer un document",
                    "registration.complete": "Un abonnement a réussi",
                    "registration.contactchanged": "Un abonnement est signalé pour une éventuelle désactivation",
                    "deregistration.complete": "Un abonnement a été désactivé",
                    "registration.waiting": "Un abonnement est en attente d'approbation",
                    "bill.contactchanged": "Le courrier n'a pas pu être envoyé car l'abonnement a été signalé pour une désactivation possible"
                }
            }
        },

        "epost-payreqmypay": {
            "userSettings": {
                "notificationPreferenceDescription": {
                    "bill.nondelivery": "MyPay n'a pas pu livrer un document"
                }
            }
        },
    }
);
