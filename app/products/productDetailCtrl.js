app.controller("productDetailCtrl", function($scope, $log, productSrv, $routeParams) {

    $scope.product = {};
    $scope.id = $routeParams.id;

    productSrv.getProductbyID($routeParams.id).then(function(product) {
        $scope.product = product;
    }, function(err) {
        $log.error(err);
    });

});