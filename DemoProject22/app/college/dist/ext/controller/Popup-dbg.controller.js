sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('college.ext.controller.Popup', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf college.ext.controller.Popup
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI		
				alert('Welcome to Your Application!');
			}
			
		}
	});
});
