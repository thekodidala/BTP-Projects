/*global QUnit*/

sap.ui.define([
	"lecturerApprovalUI/workflow-ui-module/controller/LecturerApprovalTaskUI.controller"
], function (Controller) {
	"use strict";

	QUnit.module("LecturerApprovalTaskUI Controller");

	QUnit.test("I should test the LecturerApprovalTaskUI controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
