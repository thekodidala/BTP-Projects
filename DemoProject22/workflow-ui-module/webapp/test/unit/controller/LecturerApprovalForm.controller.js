/*global QUnit*/

sap.ui.define([
	"lecturerApproval/workflow-ui-module/controller/LecturerApprovalForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("LecturerApprovalForm Controller");

	QUnit.test("I should test the LecturerApprovalForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
