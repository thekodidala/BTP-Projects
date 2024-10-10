sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'collegeregapp/test/integration/FirstJourney',
		'collegeregapp/test/integration/pages/collegeList',
		'collegeregapp/test/integration/pages/collegeObjectPage',
		'collegeregapp/test/integration/pages/departmentObjectPage'
    ],
    function(JourneyRunner, opaJourney, collegeList, collegeObjectPage, departmentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('collegeregapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThecollegeList: collegeList,
					onThecollegeObjectPage: collegeObjectPage,
					onThedepartmentObjectPage: departmentObjectPage
                }
            },
            opaJourney.run
        );
    }
);