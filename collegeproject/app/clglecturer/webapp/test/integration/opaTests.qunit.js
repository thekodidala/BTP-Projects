sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'clglecturer/test/integration/FirstJourney',
		'clglecturer/test/integration/pages/CollegeList',
		'clglecturer/test/integration/pages/CollegeObjectPage',
		'clglecturer/test/integration/pages/LectureObjectPage'
    ],
    function(JourneyRunner, opaJourney, CollegeList, CollegeObjectPage, LectureObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('clglecturer') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCollegeList: CollegeList,
					onTheCollegeObjectPage: CollegeObjectPage,
					onTheLectureObjectPage: LectureObjectPage
                }
            },
            opaJourney.run
        );
    }
);