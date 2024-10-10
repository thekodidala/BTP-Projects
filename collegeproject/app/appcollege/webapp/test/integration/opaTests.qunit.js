sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'appcollege/test/integration/FirstJourney',
		'appcollege/test/integration/pages/DepartmentList',
		'appcollege/test/integration/pages/DepartmentObjectPage',
		'appcollege/test/integration/pages/LectureObjectPage'
    ],
    function(JourneyRunner, opaJourney, DepartmentList, DepartmentObjectPage, LectureObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('appcollege') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDepartmentList: DepartmentList,
					onTheDepartmentObjectPage: DepartmentObjectPage,
					onTheLectureObjectPage: LectureObjectPage
                }
            },
            opaJourney.run
        );
    }
);