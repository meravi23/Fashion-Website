app.controller("dashboardCtrl", function($scope, userSrv, $log) {

    $scope.newUsers = 50;
    var data = [];
    $scope.labels = ["New Cars", "Old Cars"];
    $scope.options = {
        legend: {
            display: true
        }
    }

    $scope.getChartData = function() {
        var newCars = 0;
        var oldCars = 0;

        for (var i = 0; i < $scope.cars.length; i++) {
            if ($scope.cars[i].year > 2015) {
                newCars++;
            } else {
                oldCars++;
            }
        }

        data[0] = newCars;
        data[1] = oldCars;
        return data;
    }

})