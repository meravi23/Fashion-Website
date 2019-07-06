app.controller("newProductCtrl", function($scope, productSrv, $log, $uibModalInstance, $rootScope) {
    $scope.product = {};

    $scope.availableSizes = ["34", "36", "38", "40", "42", "44", "46", "48"];

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

    $scope.addProduct = function() {
        $scope.categoryId = $rootScope.categoryId;
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