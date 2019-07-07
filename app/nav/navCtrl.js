app.controller("navCtrl", function($scope, userSrv, $log, shoppingCartSrv, $location) {

    $scope.user = userSrv.getActiveUser();
    $scope.query = "";
    if ($scope.user) {
        userSrv.getCurrentUser().then(function(current_user) {
            $scope.user = current_user;
        });
    }

    $scope.productCount = 0;

    $scope.filterProduct = function(query) {
        $location.path("/products").search({ q: query });
    }

    $scope.isLoggedIn = function() {
        return userSrv.isLoggedIn();
    }

    $scope.$on("addProduct", function() {
        $scope.getShoppingCart();
        $scope.recalculateCart();
    });

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

    // $scope.recalculateCart = function() {
    //     $scope.totalTemp = 0;
    //     if ($scope.shoppingCarts && $scope.shoppingCarts.length > 0) {
    //         for (var i = 0; i < $scope.shoppingCarts.length; i++) {
    //             $scope.totalTemp += $scope.shoppingCarts[i].productPrice * $scope.shoppingCarts[i].productQuantity;
    //         }
    //     }
    //     return $scope.totalTemp;
    // }

    $scope.checkout = function() {
        $location.path("/checkout");
    }

    $scope.recalculateCart = function() {
        $scope.subtotal = 0;
        if ($scope.shoppingCarts && $scope.shoppingCarts.length > 0) {
            $shoppingCartIsEmpty = true;
            for (var i = 0; i < $scope.shoppingCarts.length; i++) {
                $scope.subtotal += $scope.shoppingCarts[i].productPrice * $scope.shoppingCarts[i].productQuantity;
            }
        }
        return $scope.subtotal;
    }

    // $scope.isAdminUser = function() {
    //     userSrv.getCurrentUser().then(function(current_user) {
    //         return current_user.adminsw;
    //     });
    //     return false;
    // }

})