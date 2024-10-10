sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        create: function(oEvent) {
            MessageToast.show("Create method invoked.");
        },
        display: function() {
            MessageToast.show("Display method invoked.");
        }
    };
});
