app.controller("productDetailCtrl", function($scope, $log, productSrv, $routeParams) {

    $scope.product = {};
    $scope.id = $routeParams.id;


    $routeScope.productPath


    productSrv.getProductbyID($routeParams.id).then(function(product) {
        $scope.product = product;
    }, function(err) {
        $log.error(err);
    });

    var productId = $scope.id;
    $scope.addProducToShoppingCart = function(productId, product) {

    }




});