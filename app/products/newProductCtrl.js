app.controller("newProductCtrl", function($scope, productSrv, $log, $uibModalInstance, $rootScope) {

    $scope.product = {};
    $scope.product.sizes = [36];
    $scope.product.colors = [" "];
    $scope.categoryGender = [
        "Men",
        "Women"
    ];

    $scope.categoryType = [
        "Outfits",
        "T-shirts",
        "Jackets",
        "Jeans",
        "Shirts",
        "Accessories",
        "Watch",
        "Sunglass",
        "Cap",
        "Perfumes"
    ];

    $scope.addSize = function() {
        var newSize = [36];
        $scope.product.sizes.push(newSize);
    }

    $scope.addColor = function() {
        var newColor = [" "];
        $scope.product.colors.push(newColor);
    }

    $scope.addProduct = function() {
        $scope.product.categoryID = ($scope.categoryGender.indexOf($scope.product.categoryGender) + 1).toString() +
            ($scope.categoryType.indexOf($scope.product.categoryType) + 1).toString();
        $scope.product.image = $scope.product.image.src;
        productSrv.addProduct($scope.product).then(function(newProduct) {
            $log.info("new product was added: " + JSON.stringify(newProduct));
            // Closing the modal
            $uibModalInstance.close(newProduct);
        });
    }

    $scope.cancelNewProduct = function() {
        $scope.name = "";
        $scope.desc = "";
        $scope.img = {};
        $scope.sizes = [];
        $scope.colors = [];
        $uibModalInstance.dismiss();
    }
    $scope.setSizeOfProduct = function(size) {
        $scope.productSizeTmp = size;
    }

})