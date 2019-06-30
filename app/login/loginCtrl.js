app.controller("loginCtrl", function($scope, $location, userSrv, $log) {

    $scope.invalidLogin = false;

    $scope.login = function() {
        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/");
        }, function(err) {
            $scope.invalidLogin = true;
        });

    }

    $scope.register = function() {
        $location.path("login/registration");
    }

})