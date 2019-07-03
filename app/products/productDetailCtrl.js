app.controller("productDetailCtrl", function($scope, $log, productSrv, $routeParams, shoppingCartSrv, $location) {

    $scope.product = {};
    $scope.id = $routeParams.id;
    $scope.productColorTmp = " ";
    $scope.productSizeTmp = " ";
    $scope.productQuantityTmp = 1;

    productSrv.getProductbyID($routeParams.id).then(function(product) {
        $scope.product = product;
    }, function(err) {
        $log.error(err);
    });

    $scope.addProducToShoppingCart = function() {
        var shoppingCart = {};
        shoppingCart.productPrice = $scope.product.price;
        shoppingCart.productID = $scope.id;
        shoppingCart.productQuantity = $scope.productQuantityTmp;
        shoppingCart.productSize = $scope.productSizeTmp.toString();
        shoppingCart.productColor = $scope.productColorTmp;
        shoppingCartSrv.addProducToShoppingCart(shoppingCart).then(function(shoppingCart) {
                console.log(shoppingCart);
            },
            function(err) {
                $log.error(err);
            });
    }

    $scope.setSizeOfProduct = function(size) {
        $scope.productSizeTmp = size;
        console.log(size);
    }

    $scope.setColorOfProduct = function(color) {
        $scope.productColorTmp = color;
    }
});