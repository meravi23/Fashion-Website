var app = angular.module("fashionDesignerApp", ["ngRoute"
    /*, "ngImageInputWithPreview", "ngAnimate", "ngTouch", "ui.bootstrap"*/
]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html"
        }).when("/login", {
            templateUrl: "app/login/login-register.html",
            controller: "loginCtrl"
        }).when("/login/registration", {
            templateUrl: "app/login/registration.html",
            controller: "registrationCtrl"
        }).when("/login/forgetPassword", {
            templateUrl: "app/login/forgotPassword.html"
        }).when("/products", {
            templateUrl: "app/products/products.html",
            controller: "productsCtrl"
        }).when("/products/:id", {
            templateUrl: "app/products/productDetail.html",
            controller: "productDetailCtrl"
        }).when("/shoppingCart", {
            templateUrl: "app/shoppingCart/shoppingCart.html",
            controller: "shoppingCartCtrl"
        }).otherwise({
            templateUrl: "404.html"
        });
})