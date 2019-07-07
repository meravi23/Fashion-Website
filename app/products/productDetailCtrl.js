app.controller("productDetailCtrl", function($scope, $log, userSrv, productSrv, $routeParams, shoppingCartSrv, $location) {

    $scope.product = {};
    $scope.id = $routeParams.id;
    $scope.productColorTmp = " ";
    $scope.productSizeTmp = " ";
    $scope.productQuantityTmp = 1;
    $scope.userAdminSw = false;

    productSrv.getProductbyID($routeParams.id).then(function(product) {
        $scope.product = product;
    }, function(err) {
        $log.error(err);
    });

    userSrv.getCurrentUser().then(function(current_user) {
        $scope.userAdminSw = current_user.adminsw;
    }, function(err) {
        console.error(err);
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
    }

    $scope.setColorOfProduct = function(color) {
        $scope.productColorTmp = color;
    }

    $scope.deleteProduct = function(product) {
        productSrv.deleteProduct(product).then(function(res) {
            $location.path("/products");
        }, function(err) {
            $log.error(err);
        });

    }
});