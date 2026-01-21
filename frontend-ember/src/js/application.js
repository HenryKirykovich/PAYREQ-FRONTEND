define([
        'i18n!nls/globals',
        'text!templates/application.html',
        'text!templates/refer-business-modal.html',
        'module',
        '/sys/config?callback=define',
        '/sys/csrf?callback=define',
        'text!templates/api-error-modal.html',
        'text!templates/nothing.html',
        'moment',
        'moment/locale/fr',
        'ember',
        'emberdata',
        'emberTemplateCompiler',
        'ext'],
    function (globalStrings, applicationTemplate, referBusinessModal, module, config, initialCsrf, apiErrorModalTemplate, nothing, moment) {
        moment.locale(navigator.language && navigator.language.substring(0, 2) === "fr" ? "fr" : "en");

        if (typeof console === "undefined") {
            //IE9 doesn't like console unless the dev tools are open.
            console = {
                log: function () {
                }
            };
        }

        window.AppProto = Ember.Application.extend({
            sessionLogin: function () {
                var me = this;
                Ember.$.get("/auth/login-session").then(function (resp) {
                    if (resp.success) {
                        App.userContext = resp.context;
                        me.advanceReadiness();
                    } else {
                        refreshCsrfToken().then(function () {
                            me.advanceReadiness();
                        });
                    }

                });
            },

            ready: function () {
                Ember.$("body").removeClass("loading");
            },
        });

        window.App = AppProto.create({
            LOG_TRANSITIONS: true,
        });

        App.userContext = {};
        App.payreqConfig = config;

        var onLogout = function () {
            document.location = "/portal/customer/login"; //take the user back to the root of the application - gives us a clear application state!
        };

        App.Router.map(function () {
            this.route("biller", {path: "/biller/:id"}, function () {
                this.route("billsinit");
                this.route("bills");
                this.route("bills", {path: "/bills/:type"});
                this.route("bill", {path: "/bill/:billId"});
                this.route("registrationsinit")
                this.route("registrations")
                this.route("registrations", {path: "/registrations/:type"});
                this.route("registration", {path: "/registration/:registrationId"});
                this.route("import");
                this.route("incoming", function () {
                    this.route("registrations", {path: "/registrations/:type"});
                    this.route("registration", {path: "/registration/:registrationId"});
                    this.route("mailer");
                    this.route("xeroconnect", {path: "/xeroconnect/:mailerId"});
                    this.route("emailrego", {path: "/emailrego/:mailerId"});
                    this.route("myob", {path: "/myob/:mailerId"});
                    this.route("reckon", {path: "/reckon/:mailerId"});
                    this.route("mybillsagent", {path: "/mybillsagent/:mailerId"});
                    this.route("importfromtext", {path: "/importfromtext/:mailerId"});
                    this.route("mybills", {path: "/mybills/:mailerId"});
                    this.route("channels", {path: "/channels/:mailerId"});
                });
                this.route("contacts");
                this.route("contact", {path: "/contact/:contactId"});
                this.route("reports");
                this.route("report", {path: "/report/:reportId"});
                this.route("reportbillingsummary", {path: "/reportbillingsummary/:reportId"});
                this.route("reportbillingdetail", {path: "/reportbillingdetail/:reportId"});

                this.route("reportsbi", function () {
                    this.route("mail", function () {
                        this.route("overview");
                    });

                    this.route("email", function () {
                        this.route("activity");
                    });
                });
                this.route("settings");
                this.route("settings", function () {
                    this.route("biller", function () {
                        this.route("channel", {path: "/channel/:channelPartnerSystemId"});
                    });
                    this.route("accounting", function () {
                        this.route("catalog", function () {
                            this.route("checkout", function () {
                                this.route("payment");
                            });
                        });
                    });
                    this.route("users", function () {
                        this.route("user", {path: "/user/:userId"});
                        this.route("create");
                        this.route("notification", {path: "/notification/:userId"});
                    });
                    this.route("payments");
                    this.route("billTemplates");
                    this.route("connections");
                    this.route("consents");
                });
                this.route("errors", {path: "/errors/:channel"});
                this.route("invoicesinit");
                this.route("invoices");
                this.route("invoices", {path: "/invoices/:type"});
                this.route("invoice", {path: "/invoice/:invoiceId"});
                this.route("invoiceForward", {path: "/invoiceForward/:invoiceId"});
                this.route("invoiceBiller", {path: "/invoiceBiller/:invoiceBillerId"});
                this.route("incomingEmail", {path: "/incomingEmail"});
            });
        });

        Ember.TEMPLATES['refer-business-dialog'] = Ember.Handlebars.compile(referBusinessModal);
        App.ReferBusinessDialogMixin = Ember.Mixin.create({
            application: Ember.inject.controller(),
            strings: globalStrings.all,
        });

        Ember.TEMPLATES['application'] = Ember.Handlebars.compile(applicationTemplate);
        App.ApplicationController = Ember.Controller.extend(App.ReferBusinessDialogMixin, {
            userContext: {},
            entityContext: null,
            features: [],
            applicationName: module.config().applicationName,
            message: {},
            copyrightYear: new Date().getFullYear(),
            language: localStorage.getItem("language"),
            languageOptions: [
                {id: "en", name: "English"},
                {id: "fr", name: "Français"}
            ],

            login: Ember.inject.controller(),

            strings: Ember.computed("entityContext.channelPartnerSystemId", {
                get: function () {
                    return App.StringsMap.create({
                        baseMap: globalStrings,
                        classifier: this.get("entityContext.channelPartnerSystemId")
                    });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            referralMessage: Ember.computed("entityContext", "strings", {
                get: function () {
                    if (this.get("entityContext.referMasterBiller")) {
                        var masterBiller = this.get("entityContext.masterBiller.extBillerName");
                        return this.get("strings.referralMessage").fmt(masterBiller, this.get("entityContext.referralCode"), masterBiller);
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            changeEntityContext: function (entity) {
                this.set("entityContext", entity);
            },

            clearEntityContext: function () {
                this.set("entityContext", null);
            },

            permissions: Ember.computed('entityContext', {
                get: function () {
                    return this.get('entityContext.permissions');
                }
            }),

            isLoggedIn: Ember.computed('userContext', {
                get: function () {
                    return this.get("userContext").username;
                }
            }),

            showUserMenu: Ember.computed("isLoggedIn", "userContext.apiOnly", {
                get: function () {
                    return !this.get("userContext.apiOnly");
                }
            }),

            profileSettingsLink: Ember.computed("entityContext", {
                get: function () {
                    return "/portal/customer/biller/" + this.get("entityContext.id") + "/personal/settings";
                }
            }),

            isPayreqBiller: Ember.computed("entityContext", {
                get: function () {
                    const systemId = this.get("entityContext.systemId")
                    return systemId && systemId !== 'incoming-invoice';
                }
            }),

            isPayreqPayer: Ember.computed("entityContext", {
                get: function () {
                    return this.get("entityContext.systemId") === 'incoming-invoice';
                }
            }),

            dashboardHref: Ember.computed("entityContext", {
                get: function () {
                    return "/portal/customer/biller/" + this.get("entityContext.id") + "/dashboard";
                }
            }),

            dashboardAdminHref: Ember.computed("entityContext", {
                get: function () {
                    return "/portal/customer/biller/" + this.get("entityContext.id") + "/admin-dashboard";
                }
            }),

            isNotQboAccount: Ember.computed("userContext", {
                get: function () {
                    var userId = this.get("userContext").username;
                    if (userId != null) {
                        if (userId.indexOf("@") < 0) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    return false;
                }
            }),

            hasNoEntityContext: Ember.computed("entityContext", {
                get: function () {
                    return this.get("entityContext") == null;
                }
            }),

            showEntityContextSwitch: Ember.computed("entityContext.allowSwitch", {
                get: function () {
                    return this.get("entityContext.allowSwitch");
                }
            }),

            setUserContext: function (ctx) {
                this.set('userContext', ctx);
                if (ctx.username) this.execDismissMessage();
            },

            usernameHasChanged: function (username) {
                this.set("userContext.username", username);
            },

            init: function () {
                this._super();
                this.set('userContext', App.userContext);
                this.set("features", App.payreqConfig.features.enable);
            },

            isFeatureEnabled: function (feature) {
                return this.get("features").includes(feature);
            },

            canOverrideDate: Ember.computed("features", {
                get: function () {
                    return this.isFeatureEnabled("DATE_OVERRIDE");
                }
            }),

            displayLoadingAlert: function () {
                $("#global-loading-alert").show("fade");
            },

            hideLoadingAlert: function () {
                $("#global-loading-alert").hide("fade");
            },

            showApplicationMessage: function (message, type, opts) {
                var opts = opts || {};
                this.set("message", {text: message, type: type, static: opts.static || false});
                Ember.$("#global-message").show("fade");
                if (opts.autoDismiss) {
                    Ember.run.later(this, function () {
                        this.execDismissMessage();
                    }, 5000);
                }
            },

            execDismissMessage: function () {
                Ember.$("#global-message").hide("fade");
            },

            errorModal: function () {
                this.send("openModal", "api-error-modal", this);
                Ember.run.later(this, function () {
                    Ember.$(".api-error-modal").modal({show: true, backdrop: "static", keyboard: false});
                }, 100);
            },

            actions: {
                logout: function () {
                    $("#nav-logo").removeClass("logo-show").addClass("logo-hide");
                    this.setUserContext({});
                    this.clearEntityContext();

                    return Ember.$.post("/auth/logout").then(function () {
                        window.location.href = "/portal/customer/login"
                    });


                },
                switchBillers: function () {
                    this.clearEntityContext();
                    window.location.href="/portal/customer/profile/accounts";
                },
                goToAccountSettings: function () {
                    this.transitionToRoute('biller.settings.biller');
                },
                goToManageAutopayments: function () {
                    window.location.href="/portal/customer/biller/"+this.get('entityContext.id')+"/auto-payments";
                },
                goToManageCards: function () {
                    window.location.href="/portal/customer/biller/"+this.get('entityContext.id')+"/cards";
                },
                dismissMessage: function () {
                    this.execDismissMessage();
                },

                showReferralMessage: function (referBusinessButtons) {
                    this.set("referBusinessButtons", referBusinessButtons);
                    this.send("openModal", 'refer-business-dialog', this);
                },

                copyCode: function () {
                    document.getElementById('uniqueCode').select();
                    document.execCommand('copy');
                },

                refresh: onLogout,

                onLanguageSelect: function (language) {
                    if (language) {
                        localStorage.setItem("language", language);
                        window.location.reload();                    }
                }
            }
        });

        Ember.TEMPLATES['api-error-modal'] = Ember.Handlebars.compile(apiErrorModalTemplate);

        App.LoadingAlertRouteMixin = Ember.Mixin.create({
            startLoading: function () {
                if (this.controllerFor("application"))
                    this.controllerFor("application").displayLoadingAlert();
            },

            finishedLoading: function () {
                if (this.controllerFor("application"))
                    this.controllerFor("application").hideLoadingAlert();
            }
        });

        App.ApplicationMessageProducingRouteMixin = Ember.Mixin.create({
            showErrorMessage: function (text) {
                this.controllerFor("application").showApplicationMessage(text, "alert-danger");
            },

            showWarningMessage: function (text) {
                this.controllerFor("application").showApplicationMessage(text, "alert-warning", {static: true});
            },

            showSuccessMessage: function (text) {
                this.controllerFor("application").showApplicationMessage(text, "alert-success", {autoDismiss: true});
            }
        });

        App.RouteWithRemoteActionsMixin = Ember.Mixin.create(App.LoadingAlertRouteMixin, App.ApplicationMessageProducingRouteMixin, {
            _onSuccess: function (successFunc, ctx) {
                return function (res) {
                    ctx.finishedLoading();
                    if (successFunc) successFunc.apply(ctx, [res])
                };
            },

            _onFailure: function (onFailure, ctx) {
                return function (res) {
                    ctx.finishedLoading();

                    if (typeof onFailure === "string") {
                        ctx.showErrorMessage(onFailure);
                    } else if (typeof onFailure === "function") {
                        onFailure.apply(ctx, [res]);
                    } else {
                        console.log("Warning: onFailure is neither a string or a function");
                    }

                    if (!res.status) {
                        if (res.errors && res.errors.objectAt(0)) {
                            res.status = parseInt(res.errors.objectAt(0).status);
                        }
                    }

                    if ([401, 403].includes(res.status)) {
                        ctx.send("sessionTimedOut");
                    }
                };
            },

            // doRemoteAction - remoteFunc must return a promise object.
            // onSuccess - function performing actions when remote action succeeds - this = the current route
            // onFailure - function/string - if string, displays the error message, if func: executes
            doRemoteAction: function (remoteFunc, onSuccess, onFailure) {
                this.startLoading();

                remoteFunc.apply(this).then(this._onSuccess(onSuccess, this),
                    this._onFailure(onFailure, this));
            }
        });

        App.ApplicationRoute = Ember.Route.extend(App.RouteWithRemoteActionsMixin, {
            _onSessionTimeout: function (transition) {
                refreshCsrfToken().then($.proxy(function () {
                    this.controller.setUserContext({});
                    if (transition) {
                        transition.retry();
                    } else {
                        window.location.href = "/portal/customer/login";
                    }
                    this.showWarningMessage("Your session has expired. Please login again to continue.");
                }, this));
            },

            onVersionConflict: function () {
                this.showWarningMessage("A newer version of Payreq is available. You can download the latest updates by refreshing the page.");
            },

            actions: {
                loading: function (transition, originalRoute) {
                    this.startLoading();

                    var onFinish = $.proxy(function () {
                        this.finishedLoading();
                    }, this);

                    transition.then(onFinish, onFinish);

                    return true;
                },

                error: function (request, transition) {
                    this.finishedLoading();

                    if (!request.status) {
                        if (request.errors && request.errors.objectAt(0)) {
                            request.status = parseInt(request.errors.objectAt(0).status);
                        }
                    }

                    switch (request.status) {
                        case 401: //unauthorised - probably session timed out...
                        case 403: //forbidden - csrf request header will need refreshing...
                            this._onSessionTimeout(transition);
                            break;
                        case 409:
                        case 500: //errors!
                        case 501:
                        case 502:
                        case 503:
                        case 504:
                            this.controller.errorModal();
                            break;
                        default:
                            console.log("Error!");
                            console.log(request.stack);
                            console.log(transition);
                            this.controller.errorModal();
                            break;
                    }
                },

                willTransition: function () {
                    this.controller.execDismissMessage();
                },

                openModal: function (modalName, controller) {
                    return this.render(modalName, {
                        outlet: "modal",
                        controller: controller,
                        into: "application"
                    });
                },

                closeModal: function () {
                    return this.disconnectOutlet({
                        outlet: 'modal',
                        parentView: 'application'
                    });

                    //  A error occurred on the modal close in ember inspector. Its a bug in ember 2.11.3.
                    //  https://github.com/emberjs/ember-inspector/issues/625
                    //  If the error occurred only view tree can't be viewed from inspector. If needed in development uncomment the below lines and comment lines 411 to 414
                    //  This is not made a permanent solution, since its make some displays bit unordered
//				this.render(nothing, {
//          outlet: 'modal',
//          into: 'application',
//          controller: 'application'
//        });
                },

                sessionTimedOut: function () {
                    console.log("Session has timed out while performing an action. Need to log in again.");
                    this._onSessionTimeout();
                }
            }
        });


        App.BaseRoute = Ember.Route.extend({
            afterModel: function () {
                this.controllerFor('application').clearEntityContext();
            }
        });

        function isIEEdgeBrowser() {
            var ua = window.navigator.userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older
                return true
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11
                return true;
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                return true;
            }

            // other browser
            return false;
        }

        App.ApplicationAdapter = DS.RESTAdapter.extend({
            namespace: 'data',
            handleResponse: function (status, headers, payload, requestData) {
                if (status >= 400 && status < 600) {
                    return new DS.AdapterError([{status: status}]);
                }

                if (headers["x-pr-version"] !== App.prVersionCurrent && !App.prVersionChangeAlertShown) {
                    console.log("new version:", headers["x-pr-version"], "current version:", App.prVersionCurrent);
                    if (!isIEEdgeBrowser()) {
                        this.container.lookup("route:application").onVersionConflict();
                    }
                    App.prVersionChangeAlertShown = true;
                }
                return payload;
            }
        });


        App.deferReadiness();


        App.globalArguments = {};
        var applyGlobalAjaxArguments = function (ev, request, settings) {
            var globalArgs = $.param(App.globalArguments);
            if (globalArgs != "")
                settings.url = settings.url + (settings.url.indexOf("?") >= 0 ? "&" : "?") + globalArgs;
        };

        App.csrf = initialCsrf;

        var refreshCsrfToken = function () {
            return Ember.$.get("/sys/csrf").then(function (resp) {
                App.csrf = resp;
            });
        };

        var applyCsrfHeaders = function (ev, request, settings) {
            if (App.csrf.token) request.setRequestHeader("X-CSRF-Token", App.csrf.token);
        };

        var applyPrVersionHeaders = function (ev, request, settings) {
            request.setRequestHeader(config.version.headerName, config.version.current);
        };

        App.prVersionHeaderName = config.version.headerName;
        App.prVersionCurrent = config.version.current;


        var applyCacheBuster = function (opts) {
            opts.cache = false;
        };

        $(document).ajaxSend(applyGlobalAjaxArguments);
        $(document).ajaxSend(applyCsrfHeaders);
        $(document).ajaxSend(applyPrVersionHeaders);
        $.ajaxPrefilter(applyCacheBuster);
    });
