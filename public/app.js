var app = angular.module("scheduleApp", ["ScheduleApp.Auth","ngRoute","ngMaterial","materialCalendar","uiGmapgoogle-maps"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
        })
        .when("/mschedule", {
            templateUrl: "components/mschedule/mschedules.html",
            controller: "scheduleController"
        })
});


app.config(function ($mdIconProvider, $$mdSvgRegistry) {
	// Add default icons from angular material
	$mdIconProvider
		.icon('md-close', $$mdSvgRegistry.mdClose)
		.icon('md-menu', $$mdSvgRegistry.mdMenu)
		.icon('md-toggle-arrow', $$mdSvgRegistry.mdToggleArrow);
});


app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {

	GoogleMapApiProviders.configure({
		china: true
	});
    }]);

//app.factory("Markers", function () {
//	var Markers = [
//		{
//			"id": "0",
//			"coords": {
//				"latitude": "45.5200",
//				"longitude": "-122.6819"
//			},
//			"window": {
//				"title": "Portland, OR"
//			}
//    },
//		{
//			"id": "1",
//			"coords": {
//				"latitude": "40.7903",
//				"longitude": "-73.9597"
//			},
//			"window": {
//				"title": "Manhattan New York, NY"
//			}
//    }
//  ];
//	return Markers;
//});