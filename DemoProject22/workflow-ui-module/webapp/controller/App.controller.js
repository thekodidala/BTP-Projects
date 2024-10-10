sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("lecturerApproval.workflowuimodule.controller.App", {
        // onInit() {
        //   debugger

        // },

        onBeforeRendering: function(oEvent){
          debugger
          var Id = this.oView.mAggregations.content[0].mAggregations.pages[0].mAggregations.content[0]._aElements[2].mProperties.value
          var sUrl = `https://5293d840trial-dev-collegeproject-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files?$filter=(lectId eq '${Id}')`;
          $.ajax({
              url: sUrl,
              method: "GET",
              contentType: "application/json",
              success: function (oData) {
                  
                  sap.m.MessageToast.show("Files retrieved successfully");
                  console.log("Retrieved files:", oData.value); 
                  var oUploadSet = this.byId("uploadSet"); 

                    oData.value.forEach(function(file) {
                    var oUploadSetItem = new sap.m.upload.UploadSetItem({
                        fileName: file.fileName,
                        mediaType: file.mediaType,
                        url:"https://5293d840trial-dev-collegeproject-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/"+ file.url,
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
        
      },

      // onOpenPressed: async function (oEvent) {
      //     debugger
      //     console.log('inside on open pressed');
      //     // var baseUrl = oEvent.oSource.getModel().getServiceUrl();
      //     var baseUrl = 'https://5293d840trial-dev-demoproject22-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/';

      //     var sUrl = window.location.href;

      //     // Regular expression to capture the part of the URL starting with "/Files"
      //     var sPath = sUrl.match(/\/Files\([^)]+\)\/content/);

      //     if (sPath) {
      //         console.log("Extracted Path:", sPath[0]);
      //         oEvent.oSource.mProperties.url = baseUrl+sPath[0];
      //     } else {
      //         console.error("Path not found");
      //     }

      //     // var currentUrl =oEvent.oSource.mProperties.url;
      //     // let fileurl;
      //     // if (!currentUrl.startsWith(baseUrl)) {
      //     //         fileurl = baseUrl + oEvent.oSource.mProperties.url;
      //     //       }
      //     // else{
      //     //   fileurl = oEvent.oSource.mProperties.url;
      //     // }
      //           // var fileurl = baseUrl+oEvent.oSource.mProperties.url;
    
      //     // const sUrl = window.location.href;
      //     // console.log("Current URL:", sUrl);
      //     // const urlObj = new URL(sUrl);
      //     // const hashSegment = urlObj.hash.substring(1); 
      //     // const match = /student\(studentId='([^']*)',IsActiveEntity=(true|false)\)/.exec(hashSegment);
      //     // const isActiveEntity = match ? (match[2] === 'true') : null;
      //     // if( isActiveEntity === false){
      //     //   debugger
      //     //   oEvent.oSource.mProperties.url = fileurl.replace("true", "false")
      //     // }
      //     // else{
      //       // oEvent.oSource.mProperties.url = fileurl;
      //     // }
          
      //   }
      });
    }
  );
  