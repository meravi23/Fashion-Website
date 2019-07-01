app.controller("shoppingCartCtrl", function($scope, $location, userSrv, productSrv, shoppingCartSrv, $log) {

    $scope.shoppingCarts = [];
    $shoppingCartIsEmpty = false;
    $scope.subtotal = 0;
    $scope.shippingRate = 15;
    $scope.subtotalTemp = 0;

    shoppingCartSrv.getShoppingCartPerUserID().then(function(shoppingCarts) {
        $scope.shoppingCarts = shoppingCarts;
        $scope.recalculateCart();
    }, function(err) {
        console.error(err);
    });

    $scope.removeProductfromCart = function(shoppingCart) {
        userSrv.removeProductfromCart(shoppingCart).then(function(shoppingCarts) {
            $scope.shoppingCarts = shoppingCarts;
            $scope.recalculateCart();
        }, function(err) {
            console.error(err);
        });
    }

    $scope.updateProductQuantityInCart = function(shoppingCart) {
        shoppingCartSrv.updateShoppingCartQuantity(shoppingCart, productQuantity).then(function(shoppingCarts) {
            $scope.shoppingCarts = shoppingCarts;
            $scope.recalculateCart();
        }, function(err) {
            console.error(err);
        });
    }

    $scope.recalculateCart = function() {
        $scope.subtotal = 0;
        if ($scope.shoppingCarts.length > 0) {
            $shoppingCartIsEmpty = true;
            for (var i = 0; i < $scope.shoppingCarts.length; i++) {
                $scope.subtotal += $scope.shoppingCarts[i].productPrice * $scope.shoppingCarts[i].productQuantity;
            }
        }
        return $scope.subtotal;
    }

})