sap.ui.define(['sap/ui/core/mvc/ControllerExtension',"sap/ui/model/Filter",
"sap/ui/model/FilterOperator"], function (ControllerExtension,Filter, FilterOperator) {
	'use strict';

	return ControllerExtension.extend('appcollege.ext.controller.DisableCreateList', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf appcollege.ext.controller.DisableCreateList
             */

            onInit: function () {
            
            },
            routing: {
			onBeforeBinding: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				debugger
				var oModel = this.base.getExtensionAPI().getModel();
    
				if (sap.ushell && sap.ushell.Container) {
                    var oUserInfoService = sap.ushell.Container.getService("UserInfo");
                    var oUserEmail = oUserInfoService.getEmail();
					// var oUserEmail = 'krishna.vamsi@peolsolutions.com';
                    console.log(oUserEmail);
					if (oUserEmail !== 'kodidala.vamshivardhan@peolsolutions.com') {
						debugger
				
                        this.base.getView().findAggregatedObjects(true, function (control) {
                            return control.isA("sap.m.Button");
                        }).forEach(function (oButton) {
                            // Check button IDs to disable specific buttons
                            if (oButton.getId().includes("Create") || oButton.getId().includes("Delete")) {
                                oButton.setVisible(false); 
                            }
                        });
    
                        this.base.getView().findAggregatedObjects(true, function (control) {
                            return control.isA("sap.m.Input") && control.getId().includes("Draft");
                        }).forEach(function (oInput) {
                            oInput.setEditable(false); // Set draft-related fields to read-only
                        });
    
                        const filterId = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.mAssociations.filter;
                        const filterBar = sap.ui.getCore().byId(filterId);
                        
                        // if (filterBar ) {
                        //     filterBar.setVisible(false);
                        //     console.log("FilterBar found and hidden.");
                        // } else {
                        //     console.log("FilterBar not found.");
                        // }

                        var oButtonadapt = this.base.getView().byId('appcollege::DepartmentList--fe::FilterBar::Department-btnAdapt');
                        oButtonadapt.setVisible(false);

                        var oTable = this.getView().findAggregatedObjects(true, function (control) {
                                return control.isA("sap.ui.table.Table") || control.isA("sap.m.Table");
                            })[0];
                            debugger
                            var oBinding = oTable.getBinding("items");

                            if (oBinding) {
                                var oFilter = new Filter({
                                    path: "IsActiveEntity",
                                    operator: FilterOperator.EQ,
                                    value1: true
                                });

                            oBinding.filter([oFilter]);
                            }
				            var oFilterBar = sap.ui.getCore().byId(filterId);

                            var oFilterConditions = {
                                "$editState": [ 
                                    {
                                        "operator": "DRAFT_EDIT_STATE",
                                        "values": [
                                            "ALL_HIDING_DRAFTS",
                                            "All (Hiding Drafts)"
                                        ],
                                        "validated": "Validated"
                                    }
                                ]
                            };
                            oFilterBar.setFilterConditions(oFilterConditions);
						
				   }
                } 
				else {
                    console.log("UserInfo service not available.");
                }
					
			}
        }
		}
	});
});
