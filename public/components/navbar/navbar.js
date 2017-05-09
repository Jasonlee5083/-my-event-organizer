// components/navbar/navbar.js

var app = angular.module("scheduleApp");

app.directive("navbar", ["UserService", function(UserService) {  
    return {
        templateUrl: "components/navbar/navbar.html",
        link: function(scope) {
            scope.userService = UserService;
        }
    }
}]);