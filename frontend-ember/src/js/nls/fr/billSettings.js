define({
    "root": {
        "all": {
            "editSettings": "Éditer",
            "viewSettings": "Vue",
            "verifySettings": "Vérifier les nouveaux paramètres",
            "cancel": "Annuler",
            "retest": "Retester",
            "confirm": "Confirmer les modifications",

            "yes": "Oui",
            "no": "Non",

            "noValueFound": "Aucune valeur trouvée",

            "billFieldRule": {
                "canBeFoundIn": "peut être trouvé dans le",

                "systemInstruction1": "Payreq trouvera le",
                "systemInstruction2": "dans le lié",

                "textOrLabel": "texte ou étiquette",

                "lookIn": {
                    "email-subject": "Sujet du courriel",
                    "email-body": "texte de le courriel",
                    "email-attachment": "pièce jointe à un courriel (pdf)",
                },
                "position": {
                    "after": "après",
                    "below": "au dessous de",
                    "above": "au dessus",
                    "before": "avant"
                }
            }
        },

        "epost": {
            "billSettings": "Paramètres de messagerie",
            "viewBillSettings": "Afficher les paramètres de messagerie",
            "viewBillSettingsSub": "Comment le courrier entrant sera traité",
            "viewBillSettingsInstructions": "Ce qui suit décrit comment le courrier et les valeurs contenues dans le courrier seront extraits lors de leur réception par Payreq.",

            "editBillSettings": "Modifier les paramètres de messagerie",
            "verifyBillSettings": "Vérifier les nouveaux paramètres de messagerie",

            "testBillReceived": "<p> Comme nous avons déjà reçu un message électronique de test, il n’est pas nécessaire d’en envoyer un autre, sauf en cas de problème avec le message électronique lui-même. </p> <p> Modifiez les paramètres ci-dessous et cliquez sur le bouton <strong>Bouton Vérifier les nouveaux paramètres</strong>.</p>",
            "testBillInstructions1": "Avant de pouvoir enregistrer les paramètres, ils doivent être testés en envoyant un message électronique de test à l'adresse électronique temporaire suivante:",
            "testBillInstructions2": "Le message électronique de test peut être envoyé maintenant ou après avoir appuyé sur le bouton <strong>Vérifier les nouveaux paramètres</strong>.",
            "testBillInstructions3": "Le message électronique de test doit être au format d'un message électronique standard qui serait envoyé quotidiennement par cet expéditeur. Il peut contenir des données pour n'importe quel compte <em> (un compte fictif est préféré) </em>, et sera supprimé après le test. Le message de test <strong>ne sera</strong> pas transmis à EPost ou à tout autre canal d'expédition une fois le test terminé.",
            "testBillInstructions4": "Chaque champ décrit ci-dessous <strong>doit</strong> figurer dans le message électronique de test, sinon la vérification ne pourra pas continuer.",

            "testBillNotReceivedTimeout1": "<strong>Aucun e-mail de test reçu.</strong>",
            "testBillNotReceivedTimeout2": "Essayez de renvoyer le message de test et une fois que vous avez confirmé qu'il est en route, appuyez sur le bouton <strong>Retester</strong> ci-dessous.",

            "testBillReceived": "Payreq applique les modifications aux paramètres de messagerie et les vérifie par rapport au message de test.",
            "testBillWaiting1": "Pour tester vos paramètres de messagerie, envoyez un message électronique de test à l'adresse suivante:",
            "testBillWaiting2": "Lorsque le message de test a été reçu par Payreq (ce qui peut prendre jusqu'à une minute après l'envoi), les données du message que nous avons réussi à trouver seront affichées ci-dessous.",
            "testBillStillWaitingWarning": "<p><strong>Payreq n'a toujours pas reçu votre message de test.</strong></p><p> Veuillez vérifier que vous avez envoyé le message de test à la bonne adresse e-mail (ci-dessus).</p><p>Si vous avez déjà envoyé l'e-mail, cela peut être dû au fait que le nombre de messages en cours de traitement est important.</p>",

            "testBillReceivedLoading": "Application des modifications au test du message électronique ...",
            "testBillWaitingLoading": "En attente de recevoir le courrier de test ...",

            "testBillError": "<p><strong>Une erreur s'est produite </strong></p><p>Une erreur s'est produite lors du traitement du message électronique de test. Vos paramètres modifiés ont été enregistrés, mais ne peuvent pas être appliqués pour le moment. Veuillez réessayer plus tard. </p>",

            "testBillMissing1": "Message de test reçu, mais il manque des champs.",
            "testBillMissing2": "Payreq a reçu votre message de test, mais il semble qu'il manque des champs.",
            "testBillMissing3": "Cela est généralement dû à une étiquette mal typée ou à la non-sélection de l'emplacement correct pour trouver une valeur de champ.",
            "testBillMissing4": "<small>Remarque: il n'est pas nécessaire de renvoyer le message de test si vous modifiez les paramètres de messagerie</small>",
            "testBillMissing5Prefix": "Alternativement, cela peut être dû au fait que les champs ne figurent pas du tout dans le message électronique que Payreq a reçu. Veuillez vérifier le message envoyé à Payreq, le renvoyer si nécessaire (à",
            "testBillMissing5Suffix": ") et cliquez sur le bouton Retester ci-dessous pour réessayer.",
            "testBillMissingChangeSettings": "Modifier les paramètres de messagerie",

            "testBillSuccess": "",
            "testBillSuccessInstructions1": "<strong>Succès!</strong> Payreq a reçu votre message de test.",
            "testBillSuccessInstructions2Prefix": "Vérifiez attentivement les valeurs ci-dessous et si elles correspondent aux valeurs envoyées dans le message de test, cliquez sur le",
            "testBillSuccessInstructions2Suffix": "à côté de chacun avant de cliquer sur le bouton Confirmer.",
            "testBillSuccessInstructions3": "<strong>Si l'une des valeurs ne correspond pas à ce qui a été envoyé dans le message de test</strong>, les paramètres peuvent contenir une étiquette mal saisie ou l'emplacement sélectionné de la valeur du champ peut être incorrect. Cliquez sur le bouton Modifier les paramètres de messagerie ci-dessous pour résoudre ce problème.",
            "testBillSuccessInstructions4": "Remarque: il n'est pas nécessaire de renvoyer la facture test si vous modifiez les paramètres de messagerie",

            "billFieldRule": {
                "willNotBeInBill": "ne sera pas extrait",
                "notDefined": "n'est pas défini pour ce courrier",
                "notDefinedAbbr": "Ce champ est obligatoire, et en ne définissant pas comment le trouver, le courrier envoyé à Payreq ne sera pas traité correctement.",

                "absentInstruction1": "Payreq n'extrait pas le",
                "absentInstruction2": "de tout courrier envoyé par ce mailer",
            },

            "billField": {
                "fieldName": {
                    "account-balance": "Solde du compte",
                    "prev-account-balance": "Solde du compte précédent",
                    "min-amount-due": "Montant minimum dû",
                    "end-time": "Date d'expiration",
                    "due-date": "Date d'échéance",
                    "created-time": "Date de création",
                    "amount-due": "Montant dû",
                    "biller-customer-number": "Numéro de compte",
                    "biller-invoice-number": "Identifiant de messagerie"
                }
            },

        },
    }
});
