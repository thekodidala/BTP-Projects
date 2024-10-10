/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"lecturerApprovalUI/workflow-ui-module/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
