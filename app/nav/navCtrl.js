app.controller("navCtrl", function($scope, userSrv, $log, shoppingCartSrv, $location, $rootScope) {

    $scope.user = userSrv.getActiveUser();
    $scope.query = " ";
    $scope.productCount = 0;

    // $scope.filterProduct = function() {
    //     $location.path("/products");
    // }

    $scope.isLoggedIn = function() {
        return userSrv.isLoggedIn();
    }


    $scope.calcProductCount = function() {
        $scope.productCount = 0;
        if ($scope.shoppingCarts) {
            for (var i = 0; i < $scope.shoppingCarts.length; i++) {
                $scope.productCount += $scope.shoppingCarts[i].productQuantity;
            }
        }
        return $scope.productCount;
    }

    $scope.logout = function() {
        userSrv.logout();
        $scope.calcProductCount();
        $location.path("/");
    }

    $scope.getShoppingCart = function() {
        shoppingCartSrv.getShoppingCartPerUserID().then(function(shoppingCarts) {
            for (var i = 0; i < shoppingCarts.length; i++) {
                $scope.subtotal += shoppingCarts[i].productPrice * shoppingCarts[i].productQuantity;
            }
            $scope.productCount = $scope.calcProductCount();
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