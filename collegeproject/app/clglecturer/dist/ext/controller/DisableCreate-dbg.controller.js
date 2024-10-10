sap.ui.define(['sap/ui/core/mvc/ControllerExtension','sap/ui/model/Filter',
'sap/ui/model/FilterOperator'], function (ControllerExtension,Filter, FilterOperator) {
	'use strict';

	return ControllerExtension.extend('clglecturer.ext.controller.DisableCreate', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf clglecturer.ext.controller.DisableCreate
             */
			onInit: function () {
				
			},
			routing: {
			onBeforeBinding: function () {
				debugger
				console.log("onInit called");
				debugger
				var oModel = this.base.getExtensionAPI().getModel();
				if (sap.ushell && sap.ushell.Container) {
                    var oUserInfoService = sap.ushell.Container.getService("UserInfo");
                    var oUserEmail = oUserInfoService.getEmail();

					// var oUserEmail = 'krishna.vamsi@peolsolutions.com';
                    console.log(oUserEmail);
					if (oUserEmail !== 'kodidala.vamshivardhan@peolsolutions.com') {
						
						this.base.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.m.Input") && control.getId().includes("Draft");
						}).forEach(function (oInput) {
							oInput.setEditable(false);
						});

						this.base.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.m.Button") && (control.getId().includes("Create") || control.getId().includes("Delete"));
						}).forEach(function (oButton3) {
							oButton3.setVisible(false);
						});

						var oTable = this.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.ui.table.Table") || control.isA("sap.m.Table");
						})[0];

						debugger
						var oBinding;
						if (oBinding) {
							oBinding = oTable.getBinding("items");
							var oFilter = new Filter({
								path: "IsActiveEntity",
								operator: FilterOperator.EQ,
								value1: true
							});
							oBinding.filter([oFilter]);
						}
						const oView = this.base.getView();
						const filterId = oView.mAggregations.content[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.sId;
						var oFilterBar = sap.ui.getCore().byId(filterId);

						var oButtonadapt = this.base.getView().byId('clglecturer::CollegeList--fe::FilterBar::College-btnAdapt');
                        oButtonadapt.setVisible(false);

						// if (oFilterBar ) {
                        //     oFilterBar.setVisible(false);
                        //     console.log("FilterBar found and hidden.");
                        // } else {
                        //     console.log("FilterBar not found.");
                        // }
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
				var oTable = this.getView().findAggregatedObjects(true, function (control) {
					return control.isA("sap.ui.table.Table") || control.isA("sap.m.Table");
				});
				debugger
				var headerToolbar1 = oTable[1].getHeaderToolbar();
				var headerToolbar2 = oTable[2].getHeaderToolbar();
				headerToolbar1.setVisible(false);
				headerToolbar2.setVisible(false);

			}
		}
		}
	});
});
