app.controller("productsCtrl", function($scope, $location, productSrv, $log, $routeParams, $uibModal, $rootScope) {

    $scope.products = [];
    $scope.query = " ";
    $scope.categoryGender = {
        "men": "1",
        "women": "2"
    };

    $scope.categoryType = {
        "outfits": "1",
        "t-shirts": "2",
        "jackets": "3",
        "jeans": "4",
        "shirts": "5",
        "accessories": "6",
        "watch": "7",
        "sunglass": "8",
        "cap": "9",
        "perfumes": "10"
    }


    $scope.categoryName = $routeParams.category1.toUpperCase() + "'S " + $routeParams.category2.toUpperCase();

    $scope.categoryId = $scope.categoryGender[$routeParams.category1] +
        $scope.categoryType[$routeParams.category2];
    $rootScope.categoryId = $scope.categoryId;

    productSrv.getProductbyCategoryID($scope.categoryId).then(function(products) {
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

    $scope.filterProduct = function(product) {
        // converting to lower case to do a case insensitive comparison
        if (product.name.toLowerCase().includes($scope.query.toLowerCase()) ||
            product.desc.toLowerCase().includes($scope.query.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    };

})