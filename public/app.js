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

