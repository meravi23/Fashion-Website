app.controller("shoppingCartCtrl", function($scope, $location, userSrv, productSrv, shoppingCartSrv, $log) {

    $scope.shoppingCarts = [];
    $shoppingCartIsEmpty = false;
    $scope.subtotal = 0;
    $scope.shippingRate = 15;
    $scope.subtotalTemp = 0;

    shoppingCartSrv.getShoppingCartPerUserID().then(function(shoppingCarts) {
        $scope.shoppingCarts = shoppingCarts;
        recalculateCart();
    }, function(err) {
        console.error(err);
    });

    $scope.removeItemFromCart = function(shoppingCart) {
        recalculateCart();
    }

    $scope.updateProductQuantityInCart = function(shoppingCart, productQuantity) {
        shoppingCartSrv.updateShoppingCartQuantity(shoppingCart, productQuantity).then(function(shoppingCarts) {
            $scope.shoppingCarts = shoppingCarts;
            recalculateCart();
        }, function(err) {
            console.error(err);
        });
    }

    function recalculateCart() {
        $scope.subtotal = 0;
        if ($scope.shoppingCarts.length > 0) {
            $shoppingCartIsEmpty = true;
            for (var i = 0; i < $scope.shoppingCarts.length; i++) {
                $scope.subtotal = $scope.shoppingCarts[i].linePrice;
            }
        }
        return $scope.subtotal;
    }

})