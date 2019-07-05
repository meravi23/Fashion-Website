var app = angular.module("fashionDesignerApp", ["ngRoute", "ui.bootstrap", "ngImageInputWithPreview"]);

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
            templateUrl: "app/login/forgotpsw.html"
        }).when("/products/:category1/:category2", {
            templateUrl: "app/products/products.html",
            controller: "productsCtrl"
        }).when("/products/:id", {
            templateUrl: "app/products/productDetail.html",
            controller: "productDetailCtrl"
        }).when("/shoppingCart", {
            templateUrl: "app/shoppingCart/shoppingCart.html",
            controller: "shoppingCartCtrl"
        }).when("/checkout", {
            templateUrl: "app/checkout/checkout.html",
            controller: "checkoutCtrl"
        }).otherwise({
            templateUrl: "404.html"
        });
})