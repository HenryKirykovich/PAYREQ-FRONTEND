define(['i18n!nls/reports',
  'text!templates/reports.html',
	'text!templates/report.html',
    'text!templates/reportbillingsummary.html',
    'text!templates/reportbillingdetail.html',
    'text!templates/reportsbi-mail-overview.html',
    'text!templates/reportsbi-email-activity.html',
	'moment', 'momenttimezone', 'application', 'billers', 'tabular-data-helper'],
	function(translations, reportsTemplate, reportTemplate, reportBillingSummaryTemplate, reportBillingDetailTemplate, reportsbiMailOverviewTemplate, reportsbiEmailActivityTemplate, moment){

		var attr = DS.attr;
		var jobsPageSize = App.payreqConfig.jobs.pageSize;

    App.ReportsStringsMixin = Ember.Mixin.create({
      strings: Ember.computed("biller.channelPartnerSystemId", "biller.extBillerId", "biller.masterBiller", {
        get: function () {
          var extBillerId = null;
          if(this.get("biller.masterBiller")){
            extBillerId = this.get("biller.masterBiller").extBillerId;
          }else{
            extBillerId = this.get("biller.extBillerId");
          }
          return App.StringsMap.create({
            baseMap: translations,
            classifier: this.get("biller.channelPartnerSystemId"),
            classifier2: this.get("biller.channelPartnerSystemId")+"-"+extBillerId
          });
        },
        set: function (key, newValue) {
          return newValue;
        }
      })
    });

		App.BillerReportsRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin,{
			typeFilters: [],
			actions: {
				doReport: function(reportType, billerOption, timeOption) {
					this.doRemoteAction(function() {
						return Ember.$.ajax("/data/reports/%@/prepare".fmt(this.modelFor("biller").id),
							{method: "POST",
							 data: {"reportType": reportType, "billerOption": billerOption, "timeOption": timeOption,
                      "tz": moment.tz.guess()}});
					},
					function(results) {
						console.log(results.reportKey);
						if (reportType === "billingReportSummary") {
                            this.transitionTo("biller.reportbillingsummary", results.reportKey);
                        } else if (reportType === "billingReportDetail") {
                            this.transitionTo("biller.reportbillingdetail", results.reportKey);
                        } else {
                            this.transitionTo("biller.report", results.reportKey);
						}
					},
					"An error occurred while creating the report. Please try again later.");
				}
			}
		});

		Ember.TEMPLATES['biller/reports'] = Ember.Handlebars.compile(reportsTemplate);
		App.BillerReportsController = Ember.Controller.extend(App.ReportsStringsMixin, {
			reportBillerOptions: [{id: "me", name: translations.all.billers.thisMailer}, {id: "all", name: translations.all.billers.allMailers}],
			reportBillerOption: "me",
            reportBillerOption2: "me",
            reportBillerOption3: "me",
			reportTimeOptions: [
				{id: "current", name: translations.all.period.current},
				{id: "previous", name: translations.all.period.previous},
				{id: "last3", name: translations.all.period.last3},
				{id: "last6", name: translations.all.period.last6},
				{id: "all", name: translations.all.period.all},
			],
			reportTimeOption: "current",
            reportTimeOption2: "current",
            reportTimeOption3: "current",

			actions: {
				monthlySummary: function() {
					this.send("doReport", "monthlySummary", this.get('reportBillerOption'), this.get('reportTimeOption'));
				},
            	billingReportSummary: function() {
					this.send("doReport", "billingReportSummary", this.get('reportBillerOption2'), this.get('reportTimeOption2'));
				},
                billingReportDetail: function() {
                    this.send("doReport", "billingReportDetail", this.get('reportBillerOption3'), this.get('reportTimeOption3'));
                }

			}
		});

		App.BillerReportRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
			model: function(params) {
				this.set('reportId', params.reportId);
				return this._getReport(params.reportId);
			},

			setupController: function (controller, model) {
        this._super(controller, model);
        controller.set("biller", this.modelFor("biller"));
      },

			_getReport: function(id) {
				return Ember.$.get("/data/reports/%@/get/%@".fmt(this.modelFor("biller").id, id));
			},

			actions: {
				download: function() {
					window.open("/download/reports/download/%@/%@".fmt(this.get('reportId'), "monthlySummary"));
				}
			}
		});

		Ember.TEMPLATES['biller/report'] = Ember.Handlebars.compile(reportTemplate);
    App.BillerReportController = Ember.Controller.extend(App.ReportsStringsMixin, {

    });

        App.BillerReportbillingsummaryRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
            model: function(params) {
                this.set('reportId', params.reportId);
                return this._getReport(params.reportId);
            },

            setupController: function (controller, model) {
                this._super(controller, model);
                controller.set("biller", this.modelFor("biller"));
            },

            _getReport: function(id) {
                return Ember.$.get("/data/reports/%@/get/%@".fmt(this.modelFor("biller").id, id));
            },

            actions: {
                download: function() {
                    window.open("/download/reports/download/%@/%@".fmt(this.get('reportId'), "billingReportSummary"));
                }
            }
        });

        Ember.TEMPLATES['biller/reportbillingsummary'] = Ember.Handlebars.compile(reportBillingSummaryTemplate);
        App.BillerReportbillingsummaryController = Ember.Controller.extend(App.ReportsStringsMixin, {

        });


        App.BillerReportbillingdetailRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
            model: function(params) {
                this.set('reportId', params.reportId);
                return this._getReport(params.reportId);
            },

            setupController: function (controller, model) {
                this._super(controller, model);
                controller.set("biller", this.modelFor("biller"));
            },

            _getReport: function(id) {
                return Ember.$.get("/data/reports/%@/get/%@".fmt(this.modelFor("biller").id, id));
            },

            actions: {
                download: function() {
                    window.open("/download/reports/download/%@/%@".fmt(this.get('reportId'), "billingReportDetail"));
                }
            }
        });

        Ember.TEMPLATES['biller/reportbillingdetail'] = Ember.Handlebars.compile(reportBillingDetailTemplate);
        App.BillerReportbillingdetailController = Ember.Controller.extend(App.ReportsStringsMixin, {

        });

	App.BillerReportsbiMailOverviewRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
		model: function(params) {
			return this._getReport("dispatch-type");
		},

		setupController: function (controller, model) {
			this._super(controller, model);
			controller.set("biller", this.modelFor("biller"));
            controller.set("model", model);
			controller.set("groupingField1", "dispatch-type");
            controller.set("groupingField2", "none");
            controller.set("collapse", true);
            controller.set("collapse2", true);
		},

		_getReport: function(groupingField1) {
			return Ember.$.post("/data/reports/%@/overview/mail".fmt(this.modelFor("biller").id),
                {groupingField1 : groupingField1});
		},

		refreshReport: function(groupingField1, groupingField2, selectedFilters){
            this.doRemoteAction(function() {
                    return Ember.$.post("/data/reports/%@/overview/mail".fmt(this.modelFor("biller").id),
                        {groupingField1 : groupingField1,
						groupingField2: groupingField2,
						searchTerm: selectedFilters.searchTerm,
                        fromDate: selectedFilters.fromDate,
						toDate: selectedFilters.toDate});
                },
                function(results) {
                    this.controller.set("model", results);
                },
                "Could not refresh Mail Overview. Please try again later.");
		},

		actions:{
			refresh:function(selectedFilters){
                var groupingField2 = this.controller.get("groupingField2");
                if(groupingField2 === 'none'){
                    groupingField2 = null;
                }
                this.refreshReport(this.controller.get("groupingField1"), groupingField2, selectedFilters);
			},
            showAndHide: function(){
                var collapseElement = $("#collapse1");
                if(collapseElement.hasClass("in")){
                    this.controller.set("collapse", false);
                } else {
                    this.controller.set("collapse", true);
                }
            },
            showAndHideGraph: function(){
                var collapseElement = $("#collapse2");
                if(collapseElement.hasClass("in")){
                    this.controller.set("collapse2", false);
                } else {
                    this.controller.set("collapse2", true);
                }
            },
		}


	});

    Ember.TEMPLATES['biller/reportsbi/mail/overview'] = Ember.Handlebars.compile(reportsbiMailOverviewTemplate);
    App.BillerReportsbiMailOverviewController = Ember.Controller.extend(App.FormHelperController,
        																App.TabularDataController,
																		App.ReportsStringsMixin, {
        fields: Ember.computed({
			get: function(){
				return {
					"dispatch-type": "Channel",
					"id": "Job ID",
					"quantity": "Quantity",
					"campaign-name": "Campaign Name",
					"campaign-internal-reference-number": "Campaign Internal Ref No",
					"campaign-document-type": "Campaign Document Type"};
			}
		}),

		dataColumns: Ember.computed({
			get: function(){
				return {"dispatch-type" : "channel", "id": "jobId", "quantity": "quantity", "campaign-name": "campaignName", "campaign-internal-reference-number": "campaignInternalReferenceNumber", "campaign-document-type": "campaignDocumentType"};
			}
		}),

    	drilldownOne: Ember.computed({
            get: function() {
                return [
					{id: "dispatch-type", name: translations.all.groupings.dispatchType},
					{id: "campaign-name", name: translations.all.groupings.campaignName},
					{id: "campaign-internal-reference-number", name: translations.all.groupings.campaignInternalReferenceNumber},
					{id: "campaign-document-type", name: translations.all.groupings.campaignDocType},
					{id: "id", name: translations.all.groupings.id}
				];
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),

		chartData: Ember.computed("model", {
			get: function() {
				return {
					values: this.model.chartData.values.map(function(v) {return {stack: v.stack, text: translations.all.chart.valueLabels[v.text] || v.text, values: v.values}}),
					xLabels: this.model.chartData.xLabels.map(function(l) { return translations.all.chart.xLabels[l] || l})
				};
			}
		}),

		internationalizeTableRows: function (row) {
        	return {
				billerActorId: row.billerActorId,
				campaignDocumentType: row.campaignDocumentType === "No_Value" ? translations.all.noValue :  row.campaignDocumentType,
				campaignInternalReferenceNumber: row.campaignInternalReferenceNumber  === "No_Value" ? translations.all.noValue :  row.campaignInternalReferenceNumber,
				campaignName: row.campaignName === "No_Value" ? translations.all.noValue : row.campaignName,
				dispatchType: translations.all.chart.xLabels[row.dispatchType] || row.dispatchType,
				id: row.id,
				quantity: row.quantity
			}
		},

		tableData: Ember.computed("model", {
			get: function() {
				var transformDetailsFn = this.internationalizeTableRows;
				return this.model.data.map(
					function (d) {
						return {
							billerActorId: d.billerActorId,
							channel: translations.all.chart.xLabels[d.channel] || d.channel,
							campaignName: translations.all.chart.xLabels[d.campaignName] || d.campaignName,
							campaignInternalReferenceNumber: translations.all.chart.xLabels[d.campaignInternalReferenceNumber] || d.campaignInternalReferenceNumber,
							campaignDocumentType: translations.all.chart.xLabels[d.campaignDocumentType] || d.campaignDocumentType,
							jobId: translations.all.chart.xLabels[d.jobId] || d.jobId,
							quantity: d.quantity,
							details: d.details.map(transformDetailsFn)
						}
					});
			}
		}),

		drilldownTwo: Ember.computed("groupingField1", {
			get: function() {
				var groupbyColumns = [
					{id: "none", name: translations.all.groupings.none},
					{id: "dispatch-type", name: translations.all.groupings.dispatchType},
					{id: "campaign-name", name: translations.all.groupings.campaignName},
					{id: "campaign-internal-reference-number", name: translations.all.groupings.campaignInternalReferenceNumber},
					{id: "campaign-document-type", name: translations.all.groupings.campaignDocType},
					{id: "id", name: translations.all.groupings.id}
				];
				var indexOfGrouping1 = -1;
				for(i =0; i < groupbyColumns.length; i++){
					if(groupbyColumns[i].id === this.get("groupingField1")){
						indexOfGrouping1 = i;
					}
				}
				groupbyColumns.splice(indexOfGrouping1, 1);
				return groupbyColumns;
			},
			set: function(key, newValue) {
				return newValue;
			}

		}),

		hasGroupingFieldTwo: Ember.computed("groupingField2", {
			get: function() {
				var groupingField2 = this.get("groupingField2");
				if(groupingField2 === 'none'){
					groupingField2 = null;
				}
				return groupingField2;
            },
            set: function(key, newValue) {
                return newValue;
            }
		}),

		showSearch: Ember.computed("model", {
			get: function () {
				var search = this.get("collapse");
				if (typeof search == 'undefined') {
					return false;
				}
				return search;
			},
			set: function (key, newValue) {
				return newValue;
			}
		}),

		showSearchGraph: Ember.computed("model", {
			get: function () {
				var search = this.get("collapse2");
				if (typeof search == 'undefined') {
					return false;
				}
				return search;
			},
			set: function (key, newValue) {
				return newValue;
			}
		}),

		actions:{
            reloadData: function(selectedFilters) {
				this.send("refresh", selectedFilters);
            },

            changedSelection: function(_pre_selection, _selection){
                this.send("refresh", this.get("selectedFilters"));
            }
		}
    });

	App.BillerReportsbiEmailActivityRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
		model: function(params) {
			return this._getReport();
		},

		setupController: function (controller, model) {
			this._super(controller, model);
			controller.set("biller", this.modelFor("biller"));
			controller.set("model", model);
			controller.set("collapse", true);
			controller.set("collapse2", true);
		},

		_getReport: function() {
			return Ember.$.post("/data/reports/%@/overview/email".fmt(this.modelFor("biller").id),
				{});
		},

		refreshReport: function(selectedFilters){
			this.doRemoteAction(function() {
					return Ember.$.post("/data/reports/%@/overview/email".fmt(this.modelFor("biller").id),
						{searchTerm: selectedFilters.searchTerm,
						fromDate: selectedFilters.fromDate,
						toDate: selectedFilters.toDate});
				},
				function(results) {
					this.controller.set("model", results);
				},
				"Could not refresh Email Activity Report. Please try again later.");
		},

		actions:{
			refresh:function(selectedFilters){
				this.refreshReport(selectedFilters);
			},
			showAndHide: function(){
				var collapseElement = $("#collapse1");
				if(collapseElement.hasClass("in")){
					this.controller.set("collapse", false);
				} else {
					this.controller.set("collapse", true);
				}
			},
			showAndHideGraph: function(){
				var collapseElement = $("#collapse2");
				if(collapseElement.hasClass("in")){
					this.controller.set("collapse2", false);
				} else {
					this.controller.set("collapse2", true);
				}
			},
		}


	});

    Ember.TEMPLATES['biller/reportsbi/email/activity'] = Ember.Handlebars.compile(reportsbiEmailActivityTemplate);
	App.BillerReportsbiEmailActivityController = Ember.Controller.extend(App.FormHelperController,
		App.TabularDataController,
		App.ReportsStringsMixin, {

			strings: translations.all,

		    graphTwoID: Ember.computed({
				get: function(){
					return "emailopened";
				}
			}),

			showSearch: Ember.computed("model", {
				get: function () {
					var search = this.get("collapse");
					if (typeof search == 'undefined') {
						return false;
					}
					return search;
				},
				set: function (key, newValue) {
					return newValue;
				}
			}),

			showSearchGraph: Ember.computed("model", {
				get: function () {
					var search = this.get("collapse2");
					if (typeof search == 'undefined') {
						return false;
					}
					return search;
				},
				set: function (key, newValue) {
					return newValue;
				}
			}),

			chartDataOne: Ember.computed("model", {
				get: function() {
					return {
						values: this.model.chartData.values.map(function(v) {return {text: translations.all.emailReport.chart1.valueLabels[v.text] || v.text, values: v.values}}),
						xLabels: this.model.chartData.xLabels.map(function(l) { return translations.all.emailReport.chart1.xLabels[l] || l})
					};
				}
			}),

			chartDataTwo: Ember.computed("model", {
				get: function() {
					return {
						values: this.model.chartDataTwo.values.map(function(v) {return {text: translations.all.emailReport.chart2.valueLabels[v.text] || v.text, values: v.values}}),
						xLabels: this.model.chartDataTwo.xLabels.map(function(l) { return translations.all.emailReport.chart2.xLabels[l] || l})
					};
				}
			}),

			actions:{
				reloadData: function(selectedFilters) {
					this.send("refresh", selectedFilters);
				}
			}
		});
	});
