var app = angular.module("ScheduleApp.Auth");

app.controller("LogoutController", ["UserService", function (UserService) {  
    UserService.logout();
}]);