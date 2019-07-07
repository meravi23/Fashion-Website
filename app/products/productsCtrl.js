app.controller("productsCtrl", function($scope, $location, productSrv, $log, $routeParams, $uibModal, userSrv, $rootScope) {

    $scope.userAdminSw = false;
    $scope.products = [];
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

    userSrv.getCurrentUser().then(function(current_user) {
        $scope.userAdminSw = current_user.adminsw;
    }, function(err) {
        console.error(err);
    });

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