app.controller("checkoutCtrl", function($scope, $log, $location, userSrv) {

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

})