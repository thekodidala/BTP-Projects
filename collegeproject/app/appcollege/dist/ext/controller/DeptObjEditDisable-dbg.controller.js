sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('appcollege.ext.controller.DeptObjEditDisable', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf appcollege.ext.controller.DeptObjEditDisable
             */
			// onInit: function () {
			// 	// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
			// 	var oModel = this.base.getExtensionAPI().getModel();
			// }


			onBeforeRendering: async function () {
                debugger; 
				
				// if (sap.ushell && sap.ushell.Container) {
                //     var oUserInfoService = sap.ushell.Container.getService("UserInfo");
                //     var oUserEmail = oUserInfoService.getEmail();
                //     console.log(oUserEmail);
                // }
                // else {
                //     console.log("UserInfo service not available.");
                // }

                var oModel = this.base.getExtensionAPI().getModel();
        
                if (!oModel) {
                    console.error('Model is not available.');
                    return;
                }
        
                var sServiceUrl;
                var oUserEmail = 'krishna.vamsi@peolsolutions.com';
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
                                    // oButton.setVisible(false);
                                    // oButton1.setEnabled(false);
                                }
                            }
    
                    }

                    debugger
                    const sUrl = window.location.href;
                    console.log("Current URL:", sUrl);

            const urlObj = new URL(sUrl);

            // Extract the path segment after the '#' symbol
            const hashSegment = urlObj.hash.substring(1); // Remove the leading '#'

            // Find the deptId parameter within the path segment
            const match = /Department\(deptId='([^']*)'/.exec(hashSegment);

    // Extract the deptId from the match result
            const depId = match ? match[1] : null;
            debugger
            if(depId !== depuserid){
                this.getView().findAggregatedObjects(true, function (control) {
                    return control.isA("sap.m.Button");
                }).forEach(function (oButton) {
                    if (oButton.getId().includes("Delete")) {
                        oButton.setVisible(false);
                    }
                    else if (oButton.getId().includes("Edit")){
                        oButton.setEnabled(false);
                    }
                });
            }

            // Return the deptId if found, otherwise return null
                    // if (aDepartments && aDepartments.length > 0) {
                    //     // for (let dept of aDepartments) {
                    //         // console.log(`Processing Department: ${dept.deptId}`);
                    //         // if(dept.Email !== oUserEmail){
                    //         if('D2' !== depId){
                    //             oButton.setVisible(false);
                    //             oButton1.setEnabled(false);
                    //         }
                    //     // }

                    // }
                } 
                catch (error) {
                    console.error('Error fetching data', error);
                }
                
                // var oUser = 'krishna.vamsi@peolsolutions.com'; 
				// console.log(oUser);
				// if (oUser !== 'krishna.vamsi@peolsolutions.com') {
                //     debugger
                //     if (aDepartments && aDepartments.length > 0) {
                //         for(let dept of aDepartments){
                //         if(dept.deptId !== depuserid ){
                //             // oButton.setVisible(false);
                //             // oButton1.setEnabled(false);
                //         }
                //         }
                //     }
                // }

            }
		}
	});
});
