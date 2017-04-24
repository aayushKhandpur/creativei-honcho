'use strict';
creativei_app.controller('CurrentOrdersController', function($scope,$http, $state, $localStorage, RestaurantTables){
  console.log("Inside current orders controller.");


    //my changes
    //filter implementation
    $scope.tables = RestaurantTables;
    $localStorage.currentTable = "";
    $scope.tableFilterOptions = ['All', 'Available', 'Occupied'];
    $scope.tableFilter = $scope.tableFilterOptions[0];
    $scope.tableFilterFunction = function (element) {
        if ($scope.tableFilter == 'All') {
            return true;
        } else if ($scope.tableFilter == 'Occupied') {
            if (element.isAvailable) {
                return false;
            } else {
                return true;
            }
        } else if ($scope.tableFilter == 'Available') {
            if (element.isAvailable) {
                return true;
            } else {
                return false;
            }
}
    };
    $scope.assign = function(tableNumber){
      $localStorage.currentTable = tableNumber;
      $state.go('buildOrder.menuItem');
    }
    //end filter implementation
    //dummy json for tables
    // $http.get("../../../commons/JSONs/tableStatus.json")
    // .then(function(response) {
    //     $scope.tables = response.data;
    // });
});
