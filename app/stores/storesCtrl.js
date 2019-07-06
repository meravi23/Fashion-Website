app.controller("storesCtrl", function($scope, $sce) {

    $scope.address = "Nahal Arugot 5, Yokneam Illit, Israel";
    $scope.mapURL =
        $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyDYss1RsxvYgPMb80w568QggvjYoTojd6Q&q=" + $scope.address);

});