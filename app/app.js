var app = angular.module("fashionDesignerApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html"
        }).when("/login", {
            templateUrl: "app/login/login-register.html",
            controller: "loginCtrl"
        }).otherwise({
            templateUrl: "404.html"
        });

})