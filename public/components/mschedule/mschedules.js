var app = angular.module("scheduleApp");


app.controller("scheduleController", function ($window, $scope, scheduleService, $filter, MaterialCalendarData, $http, mapservice) {


	function getSchedule() {
		scheduleService.getSchedule().then(function (response) {
			$scope.schedule = response;
		})
	}
	getSchedule();


	//map start

	function createMap(config) {
		$scope.map = config;
	};

	var config = {
		center: {
			latitude: 39.8282,
			longitude: -98.5795
		},
		zoom: 4
	};
	createMap(config);

	$scope.markers = [];

	function setMarkers(mapInfo) {
		$scope.markers.push({
			id: $scope.markers.length + 1,
			coords: {
				latitude: mapInfo.geometry.location.lat,
				longitude: mapInfo.geometry.location.lng,
			},
			window: {
				title: "Test"
			}
		});
		console.log($scope.markers);
	};

	$scope.createEvent = function (input) {

		// Get the Lat and Long of the location based on the name using the
		// maps API
		mapservice.getMapdata1(input.place.name)

			.then(function (mapResult) {
				input.place.lat = mapResult.results[0].geometry.location.lat;
				input.place.lng = mapResult.results[0].geometry.location.lng;
				setMarkers(mapResult.results[0]);
				var config = {
					center: {
						latitude: mapResult.results[0].geometry.location.lat,
						longitude: mapResult.results[0].geometry.location.lng
					},
					zoom: 14
				}

				createMap(config);
				return input;

			})
			// Save the event to the database
			.then(function (input) {
				return scheduleService.postSchedule(input)
			})
			// Update the calendar and view with new event
			.then(function (data) {
				$scope.schedule.push(data);
				MaterialCalendarData.setDayContent(
					new Date(data.date),
					`<small><p class="one">${data.event}</p></small>`
				);
				$scope.input = {};
			});
	}

	$scope.window = function () {
		$window.location.reload();

	}

	$scope.schedule = [];

	scheduleService.getSchedule().then(function (response) {
		$scope.schedule = response;
	});


	//caldendar start

	$scope.remove = function (index, id) {

		scheduleService.removeSchedule(id).then(function (response) {
			$scope.schedule.splice(index, 1);
			$window.location.reload();
		});
	}

	$scope.save = function (editItem) {
		scheduleService.saveSchedule(editItem).then(function (response) {
			$state.reload();
		});
	}

	$scope.dayFormat = "d";

	$scope.selectedDate = null;

	$scope.selectedDate = [];

	$scope.firstDayOfWeek = 0;

	$scope.setDirection = function (direction) {
		$scope.direction = direction;
		$scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
	};

	$scope.dayClick = function (date) {
		$scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
	};

	$scope.prevMonth = function (data) {
		$scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
	};

	$scope.nextMonth = function (data) {
		$scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
	};

	$scope.tooltips = true;

	$scope.setDayContent = function (date, content) {
		date = new Date(date)
		date = date.toString()

		return scheduleService.getScheduleContent(date).then(function (response) {
			if (!response.data) {
				return `<p></p>`
			}
			return `<small><p class="one">${response.data}</p></small>`;
		});
	};

	//	calendar end
});


app.filter("Event", function () {
	return function (info) {
		if (info === undefined) {
			return;
		}
		return 'Event: ' + info;
	}
});

app.filter("Place", function () {
	return function (info) {
		if (info === undefined) {
			return;
		}
		return 'Place: ' + info;
	}
});

app.filter("Date", function () {
	return function (info) {
		if (info === undefined) {
			return;
		}
		return 'Date: ' + info;
	}
});

app.filter("Stime", function () {
	return function (info) {
		if (info === undefined) {
			return;
		}
		return 'Start Time: ' + info;
	}
});

app.filter("Etime", function () {
	return function (info) {
		if (info === undefined) {
			return;
		}
		return 'End Time: ' + info;
	}
});

app.filter("Description", function () {
	return function (info) {
		if (info === undefined) {
			return;
		}
		return 'Description: ' + info;
	}
});

app.filter('removeCharacters', function () {
	return function (val, numberOfCharacters) {
		if (val === "Invalid Date") {
			return "The date was either not submitted or submitted incorrectly"
		}

		return val.slice(0, val.length - numberOfCharacters);
	}
})
