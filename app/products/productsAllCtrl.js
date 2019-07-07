app.controller("productsAllCtrl", function($scope, $location, userSrv, productSrv, $log, $routeParams, $uibModal) {

    $scope.products = [];
    $scope.userAdminSw = false;
    $scope.categoryName = "All Products";

    userSrv.getCurrentUser().then(function(current_user) {
        $scope.userAdminSw = current_user.adminsw;
    }, function(err) {
        console.error(err);
    });

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
            $scope.products.push(newProduct);
        }, function() {
            // this will wake up in case the user canceled the new product
            console.log("User canceled new product");
        });
    }


    $scope.filterProduct = function(product) {
        var query = "";
        if ($location.search().q) {
            query = $location.search().q;
        }

        // converting to lower case to do a case insensitive comparison
        if (product.name.toLowerCase().includes(query.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    };

})