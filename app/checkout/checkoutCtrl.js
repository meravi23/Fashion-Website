app.controller("checkoutCtrl", function($scope, $log, $location, userSrv, shoppingCartSrv) {

    $scope.oneAtATime = true;

    $scope.status = {
        isCustomHeaderOpen: false,
    };

    $scope.placeOrder = function() {
        $location.path("/");
    }

    $scope.checkActiveUser = function() {
        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            return true;
        }, function(err) {
            return false;
        });
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

    $scope.calcProductCount = function() {
        $scope.productCount = 0;
        if ($scope.shoppingCarts) {
            for (var i = 0; i < $scope.shoppingCarts.length; i++) {
                $scope.productCount += $scope.shoppingCarts[i].productQuantity;
            }
        }
        return $scope.productCount;
    }


})