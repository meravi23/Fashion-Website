app.controller("productsCtrl", function($scope, $location, productSrv, $log) {

    $scope.products = [];
    $scope.categoryId = "13";

    productSrv.getProductbyCategoryID($scope.categoryId).then(function(products) {
        $scope.products = products;
    }, function(err) {

    });

    $scope.openProductDetails = function(productID) {
        $location.path("/products/" + productID);
    };

    // var colorButton = $(".colors li");

    // colorButton.on("click", function() {
    //     // console.log('clicked');

    //     // Remove class from currently active button
    //     $(".colors > li").removeClass("active-color");

    //     // Add class active to clicked button
    //     $(this).addClass("active-color");

    //     // Get background color of clicked
    //     var newColor = $(this).attr("data-color");
    //     // alert(newColor);

    //     // Change background of everything with class .bg-color
    //     $(".merry-christmas").css("background-color", newColor);

    //     // Change color of everything with class .text-color
    //     // $(".text-color").css("color", newColor);
    // });


})