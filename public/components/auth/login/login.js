var app = angular.module("ScheduleApp.Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function (response) {
            $location.path("/mschedule");
        }, function (response) {
            alert(response.data.message);
        });
    }
}]);