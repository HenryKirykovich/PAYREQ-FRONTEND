define(['i18n!nls/globals',
        'application', 'menu', 'emberdata', 'login', 'strings', 'form-helper'],
    function (globalStrings) {

        App.BillerRoute = Ember.Route.extend(App.AuthedRouteMixin, App.WithContextMenuRouteMixin, {
            model: function (params) {
                return this.get("store").findRecord("biller", params.id, {reload: true});
            },

            afterModel: function (model, transition) {
                var totalBillers = 1;
                if (model && model.get("meta")) {
                    totalBillers = model.get("meta").total;
                }
                this.thisIsTheContext(model, "biller", totalBillers > 1);

                var currentPath = this.controllerFor('application').get("currentPath");

                if (currentPath === "payerlogin") {
                    var mailer = this.controllerFor("application").get("mailer");
                    if (mailer) {
                        this.transitionTo("biller.incoming.xeroconnect", this.controllerFor("application").get("mailerid"));
                    } else {
                        window.location.href = "/portal/customer/biller/"+ biller.id + "/registrations/billers"
                    }
                    return;
                }
                if (["billers", "login", "verify-device", "mfa", "setup.mfa"].indexOf(currentPath) > -1) {
                    var biller = model;
                    //at the moment assumes only payer or biller
                    if (biller.data.systemId !== "incoming-invoice") {
                        localStorage.setItem("goTo", "")
                        window.location.href = "/portal/customer/biller/" + biller.id + "/admin-dashboard";

                        return;
                    } else {
                        if (localStorage.getItem("goTo") === "dashboard") {
                            localStorage.setItem("goTo", "")
                        }
                        window.location.href = "/portal/customer/biller/" + biller.id + "/dashboard";
                    }
                    return;
                }

                if (model && model.data.systemId === "incoming-invoice" && totalBillers === 1 && localStorage.getItem("goTo") === "dashboard") {
                    var biller = model;
                    localStorage.setItem("goTo", "")
                    window.location.href = "/portal/customer/biller/" + biller.id + "/dashboard";
                    return;
                }

            }
        });

        var attr = DS.attr;

        App.Biller = DS.Model.extend({
            customerName: attr(),
            tagName: attr(),
            tag: attr(),
            customerId: attr("string"),
            availableActions: attr("contextMenuItems"),
            permissions: attr(),
            features: attr(),
            extBillerId: attr(),
            mailhouseId: attr(),
            mailhouseName: attr(),
            channelPartnerSystemId: attr(),
            isSub: attr(),
            masterBiller: attr(),
            countryId: attr(),
            stateId: attr(),
            referralCode: attr(),
            referMasterBiller: attr("boolean"),
            displayFields: attr(),
            meta: attr(),
            systemId: attr(),
            businessIdentifier: attr(),
            mfaRequired: attr(),
            archivePermission: attr(),
            product: attr(),
            samlSsoEnabled: attr(),

            hasFeature: function (feature) {
                return this.get("features").includes(feature);
            },

            nameDisplay: Ember.computed("tagName", {
                get: function () {
                    var displayName = this.get("tagName") || "";
                    if (displayName.length > 38) {
                        displayName = displayName.substr(0, 35) + "...";
                    }
                    return displayName
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            payreqApp: Ember.computed("systemId", {
                get: function () {
                    var payreqApp = this.get("systemId") || "";
                    if (payreqApp === "incoming-invoice") {
                        payreqApp = "Payreq Inbox";
                    } else {
                        payreqApp = "Payreq Delivery";
                    }
                    return payreqApp
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            mailhouseTitle: Ember.computed("mailhouseName", {
                get: function () {
                    return "Mailer managed by mailhouse '%@'".fmt(this.get("mailhouseName"));
                    //return `Biller managed by mailhouse ${this.get("mailhouseName")}`;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            strings: Ember.computed("channelPartnerSystemId", {
                get: function () {
                    return App.StringsMap.create({
                        baseMap: globalStrings,
                        classifier: this.get("channelPartnerSystemId")
                    });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            menu: Ember.computed("availableActions.[]", {
                get: function () {
                    var biller = this;
                    return $.each(this.get("availableActions"),
                        function (idx, action) {
                            action.name = biller.get("strings.capitalised." + action.label);
                            action.subMenus = $.map(action.subMenus || [],
                                function (subMenu) {
                                    return Object.create($.extend(true, {}, subMenu,
                                        {name: biller.get("strings.capitalised." + subMenu.label)}));
                                })
                        });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
        });

        App.Country = DS.Model.extend({
            name: attr(),
            currencyCode: attr(),
            currencySymbol: attr(),
        });

        App.CountryDetailsMixin = Ember.Mixin.create({
            country: Ember.computed("biller", {
                get: function () {
                    if (this.get("biller").get("countryId")) {
                        return this.store.peekRecord("country", this.get("biller").get("countryId"));
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            currencyCode: Ember.computed("country", {
                get: function () {
                    if (this.get("country")) {
                        return this.get("country").get("currencyCode").toUpperCase();
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            currencySymbol: Ember.computed("country", {
                get: function (key, value) {
                    return this.get("country").get("currencySymbol");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            stateId: Ember.computed("biller", {
                get: function () {
                    return this.get("biller").get("stateId");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
        });

        App.BaseBillerRoute = Ember.Route.extend(App.WithContextMenuRouteMixin, App.AuthedRouteMixin, {});

        App.FeatureFilterMixin = Ember.Mixin.create({
            filteredByFeature: function (items, biller) {
                if (!biller) return [];
                return items.filter(function (f) {
                    return f.get("requiresFeature") ? biller.hasFeature(f.get("requiresFeature")) : true;
                });
            }
        });

    });
