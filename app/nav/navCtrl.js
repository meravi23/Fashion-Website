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

    shoppingCartSrv.getShoppingCartPerUserID().then(function(shoppingCarts) {
        for (var i = 0; i < shoppingCarts.length; i++) {
            $scope.productCount += shoppingCarts[i].productQuantity;
            $scope.subtotal += shoppingCarts[i].productPrice * shoppingCarts[i].productQuantity;
        }
        $shoppingCarts = shoppingCarts;
    }, function(err) {
        console.error(err);
    });

})