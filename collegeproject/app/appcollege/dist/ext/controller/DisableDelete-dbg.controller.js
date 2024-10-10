sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('appcollege.ext.controller.DisableDelete', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf appcollege.ext.controller.DisableDelete
             */
			onInit: async function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				debugger
            },
			
            routing: {
            onBeforeBinding: async function () {
                debugger; 
				
				if (sap.ushell && sap.ushell.Container) {
                    var oUserInfoService = sap.ushell.Container.getService("UserInfo");
                    var oUserEmail = oUserInfoService.getEmail();
                    console.log(oUserEmail);

                var oModel = this.base.getExtensionAPI().getModel();
                if (!oModel) {
                    console.error('Model is not available.');
                    return;
                }
        
                var sServiceUrl;
                // var oUserEmail = 'krishna.vamsi@peolsolutions.com';
                if (typeof oModel.getServiceUrl === "function") {
                    sServiceUrl = oModel.getServiceUrl(); 
                    console.log('Service URL:', sServiceUrl);
                } 
                else {
                    console.error('Unable to determine the service URL.');
                    return;
                }
                try {
                    const response = await new Promise((resolve, reject) => {
                        jQuery.ajax({
                            url: sServiceUrl + "/Department",
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(new Error(textStatus + ': ' + errorThrown));
                            }
                        });
                        
                    });
                    const response1 = await new Promise((resolve, reject) => {
                        jQuery.ajax({
                            url: sServiceUrl + "/Permission",
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(new Error(textStatus + ': ' + errorThrown));
                            }
                        });
                    });
        
                    console.log('Department data:', response);
                    console.log('Permission data:', response1);

                    const aDepartments = response.value;
                    const aPermission = response1.value;
                    debugger
                    if (aPermission && aPermission.length > 0) {
                            for (let perm of aPermission) {
                                if(perm.userEmail === oUserEmail){
                                    var depuserid = perm.user;
                                    
                                }
                            }
                    }

                    debugger
                    const sUrl = window.location.href;
                    console.log("Current URL:", sUrl);
                    const urlObj = new URL(sUrl);
                    // Extract the path segment after the '#' symbol
                    const hashSegment = urlObj.hash.substring(1);
                    // Find the deptId parameter within the path segment
                    const match = /Department\(deptId='([^']*)'/.exec(hashSegment);
                    const depId = match ? match[1] : null;
                    debugger
                    if(depuserid !== 'admin'){
                        if(depId !== depuserid){
                            this.getView().findAggregatedObjects(true, function (control) {
                                return control.isA("sap.m.Button");
                            }).forEach(function (oButton) {
                                if (oButton.getId().includes("Delete")) {
                                    oButton.setVisible(false);
                                }
                                else if (oButton.getId().includes("Edit")){
                                    oButton.setVisible(false);
                                    // oButton.setEnabled(false);
                                }
                            });
                        }
                        else{
                            this.getView().findAggregatedObjects(true, function (control) {
                                return control.isA("sap.m.Button");
                            }).forEach(function (oButton) {
                                if (oButton.getId().includes("Delete")) {
                                    oButton.setVisible(false);
                                }
                                else if (oButton.getId().includes("Edit")){
                                    oButton.setVisible(true);
                                }
                            });
                        }
                    }
                } 
                catch (error) {
                    console.error('Error fetching data', error);
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

