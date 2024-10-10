sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var oUserEmail;
	return ControllerExtension.extend('clglecturer.ext.controller.DisableEdit', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			routing: {
				onBeforeBinding: async function () {
				debugger
				var saveButton;
				setTimeout(function() {
					this.base.getView().findAggregatedObjects(true, function (control) {
						return control.isA("sap.m.Button");
					}).forEach(function (oButton) {
						// var buttonId = oButton.getId();
						var buttonId = oButton.getText();
						console.log("Button ID: ", buttonId);
						console.log("Button Text: ", oButton.getText());
						
						if (buttonId.includes("Create")) {
							oButton.setText("Send for Approval");
							// saveButton = oButton.getVisible();
						}
						else if(buttonId.includes("Save")) {
							// oButton.setText("Send for Approval");
							// saveButton = oButton.getVisible();
						}
						
					});
					
				}.bind(this), 500);  // 1-second delay

				debugger
				var oModel = this.base.getExtensionAPI().getModel();
					if (!oModel) {
						console.error('Model is not available.');
						return;
					}
					var oUIModel = this.getView().getModel("ui");
					var bIsEditMode = oUIModel.oData.editMode;
					
					//
					const sUrl = window.location.href;
					console.log("Current URL:", sUrl);
					const urlObj = new URL(sUrl);
					const hashSegment = urlObj.hash.substring(1); 
					const match = /College\(lectId='([^']*)',IsActiveEntity=(true|false)\)/.exec(hashSegment);
					const lectId = match ? match[1] : null;
					const isActiveEntity = match ? (match[2] === 'true') : null;
					setTimeout(async function() {
					if (lectId && isActiveEntity === true) {
						//function import
						let funcname = 'postattach';
						let oFunction = this.getView().getModel().bindContext(`/${funcname}(...)`);
						oFunction.setParameter('p', lectId);
						await oFunction.execute();
						const oContext = oFunction.getBoundContext();
						var result = oContext.getValue();
						console.log(result.value.status);
						if (result.value.status == 'Approved' && (oUserEmail === 'kodidala.vamshivardhan@peolsolutions.com' || oUserEmail === undefined)){
							this.getView().findAggregatedObjects(true, function (control) {
								return control.isA("sap.m.Button");
							}).forEach(function (oButton) {
								if (oButton.getId().includes("Delete")) {
									oButton.setVisible(true);
								}
								else if (oButton.getId().includes("Edit")){
									oButton.setEnabled(true);
								}
							});
						}
						// else if(result.value.status === 'In Process' || result.value.status === 'Rejected'){
						else{
							this.getView().findAggregatedObjects(true, function (control) {
								return control.isA("sap.m.Button");
							}).forEach(function (oButton) {
								if (oButton.getId().includes("Delete")) {
									oButton.setEnabled(false);
									oButton.setVisible(false);
								}
								else if (oButton.getId().includes("Edit")){
									oButton.setEnabled(false);
									oButton.setVisible(false);
								}
							});
						}
					}
				}.bind(this), 1000); 

				if(isActiveEntity === true){
					var oUploadSet = this.base.getView().byId("clglecturer::CollegeObjectPage--fe::CustomSubSection::DocAttachment--uploadSet");
						oUploadSet.setUploadButtonInvisible(true);
						oUploadSet.setUploadEnabled(false);
						oUploadSet.mBindingInfos.items.template.setEnabledRemove(false);
						oUploadSet.mBindingInfos.items.template.setVisibleRemove(false);
						oUploadSet.mBindingInfos.items.template.setEnabledEdit(false);
						oUploadSet.mBindingInfos.items.template.setVisibleEdit(false);
				}
				else if(isActiveEntity === false){
					var oUploadSet = this.base.getView().byId("clglecturer::CollegeObjectPage--fe::CustomSubSection::DocAttachment--uploadSet");
						oUploadSet.setUploadButtonInvisible(false);
						oUploadSet.setUploadEnabled(true);
						oUploadSet.mBindingInfos.items.template.setEnabledRemove(true);
						oUploadSet.mBindingInfos.items.template.setVisibleRemove(true);
						oUploadSet.mBindingInfos.items.template.setEnabledEdit(true);
						oUploadSet.mBindingInfos.items.template.setVisibleEdit(true);
				}
				}
			},
			
			onInit: function () {
				debugger
				var oModel = this.base.getExtensionAPI().getModel();
				var oButton2 = this.base.getView().byId('clglecturer::CollegeObjectPage--fe::StandardAction::Edit');
				var oButton3 = this.base.getView().byId('clglecturer::CollegeObjectPage--fe::StandardAction::Delete');
				if (sap.ushell && sap.ushell.Container) {
                    var oUserInfoService = sap.ushell.Container.getService("UserInfo");
                    oUserEmail = oUserInfoService.getEmail();
                    console.log(oUserEmail);
					if (oButton2 && oUserEmail !== 'kodidala.vamshivardhan@peolsolutions.com') {
						oButton2.setVisible(false);
						oButton2.setEnabled(false); 
						// oButton2.setEnabled(false); 
				   }
				   if (oButton3 && oUserEmail !== 'kodidala.vamshivardhan@peolsolutions.com') {
						oButton3.setVisible(false);
			   		}
				}
				else {
					// oButton2.setEnabled(false);
					// oButton3.setVisible(false);
                    console.log("UserInfo service not available.");
                }	
			}
		}
	});
});
