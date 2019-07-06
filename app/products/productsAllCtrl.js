app.controller("productsAllCtrl", function($scope, $location, productSrv, $log, $routeParams, $uibModal, $rootScope) {

    $scope.products = [];

    $scope.categoryName = "All Products";

    productSrv.getAllProducts().then(function(products) {
        $scope.products = products;
    }, function(err) {
        console.error(err);
    });

    $scope.openProductDetails = function(productID) {
        $location.path("/products/" + productID);
    };


    // function for opening the modal using UI Bootstrap
    $scope.openNewProductModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: "app/products/newProduct.html",
            controller: "newProductCtrl"
        });

        modalInstance.result.then(function(newProduct) {
            // this will wake in case the user added a new product
            $scope.recipes.push(newProduct);
        }, function() {
            // this will wake up in case the user canceled the new product
            console.log("User canceled new product");
        });
    }
    $scope.query = " ";
    $scope.query = $rootScope.query;
    $rootScope.query = " ";
    $scope.filterProduct = function(product) {
        // converting to lower case to do a case insensitive comparison
        if (product.name.toLowerCase().includes($scope.query.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    };

})