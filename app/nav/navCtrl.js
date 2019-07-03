app.controller("navCtrl", function($scope, userSrv, $log, shoppingCartSrv) {

    $scope.user = userSrv.getActiveUser();
    $scope.productCount = 0;

    $scope.isLoggedIn = function() {
        return userSrv.isLoggedIn();
    }

    $scope.logout = function() {
        userSrv.logout();
        $location.path("/");
    }

    $scope.getShoppingCart = function() {
        shoppingCartSrv.getShoppingCartPerUserID().then(function(shoppingCarts) {
            for (var i = 0; i < shoppingCarts.length; i++) {
                $scope.productCount += shoppingCarts[i].productQuantity;
                $scope.subtotal += shoppingCarts[i].productPrice * shoppingCarts[i].productQuantity;
            }
            $scope.shoppingCarts = shoppingCarts;
        }, function(err) {
            console.error(err);
        });
    }

    $scope.recalculateCart = function() {
        $scope.totalTemp = 0;
        if ($scope.shoppingCarts && $scope.shoppingCarts.length > 0) {
            for (var i = 0; i < $scope.shoppingCarts.length; i++) {
                $scope.totalTemp += $scope.shoppingCarts[i].productPrice * $scope.shoppingCarts[i].productQuantity;
            }
        }
        return $scope.totalTemp;
    }

})