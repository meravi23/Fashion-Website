app.controller("registrationCtrl", function($scope, userSrv, $log, $rootScope, $location) {

    $scope.regEmail = $rootScope.regEmail;
    $scope.regPwd = $rootScope.regPwd;
    $scope.user = {};

    $scope.updateUser = function() {
        $scope.user.id = userSrv.getActiveUser().id;
        userSrv.updateUser($scope.user).then(function(activeUser) {
                $log.info("Successful register with: " + JSON.stringify(activeUser));
                $location.path("/");
            },
            function(err) {
                $scope.invalidLogin = true;
            });


    }
});