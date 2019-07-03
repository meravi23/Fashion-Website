app.controller("productsCtrl", function($scope, $location, productSrv, $log, $routeParams) {

    $scope.products = [];

    $scope.categoryGender = {
        "men": "1",
        "women": "2"
    };

    $scope.categoryType = {
        "outfits": "1",
        "t-shirts": "2",
        "jackets": "3",
        "jeans": "4",
        "shirts": "5",
        "accessories": "6",
        "watch": "7",
        "sunglass": "8",
        "cap": "9",
        "perfumes": "10"
    }


    $scope.categoryName = $routeParams.category1.toUpperCase() + "'S " + $routeParams.category2.toUpperCase();

    $scope.categoryId = $scope.categoryGender[$routeParams.category1] +
        $scope.categoryType[$routeParams.category2];

    productSrv.getProductbyCategoryID($scope.categoryId).then(function(products) {
        $scope.products = products;
    }, function(err) {
        console.error(err);
    });

    $scope.openProductDetails = function(productID) {
        $location.path("/products/" + productID);
    };

})