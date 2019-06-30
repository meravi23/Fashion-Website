app.controller("navCtrl", function($scope, userSrv, $log) {

    $scope.user = userSrv.getActiveUser();

    $scope.isLoggedIn = function() {
        return userSrv.isLoggedIn();
    }

    $scope.logout = function() {
        userSrv.logout();
        $location.path("/");
    }
})