sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("lecturerApprovalUI.workflowuimodule.controller.App", {
      onInit() {
      },

      onBeforeRendering: function (oEvent) {
        debugger
        console.log('Entered');
        setTimeout(function () {

          var Id = this.oView.mAggregations.content[0].mAggregations.pages[0].mAggregations.content[0]._aElements[2].mProperties.value;
          var sUrl = `https://5293d840trial-dev-collegeproject-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files?$filter=(lectId eq '${Id}')`;
          $.ajax({
            url: sUrl,
            method: "GET",
            contentType: "application/json",
            success: function (oData) {

              sap.m.MessageToast.show("Files retrieved successfully");
              console.log("Retrieved files:", oData.value);
              var oUploadSet = this.byId("uploadSet");

              oData.value.forEach(function (file) {
                var oUploadSetItem = new sap.m.upload.UploadSetItem({
                  fileName: file.fileName,
                  mediaType: file.mediaType,
                  url: "https://5293d840trial-dev-collegeproject-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/" + file.url,
                  visibleEdit: false,
                  visibleRemove: false,

                });

                oUploadSetItem.addAttribute(new sap.m.ObjectAttribute({
                  title: "Uploaded By",
                  text: file.createdBy
                }));
                oUploadSetItem.addAttribute(new sap.m.ObjectAttribute({
                  title: "Uploaded on",
                  text: file.createdAt
                }));
                oUploadSetItem.addAttribute(new sap.m.ObjectAttribute({
                  title: "File Size",
                  text: file.size
                }));

                oUploadSet.addItem(oUploadSetItem);
              });

            }.bind(this),
            error: function (err) {
              sap.m.MessageToast.show("Error fetching files");
              console.log("Error fetching files:", err);
            }
          });
        }.bind(this), 1000)

      }

    });
  }
);
