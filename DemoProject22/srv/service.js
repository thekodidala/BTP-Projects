module.exports = async function (params) {
    let {
        college
    } = this.entities;
    this.before('READ', college, async (req) => {
        
        console.log('Hello SAP..');
        // var TEST_DEST2 = await cds.connect.to("MM_DEV");
        // var result1 = await TEST_DEST2.get(`/sap/opu/odata/sap/Z_ODATA_CREATE_PO_22_SRV/po_headerSet?$filter=(po eq '3000000010')`);
        // console.log(result1);
    });
    
    this.before('CREATE', college, async (req) => {
        debugger
        req.data.collegeName = 'SRM';
        console.log('RECORD CREATED');
        

    });
    this.before('UPDATE', college, async (req) => {
        console.log('RECORD UPDATED');

    });
    this.before('DELETE', college, async (req) => {
        debugger
        console.log('RECORD DELETED');
    });




}
