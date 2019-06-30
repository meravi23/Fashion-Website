app.controller("productsCtrl", function($scope, $location, productSrv, $log, $routeParams) {

    $scope.products = [];

    $scope.categoryGender = {
        "1": "men",
        "2": "women"
    };

    $scope.categoryType = {
        "1": "outfits",
        "2": "t-shirts",
        "3": "jackets",
        "4": "jeans",
        "5": "shirts",
        "6": "accessories",
        "7": "watch",
        "8": "sunglass",
        "9": "cap",
        "10": "perfumes"
    }

    Object.prototype.getKey = function(value) {
        for (var key in this) {
            if (this[key] == value) {
                return key;
            }
        }
        return null;
    };

    $scope.categoryName = $routeParams.category1.toUpperCase() + "'S " + $routeParams.category2.toUpperCase();

    $scope.categoryId = $scope.categoryGender.getKey($routeParams.category1) +
        $scope.categoryType.getKey($routeParams.category2);

    productSrv.getProductbyCategoryID($scope.categoryId).then(function(products) {
        $scope.products = products;
    }, function(err) {
        console.error(err);
    });

    $scope.openProductDetails = function(productID) {
        $location.path("/products/" + productID);
    };

    // var colorButton = $(".colors li");

    // colorButton.on("click", function() {
    //     // console.log('clicked');

    //     // Remove class from currently active button
    //     $(".colors > li").removeClass("active-color");

    //     // Add class active to clicked button
    //     $(this).addClass("active-color");

    //     // Get background color of clicked
    //     var newColor = $(this).attr("data-color");
    //     // alert(newColor);

    //     // Change background of everything with class .bg-color
    //     $(".merry-christmas").css("background-color", newColor);

    //     // Change color of everything with class .text-color
    //     // $(".text-color").css("color", newColor);
    // });


})