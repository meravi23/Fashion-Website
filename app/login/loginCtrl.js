app.controller("loginCtrl", function($scope, $location, userSrv, $log, $rootScope) {

    $scope.invalidLogin = false;
    $scope.confirmPswInvalid = false;

    $scope.login = function() {
        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/");
        }, function(err) {
            $scope.invalidLogin = true;
        });

    }

    $scope.register = function() {
        if (($scope.regPwd !== " ") && ($scope.regPwd2 !== " ") && ($scope.regPwd !== $scope.regPwd2)) {
            $scope.confirmPswInvalid = true;
        } else {
            userSrv.addUserbyEmailPsw($scope.regEmail, $scope.regPwd).then(function(activeUser) {
                $log.info("Successful register with: " + JSON.stringify(activeUser));
                $rootScope.regEmail = $scope.regEmail;
                $rootScope.regPwd = $scope.regPwd;
                $rootScope.userId = activeUser.id;
                $location.path("login/registration");
            }, function(err) {
                $scope.invalidLogin = true;
            });
        }
    }

})