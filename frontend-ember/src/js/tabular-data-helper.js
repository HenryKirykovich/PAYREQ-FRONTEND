define(['i18n!nls/globals',
        'i18n!nls/reports',
    'text!templates/components/common-filter-bar.html',
    'text!templates/components/common-search-bar.html',
    'text!templates/components/common-from-to-date-picker.html',
    'text!templates/components/common-date-picker.html',
    'text!templates/components/table-page-links.html',
    'text!templates/components/view-date.html',
    'text!templates/components/filter-type-strip.html',
    'text!templates/components/table-thead.html',
    'text!templates/components/table-column-data.html',
    'text!templates/components/multi-select.html',
    'text!templates/components/searchable-select.html',
    'text!templates/components/data-table-sent-mail.html',
    'text!templates/components/zing-chart.html',
    'moment', 'application', 'emberdata', 'jqueryUI', 'datatables', 'zingChart'
  ],
  function(globalStrings,
    reportsStrings,
    commonFilterBarTemplate,
    commonSearchBarTemplate,
    commonFromToDatePickerTemplate,
    commonDatePickerTemplate,
    tablePageLinksTemplate,
    viewDateTemplate,
    filterTypeStripTemplate,
    tableTHeadTemplate,
    tableColumnDataTemplate,
    multiSelect,
    searchableSelect,
    dataTableSentMailTemplate,
    zingChartTemplate,
    moment) {

    Ember.TEMPLATES['components/filter-type-strip'] = Ember.Handlebars.compile(filterTypeStripTemplate);

    var isColumnVisible = function(activeType, biller, column) {
      var notVisible = column.get("visible")==false;
      var hiddenForType = (column.get("hiddenForTypes") || []).includes(activeType.type);
      var billerHasFeature = (column.get("requiresFeature") && biller) ? biller.hasFeature(column.get("requiresFeature")) : true;
      return !hiddenForType && billerHasFeature && !notVisible;
    };

    Ember.TEMPLATES['components/table-thead'] = Ember.Handlebars.compile(tableTHeadTemplate);
    App.TableTheadComponent = Ember.Component.extend({
      tagName: '',
      visibleColumns: Ember.computed("typeFilters.@each.active", "columns", "biller", {
        get: function() {
          var activeType = this.get("typeFilters").findBy("active", true) || {};
          var biller = this.get("biller");
          return (this.get("columns") || []).filter(isColumnVisible.bind(this, activeType, biller));
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      actions: {
        sort: function(column) {
          this.sendAction("action", column);
        }
      }
    });


    Ember.TEMPLATES['components/common-filter-bar'] = Ember.Handlebars.compile(commonFilterBarTemplate);
    App.CommonFilterBarComponent = Ember.Component.extend({
      showDownload: true,
      showDates:  true,
      downloadDropDown: null,
      globalStrings: globalStrings,

      init: function() {
        this._super.apply(this, arguments);
        // need to do the following to ensure the search bar fields reflect the search terms for the host table screen
        this.setProperties({fromDate: this.get("searchFilters.displayFromDate"),
                            toDate: this.get("searchFilters.displayToDate"),
                            searchTerm: this.get("searchFilters.searchTerm")});
      },

      didInsertElement: function() {
        var comp = this;
        this.$().find(".search-date").datepicker({
          dateFormat: "dd M yy",
          onSelect: function(selectedDate) {
            comp.selectDate(selectedDate, this, comp);
          }
        });
      },

      selectDate: function(selectedDate, dateField, component) {
        component.set(dateField.id, selectedDate);
        $.proxy(component.input, component)();
      },

      _defaultFromDate: Ember.computed("defaultDateRange", function() {
          return (this.get("defaultDateRange") && this.get("defaultDateRange").length > 0) ? this.get("defaultDateRange")[0] : null;
      }),

      _defaultToDate: Ember.computed("defaultDateRange", function () {
          return (this.get("defaultDateRange") && this.get("defaultDateRange").length > 0) ? this.get("defaultDateRange")[1] : null;
      }),

      fromDatePlaceholder: Ember.computed("fromDate", "toDate", {
        get: function() {
          var fromDate = this.get("fromDate");
          var toDate = this.get("toDate");
          var defaultFromDate = this.get("_defaultFromDate");

          if (toDate && !fromDate) {
            return "Earliest";
          } else if (defaultFromDate) {
            return moment(defaultFromDate).format("DD MMM YYYY");
          } else {
            return "From date";
          }
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),


      toDatePlaceholder: Ember.computed("fromDate", "toDate", {
        get: function() {
          var toDate = this.get("toDate");
          var fromDate = this.get("fromDate");
          var defaultToDate = this.get("_defaultToDate");

          if (!toDate && fromDate) {
            return fromDate;
          } else if (defaultToDate) {
            return moment(defaultToDate).format("DD MMM YYYY");
          } else {
            return "To date";
          }
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),


      // debounce input, and perform the search when the user stops typing or selecting dates
      _actionTimeout: null,
      input: function() {
        var existingTimeout = this.get("_actionTimeout");
        if (existingTimeout) {
          window.clearTimeout(existingTimeout);
          this.set("_actionTimeout", null);
        }

        this.set("_actionTimeout", window.setTimeout($.proxy(function() {
          this.sendAction("action", {
            searchTerm: this.get("searchTerm"),
            fromDate: this.get("fromDate") ? this.$().find("#fromDate").datepicker("getDate").toISOString() : null,
            toDate: this.get("toDate") ? this.$().find("#toDate").datepicker("getDate").toISOString() : null,
            displayFromDate: this.get("fromDate"),
            displayToDate: this.get("toDate")
          });
        }, this), 500));
      },

      actions: {
        clear: function(field) {
          this.set(field, null);
          this.input();
        },

        export: function() {
          this.sendAction("download");
        },

        downloadDropdown: function(id) {
          this.sendAction("downloadDropdownAction", id);
        },
      }
    });

      Ember.TEMPLATES['components/common-search-bar'] = Ember.Handlebars.compile(commonSearchBarTemplate);
      App.CommonSearchBarComponent = Ember.Component.extend({
          showDownload: true,
          downloadDropDown: null,
          count: null,

          init: function() {
              this._super.apply(this, arguments);
              // need to do the following to ensure the search bar fields reflect the search terms for the host table screen
              this.setProperties({fromDate: this.get("searchFilters.displayFromDate"),
                  toDate: this.get("searchFilters.displayToDate"),
                  searchTerm: this.get("searchFilters.searchTerm")});
          },

          didInsertElement: function() {
              var comp = this;
              this.$().find(".search-date").datepicker({
                  dateFormat: "dd M yy",
                  onSelect: function(selectedDate) {
                      comp.selectDate(selectedDate, this, comp);
                  }
              });
          },

          selectDate: function(selectedDate, dateField, component) {
              component.set(dateField.id, selectedDate);
              $.proxy(component.input, component)();
          },

          _defaultFromDate: Ember.computed("defaultDateRange", function() {
              return (this.get("defaultDateRange") && this.get("defaultDateRange").length > 0) ? this.get("defaultDateRange")[0] : null;
          }),

          _defaultToDate: Ember.computed("defaultDateRange", function () {
              return (this.get("defaultDateRange") && this.get("defaultDateRange").length > 0) ? this.get("defaultDateRange")[1] : null;
          }),

          fromDatePlaceholder: Ember.computed("fromDate", "toDate", {
              get: function() {
                  var fromDate = this.get("fromDate");
                  var toDate = this.get("toDate");
                  var defaultFromDate = this.get("_defaultFromDate");

                  if (toDate && !fromDate) {
                      return "Earliest";
                  } else if (defaultFromDate) {
                      return moment(defaultFromDate).format("DD MMM YYYY");
                  } else {
                      return "From date";
                  }
              },
              set: function(key, newValue) {
                  return newValue;
              }

          }),


          toDatePlaceholder: Ember.computed("fromDate", "toDate", {
              get: function() {
                  var toDate = this.get("toDate");
                  var fromDate = this.get("fromDate");
                  var defaultToDate = this.get("_defaultToDate");

                  if (!toDate && fromDate) {
                      return fromDate;
                  } else if (defaultToDate) {
                      return moment(defaultToDate).format("DD MMM YYYY");
                  } else {
                      return "To date";
                  }
              },
              set: function(key, newValue) {
                  return newValue;
              }

          }),


          // debounce input, and perform the search when the user stops typing or selecting dates
          _actionTimeout: null,
          input: function() {
              var existingTimeout = this.get("_actionTimeout");
              if (existingTimeout) {
                  window.clearTimeout(existingTimeout);
                  this.set("_actionTimeout", null);
              }

              this.set("_actionTimeout", window.setTimeout($.proxy(function() {
                  this.sendAction("action", {
                      searchTerm: this.get("searchTerm"),
                      fromDate: this.get("fromDate") ? this.$().find("#fromDate").datepicker("getDate").toISOString() : null,
                      toDate: this.get("toDate") ? this.$().find("#toDate").datepicker("getDate").toISOString() : null,
                      displayFromDate: this.get("fromDate"),
                      displayToDate: this.get("toDate")
                  });
              }, this), 500));
          },

          actions: {
              clear: function(field) {
                  this.set(field, null);
                  this.input();
              },

              export: function() {
                  this.sendAction("download");
              },

              downloadDropdown: function(id) {
                  this.sendAction("downloadDropdownAction", id);
              },
          }
      });


  Ember.TEMPLATES['components/common-from-to-date-picker'] = Ember.Handlebars.compile(commonFromToDatePickerTemplate);
  App.CommonFromToDatePickerComponent = Ember.Component.extend({

      init: function() {
          this._super.apply(this, arguments);
          // need to do the following to ensure the search bar fields reflect the search terms for the host table screen
          this.setProperties({fromDate: this.get("searchFilters.displayFromDate"),
              toDate: this.get("searchFilters.displayToDate")});
      },

      didInsertElement: function() {
          var comp = this;
          this.$().find(".search-date").datepicker({
              dateFormat: "dd M yy",
              onSelect: function(selectedDate) {
                  comp.selectDate(selectedDate, this, comp);
              }
          });
      },

      selectDate: function(selectedDate, dateField, component) {
          component.set(dateField.id, selectedDate);
          $.proxy(component.input, component)();
      },

      _defaultFromDate: Ember.computed("defaultDateRange", function() {
          return (this.get("defaultDateRange") && this.get("defaultDateRange").length > 0) ? this.get("defaultDateRange")[0] : null;
      }),

      _defaultToDate: Ember.computed("defaultDateRange", function () {
          return (this.get("defaultDateRange") && this.get("defaultDateRange").length > 0) ? this.get("defaultDateRange")[1] : null;
      }),

      fromDatePlaceholder: Ember.computed("fromDate", "toDate", {
          get: function() {
              var fromDate = this.get("fromDate");
              var toDate = this.get("toDate");
              var defaultFromDate = this.get("_defaultFromDate");

              if (toDate && !fromDate) {
                  return "Earliest";
              } else if (defaultFromDate) {
                  return moment(defaultFromDate).format("DD MMM YYYY");
              } else {
                  return "From date";
              }
          },
          set: function(key, newValue) {
              return newValue;
          }

      }),


      toDatePlaceholder: Ember.computed("fromDate", "toDate", {
          get: function() {
              var toDate = this.get("toDate");
              var fromDate = this.get("fromDate");
              var defaultToDate = this.get("_defaultToDate");

              if (!toDate && fromDate) {
                  return fromDate;
              } else if (defaultToDate) {
                  return moment(defaultToDate).format("DD MMM YYYY");
              } else {
                  return "To date";
              }
          },
          set: function(key, newValue) {
              return newValue;
          }

      }),


      // debounce input, and perform the search when the user stops typing or selecting dates
      _actionTimeout: null,
      input: function() {
          var existingTimeout = this.get("_actionTimeout");
          if (existingTimeout) {
              window.clearTimeout(existingTimeout);
              this.set("_actionTimeout", null);
          }

          this.set("_actionTimeout", window.setTimeout($.proxy(function() {
              this.sendAction("action", {
                  fromDate: this.get("fromDate") ? this.$().find("#fromDate").datepicker("getDate").toISOString() : null,
                  toDate: this.get("toDate") ? this.$().find("#toDate").datepicker("getDate").toISOString() : null,
                  displayFromDate: this.get("fromDate"),
                  displayToDate: this.get("toDate")
              });
          }, this), 500));
      },

      actions: {
          clear: function(field) {
              this.set(field, null);
              this.input();
          }
      }
  });

    Ember.TEMPLATES['components/common-date-picker'] = Ember.Handlebars.compile(commonDatePickerTemplate);
    App.CommonDatePickerComponent = Ember.Component.extend({
      didInsertElement: function() {
        var comp = this;
        this.$().find(".search-date").datepicker({
          dateFormat: "dd M yy",
          onSelect: function(selectedDate) {
            comp.selectDate(selectedDate, this, comp);
          }
        });
      },

      selectDate: function(selectedDate, dateField, component) {
        component.set(dateField.id, selectedDate);
        $.proxy(component.input, component)();
      },

      datePlaceholder: Ember.computed("dateVal", {
        get: function() {
          var dateVal = this.get("dateVal");
          return moment(dateVal).zone("+1000").format("DD M YYYY");
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      // debounce input, and perform the search when the user stops typing or selecting dates
      _actionTimeout: null,
      input: function() {
        var existingTimeout = this.get("_actionTimeout");
        if (existingTimeout) {
          window.clearTimeout(existingTimeout);
          this.set("_actionTimeout", null);
        }

        this.set("_actionTimeout", window.setTimeout($.proxy(function() {
          this.sendAction("action", {
            fromDate: this.get("dateVal") ? this.$().find("#dateVal").datepicker("getDate").toISOString() : null
          });
        }, this), 500));
      }
    });

    Ember.TEMPLATES['components/common-inline-date-picker'] = Ember.Handlebars.compile("<div class='inline-date-picker'></div>");
    App.CommonInlineDatePickerComponent = Ember.Component.extend({
      dateVal: null,

      dpElement: function() {
        return this.$().find(".inline-date-picker");
      },

      didInsertElement: function() {
        var comp = this;
        this.dpElement().datepicker({
          dateFormat: "dd M yy",
          onSelect: function(selectedDate) {
            comp.selectDate(selectedDate, this, comp);
          }
        });
      },

      selectDate: function(selectedDate, dateField, component) {
        component.set(component.get("dateVal"), selectedDate);
        this.sendAction("action", this.dpElement().datepicker("getDate").toISOString());
      }
    });

    App.FilterType = Ember.Object.extend({
      title: null,
      type: null,
      count: null,
      active: false,
      visible: true,

      isDisabled: Ember.computed("count", {
        get: function() {
          return this.get("count") == 0;
        },
        set: function(key, newValue) {
          return newValue;
        }

      })
    });


    Ember.TEMPLATES['components/view-date'] = Ember.Handlebars.compile(viewDateTemplate);
    App.ViewDateComponent = Ember.Component.extend({
      date: null,
      withTime: false,
      withFullTime: false,
      tagName: "span",
      relative: false,

      dateFormat: Ember.computed("withTime", "withMonthYear", "withFullTime", {
        get: function() {
          if (this.get("withTime")) {
            return "DD MMM YYYY HH:mm";
          } else if (this.get("withFullTime")) {
            return "DD MMM YYYY HH:mm:ss";
          } else if (this.get("withMonthYear")) {
            return "MMM YYYY";
          } else {
            return "DD MMM YYYY";
          }
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      viewDate: Ember.computed("date", "withTime", {
        get: function() {
          var format = this.get("dateFormat");
          if (this.get("relative")) {
            return moment(this.get("date")).fromNow();
          } else {
            return moment(this.get("date")).format(format);
          }
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      fullDate: Ember.computed("date", {
        get: function() {
          return moment(this.get("date")).format("DD/MM/YYYY HH:mm:ss Z");
        },
        set: function(key, newValue) {
          return newValue;
        }

      })
    });


    Ember.TEMPLATES['components/table-page-links'] = Ember.Handlebars.compile(tablePageLinksTemplate);
    App.TablePageLinksComponent = Ember.Component.extend({
      pageSize: null,
      pageNumber: null,
      totalRecords: null,

      numberOfPages: Ember.computed("totalRecords", "pageSize", {
        get: function() {
          var totalRecords = this.get("totalRecords");
          var pageSize = this.get("pageSize");
          if (totalRecords <= pageSize) return false;
          var rem = totalRecords % pageSize;
          return Math.floor(totalRecords / pageSize) + (rem == 0 ? 0 : 1);
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      pageNumbers: Ember.computed("numberOfPages", "pageNumber", {
        get: function() {
          var pageNumbers = [],
            numberOfPages = this.get("numberOfPages"),
            pageSize = this.get("pageSize"),
            selectedPage = this.get("pageNumber") || 1;

          if (numberOfPages) {
            if (numberOfPages > 10) {
              pageNumbers[0] = Ember.Object.create({
                num: 1,
                text: "<<",
                active: (selectedPage == 1)
              });

              if (selectedPage != 1) {
                pageNumbers[1] = Ember.Object.create({
                  num: selectedPage - 1,
                  text: "<",
                  active: false
                });
              }

              var minPage = (selectedPage <= 4) ? 1 : selectedPage - 2;

              for (var i = minPage; i < selectedPage; i++) {
                pageNumbers[pageNumbers.length] = Ember.Object.create({
                  num: i,
                  text: i,
                  active: (i == selectedPage)
                });
              }

              for (var i = selectedPage;
                ((i <= selectedPage + 6) && (i <= numberOfPages)); i++) {
                pageNumbers[pageNumbers.length] = Ember.Object.create({
                  num: i,
                  text: i,
                  active: (i == selectedPage)
                });
              }

              if (selectedPage <= numberOfPages - 1) {
                pageNumbers[pageNumbers.length] = Ember.Object.create({
                  num: selectedPage + 1,
                  text: ">",
                  active: false
                });
              }

              pageNumbers[pageNumbers.length] = Ember.Object.create({
                num: numberOfPages,
                text: ">>",
                active: (selectedPage == numberOfPages)
              });
            } else {
               for (var i = 1; i <= numberOfPages; i++)
                 pageNumbers[i - 1] = Ember.Object.create({
                   num: i,
                   text: i,
                   active: (i == selectedPage)
                 });
             }
          }
          pageNumbers.setEach("all", pageNumbers);
          return pageNumbers;
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      activatePage: function(page) {
        this.set("pageNumber", page.num);
        page.get("all").setEach("active", false);
        page.set("active", true);
      },

      actions: {
        showPage: function(page) {
          this.activatePage(page);
          this.sendAction("action", page.get("num"));
        }
      }

    });

    App.TableColumn = Ember.Object.extend({
      fieldName: null,
      title: null,
      sortable: false,
      sorted: false,
      sortDirection: null,
      rightAligned: false,
      hiddenForTypes: [],
      requiresFeature: null,

      sort: function() {
        if (this.get("sorted")) {
          this.set("sortDirection", (this.get("sortDirection") == "desc") ? "asc" : "desc");
        } else {
          this.set("sorted", true);
          this.set("sortDirection", "asc");
        }
      },

      ascending: Ember.computed("sortDirection", {
        get: function() {
          return this.get("sortDirection") == "asc";
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      clearSort: function() {
        this.set("sorted", false);
        this.set("sortDirection", null);
      }
    });

    Ember.TEMPLATES['components/table-column-data'] = Ember.Handlebars.compile(tableColumnDataTemplate);
    App.TableColumnDataComponent = Ember.Component.extend({
      tagName: "td",
      classNameBindings: ["tableColumn.rightAligned:text-right", "tableColumn.sorted:sorted"],
      attributeBindings: ["preventWrap:nowrap"],
      preventWrap: false,
      columnFieldName: null,
      table: null,
      columns:null,
      typeFilters:null,
      biller:null,

      tableColumn: Ember.computed("columns.[]", "columnFieldName", {
        get: function() {
          return (this.get("columns") || []).findBy("fieldName", this.get("columnFieldName"));
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      isVisible: Ember.computed("tableColumn", "typeFilters.@each.active", {
        get: function() {
          var test = this.get("typeFilters");
          var activeFilter = (this.get("typeFilters") || []).findBy("active", true) || {};
          return isColumnVisible(activeFilter, this.get("biller"), this.get("tableColumn"));
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),
    });

      //Component to integrate payment page
      Ember.TEMPLATES['components/multi-select'] = Ember.Handlebars.compile(multiSelect);
      App.MultiSelectComponent = Ember.Component.extend({

          options: [],

          init: function() {
              this._super.apply(this, arguments);
              // need to do the following to ensure the search bar fields reflect the search terms for the host table screen
              if (!this.get('options')) {
                  this.set('options', []);
              }
          },

          didInsertElement: function() {
              this._super(arguments);
              var billStatusSelected = this.get("searchFilters.billStatus");
              $('#select-state').selectize({
                  items: billStatusSelected,
                  plugins: ['remove_button'],
                  delimiter: ',',
                  persist: false,
                  closeAfterSelect: true,
                  create: function(input) {
                      return {
                          value: input,
                          text: input
                      }
                  }
              });

          },

          actions: {
              reloadDataNew: function() {
                  this.sendAction("reload", $('#select-state').val());
                  //alert("here");
              }
          }
      });

      Ember.TEMPLATES['components/searchable-select'] = Ember.Handlebars.compile(searchableSelect);
      App.SearchableSelectComponent = Ember.Component.extend({

          options: [],
          value: "",

          init: function() {
              this._super.apply(this, arguments);
              // need to do the following to ensure the search bar fields reflect the search terms for the host table screen
              if (!this.get('options')) {
                  this.set('options', []);
              }
          },

          didInsertElement: function() {
              this._super(arguments);
              var item = this.get("value") ? this.get("value") :  "";
              var options = this.get('options');
              var selectedOptions = options.filter(function (opt) {
                  return opt.id === item;
              });
              var limit = 50;
              $('#select-searchable').selectize({
                  plugins: ['remove_button'],
                  create: false,
                  items: [item],
                  options: options.slice(0,limit).concat(selectedOptions),
                  valueField: 'id',
                  labelField: 'name',
                  searchField: 'name',
                  render: {
                      option: function(item, escape) {
                          return '<div class="option" data-value="' + item.id + '">' + escape(item.name) + '</div>';
                      }
                  },
                  load: function(query, callback) {
                      if (!query.length) return callback(options.slice(0, limit));

                      var filteredOptions = options.filter(function (opt){
                          return opt.name.toLowerCase().includes(query.toLowerCase());
                      });
                      return callback(filteredOptions.slice(0, limit));
                  }
              });
          },

          actions: {
              reloadDataNew: function() {
                  this.sendAction("reload", $('#select-searchable').val());
                  //alert("here");
              }
          }
      });

    Ember.TEMPLATES['components/data-table-sent-mail'] = Ember.Handlebars.compile(dataTableSentMailTemplate);
    App.DataTableSentMailComponent = Ember.Component.extend({

        data: [],
        groupingField1: "dispatch-type",
        groupingField2: null,
        sumValue1: "quantity",
        fields: {},
        dataColumns: {},

        formatData: function(d) {
            var rows = '';
            for (i = 0; i < d.details.length; i++) {
                rows = rows +  '<tr>'+
                    '<td>'+d.details[i].id +'</td>'+
                    '<td>'+d.details[i].dispatchType +'</td>'+
                    '<td>'+d.details[i].campaignName+'</td>'+
                    '<td>'+d.details[i].campaignInternalReferenceNumber+'</td>'+
                    '<td>'+d.details[i].campaignDocumentType+'</td>'+
                    '<td>'+d.details[i].quantity+'</td>';
                if(d.details[i].dispatchType.toLowerCase() === "print"){
                    rows = rows + '<td> <a href="https://sd.semagroup.com.au/" target="_blank"><span class="glyphicon glyphicon-eye-open"></span></a> </td>';
                }else {
                    rows = rows + '<td> <a href="#/biller/'+d.billerActorId+'/bills/sendPending"><span class="glyphicon glyphicon-eye-open"></span></a> </td>';
                }

                rows = rows + '</tr>';
            }
            // `d` is the original data object for the row
            return '<div style="max-height: 400px; overflow-y: scroll;">' +
                '<table width="100%" cellspacing="0" border="0" style="padding-left:50px">'+
                '<tr style="background-color: #1c1850; color: white;">'+
                '<td>' + reportsStrings.all.groupings.id + '</td>'+
                '<td>' + reportsStrings.all.groupings.dispatchType + '</td>'+
                '<td>' + reportsStrings.all.groupings.campaignName + '</td>'+
                '<td>' + reportsStrings.all.groupings.campaignInternalReferenceNumber + '</td>'+
                '<td>' + reportsStrings.all.groupings.campaignDocType + '</td>'+
                '<td>' + reportsStrings.all.quantity + '</td>'+
                '<td></td>'+
                '</tr>'+
                rows
            '</table>'+
            '</div>';
        },

        modelChanged: Ember.observer('data', function(){

            //remove the table
            var table = $('#data-table').DataTable();
            table.destroy();
            $('#data-table').empty();

            //reload the table
            var field1 = this.get('groupingField1');
            var field2 = this.get('groupingField2');
            if(field2 === "none"){
              field2 = null;
            }
            var field3 = this.get('sumValue1');

            var fields = this.get('fields');
            var dataColumns = this.get('dataColumns');

            // create table header for up to three columns
            var tableHeader = '<thead> <tr> <th></th>';
            tableHeader += '<th>'+ fields[field1]+'</th>';
            if (field2 != null){
                tableHeader += '<th>'+ fields[field2]+'</th>';
            }
            tableHeader += '<th>'+ fields[field3]+'</th></tr></thead>';
            $('#data-table').append(tableHeader);

            var columnDetails = [
                {
                    "className":      'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ''
                }
            ];

            columnDetails.push({ "data": dataColumns[field1] });
            if (field2 != null){
                columnDetails.push({ "data": dataColumns[field2] });
            }
            columnDetails.push({ "data": "quantity" });

            var table = $('#data-table').DataTable({
                "searching": false,
                "data": this.get('data'),
                "columns": columnDetails,
                "order": [[1, 'asc']]
            });

            var comp = this;

            $('#data-table tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( comp.formatData(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );

        }),

        didInsertElement: function() {
            // need to do the following to ensure the search bar fields reflect the search terms for the host table screen
            var field1 = this.get('groupingField1');
            var field2 = this.get('groupingField2');
            if(field2 === "none"){
                field2 = null;
            }
            var field3 = this.get('sumValue1');

            var fields = this.get('fields');
            var dataColumns = this.get('dataColumns');


            var tableHeader = '<thead> <tr> <th></th>';
            tableHeader += '<th>'+ fields[field1]+'</th>';

            if (field2 != null){
                tableHeader += '<th>'+ fields[field2]+'</th>';
            }
            tableHeader += '<th>'+ fields[field3]+'</th></tr></thead>';

            $('#data-table').append(tableHeader);

            var columnDetails = [
                {
                    "className":      'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ''
                }
            ];
            columnDetails.push({ "data": dataColumns[field1] });

            if (field2 != null){
              columnDetails.push({ "data": dataColumns[field2] });
            }
            columnDetails.push({ "data": "quantity" });

            var table = $('#data-table').DataTable({
                "searching": false,
                "data": this.get('data'),
                "columns": columnDetails,
                "order": [[1, 'asc']]
            });

            var comp = this;

            $('#data-table tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( comp.formatData(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );
        }
    });

      Ember.TEMPLATES['components/zing-chart'] = Ember.Handlebars.compile(zingChartTemplate);
      App.ZingChartComponent = Ember.Component.extend({

          data: [],
          type: 'bar',
          height: 400,
          width: '100%',
          stacked: true,
          legendMaxItems: 30,
          componentId: 'chartDiv',

          modelChanged: Ember.observer('data', function(){
              var data = this.get("data");
              var chartData = {
                  type: this.get('type'),  // Specify your chart type here.
                  stacked: this.get('stacked'),
                  title: {
                       // Adds a title to your chart
                  },
                  legend:{
                      align: 'center',
                      verticalAlign: 'bottom',
                      "max-items": this.get('legendMaxItems'),
                      overflow: 'page',
                      "page-on":{
                          "border-width":1,
                      },
                      "page-off":{
                          "border-width":1,
                      },
                      "page-status":{
                          "font-size":11,
                          "font-family":"Georgia",
                      },
                      toggleAction: 'remove'
                  }, // Creates an interactive legend
                  "scale-x": {
                      "values": data.xLabels
                  },
                  series:  data.values
              };
              zingchart.render({ // Render Method[3]
                  id: this.get('componentId'),
                  data: chartData,
                  height: this.get("height"),
                  width: this.get("width")
              });

          }),

          didInsertElement: function() {
            var data = this.get("data");
              var chartData = {
                  type: this.get('type'),  // Specify your chart type here.
                  stacked: this.get('stacked'),
                  title: {

                  },
                  legend:{
                      align: 'center',
                      verticalAlign: 'bottom',
                      "max-items": this.get('legendMaxItems'),
                      overflow: 'page',
                      "page-on":{
                          "border-width":1,
                      },
                      "page-off":{
                          "border-width":1,
                      },
                      "page-status":{
                          "font-size":11,
                          "font-family":"Georgia",
                      },
                      toggleAction: 'remove'
                  }, // Creates an interactive legend
                  "scale-x": {
                      "values": data.xLabels
                  },
                  series: data.values
              };
              zingchart.render({ // Render Method[3]
                  id: this.get('componentId'),
                  data: chartData,
                  height: this.get("height"),
                  width: this.get("width")
              });
          }
      });

    var tabularDataFilters = ["fromDate", "toDate", "searchTerm", "sortOrder", "sortDirection", "pageNumber", "type", "billerId", "billStatus", "billFormat", "exactSearch", "exactSearchNoticeGroup", "exactSearchJobId"];

    App.TabularDataController = Ember.Mixin.create({
      pageNumber: 1,
      typeFilters: [],
      columns: [],

      init: function () {
        this._super();
        this.set("selectedFilters", Ember.Object.create());
      },

      allSearchFilters: function () {
        return this.get("selectedFilters")
            .getProperties(tabularDataFilters);
      },

      nonEmptySearchFilters: function () {
        var filters = this.allSearchFilters();
        tabularDataFilters.forEach(function (k) {
          if (!filters[k] || filters[k].toString().trim() === "") {
            delete filters[k];
          }
        });
        return filters;
      },

      setBaseFilters: function (baseFilters) {
        this.get("selectedFilters").setProperties(baseFilters);
      },

      searchTerm: Ember.aliasMethod("selectedFilters.searchTerm"),

      fromDate: Ember.aliasMethod("selectedFilters.fromDate"),

      displayFromDate: Ember.computed("fromDate", function () {
        return this.get("selectedFilters.fromDate");
      }),

      displayToDate: Ember.computed("toDate", function () {
        return this.get("selectedFilters.toDate");
      }),

      toDate: Ember.aliasMethod("selectedFilters.toDate"),

      billStatus: Ember.aliasMethod("selectedFilters.billStatus"),

      exactSearch: Ember.aliasMethod("selectedFilters.exactSearch"),

      exactSearchNoticeGroup: Ember.aliasMethod("selectedFilters.exactSearchNoticeGroup"),

      exactSearchJobId: Ember.aliasMethod("selectedFilters.exactSearchJobId"),

      toggleDirection: function () {
        var currDir = this.get("selectedFilters.sortDirection");

        this.get("selectedFilters").set("sortDirection", (currDir == "desc") ? "asc" : "desc");
      },

      changeActiveFilterType: function () {
        var selectedType = this.get("selectedFilters.type");
        if (selectedType) {
          this.get("typeFilters").setEach("active", false);
          (this.get("typeFilters").findBy("type", selectedType) || Ember.Object.create()).set("active", true);
        }
      }.observes("selectedFilters.type", "typeFilters"),


      _onContextChange: function () {
        this.get("selectedFilters")
            .setProperties({
              fromDate: null,
              searchTerm: null,
              toDate: null,
              displayFromDate: null,
              displayToDate: null,
              billStatus: null,
              type: null,
              exactSearch: false,
              exactSearchNoticeGroup: false,
              exactSearchJobId: false,
              pageNumber: 1
            });
      }.observes("application.entityContext"),


      reloadCounts: function () {
        var counts = 0;

        if (this.get("meta")) {
          counts = this.get("meta.typeCounts");
        }

        this.get("typeFilters").forEach(function (f) {
          f.set("count", counts[f.type]);
        });
      }.observes("meta", "typeFilters"),

      totalRecords: Ember.computed("content", {
        get: function () {
          return this.get("meta").total;
        },
        set: function (key, newValue) {
          return newValue;
        }

      }),


      resetPageNumber: function () {
        this.set("pageNumber", 1);
        this.set("selectedFilters.pageNumber", 1);
      }.observes("selectedFilters.sortOrder", "selectedFilters.type", "selectedFilters.sortDirection", "selectedFilters.searchTerm", "selectedFilters.fromDate", "selectedFilters.toDate"),

      resetSortOrder: function () {
        if (!this.get("selectedFilters.sortOrder")) {
          this.get("columns").forEach(function (column) {
            column.clearSort()
          });
        }
      }.observes("selectedFilters.sortOrder"),

      _getDownloadUrl: function () {
        var url = this.get("prepareDownloadUrl");
        var filters = this.nonEmptySearchFilters();

        url = url + $.param(filters);
        var columns = [];
        var fieldNames = [];
        $.each(this.get("downloadColumns"),
            function (idx, c) {
              var hiddenForTypes = c.get("hiddenForTypes");
              if ((!hiddenForTypes || hiddenForTypes.indexOf(filters["type"]) < 0) && c.get("type") != "action" && c.get("type") != "actions") {
                columns.push(c.get("title"));
                fieldNames.push(c.get("fieldName"));
              }
            });

        url = url + "&" + "columns=" + columns + "&" + "fieldNames=" + fieldNames;
        return url;
      },

      actions: {
        sort: function (sortedColumn) {
          this.get("columns").forEach(function (column) {
            if (sortedColumn != column) column.clearSort()
          });

          sortedColumn.sort();
          this.get("selectedFilters").setProperties(
              {
                sortOrder: sortedColumn.get("fieldName"),
                sortDirection: sortedColumn.get("sortDirection")
              });
          this.send("reloadData", this.get("selectedFilters"));
        },

        changeCommonFilters: function (args) {
          this.get("selectedFilters").setProperties(args);
          this.send("reloadData", this.get("selectedFilters"));
        },

        pageChanged: function (pageNumber) {
          // don't persist the page number and offset in the selected filters - want the offset to reset back each time the filter changes
          this.set("selectedFilters.pageNumber", pageNumber);
          this.send("reloadData", this.get("selectedFilters"));
        },

        download: function () {
          this.send("downloadData", this._getDownloadUrl());
        },

        downloadDropdownAction: function (id) {
          this.send("downloadDropdownData", id, this._getDownloadUrl());
        },

        downloadModal: function () {
          this.send("downloadData", this._getDownloadUrl());
        },

        reload: function (statusSelected) {

          this.get("selectedFilters").setProperties(
              {
                billStatus: statusSelected
              });

          if (statusSelected.indexOf(this.get("selectedFilters.type")) < 0) {
            this.get("selectedFilters").setProperties({type: "sendPending"});
          }

          $.each(this.get("typeFilters"),
              function (idx, tf) {
                //tf.set("title", controller.get("strings.capitalised." + tf.get("type")));
                if (statusSelected.contains(tf.get("type"))) {
                  tf.set("visible", true);
                } else {
                  tf.set("visible", false);
                }
              });

          this.send("reloadData", this.get("selectedFilters"));
        }
      }
    });

  });
