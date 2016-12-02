'use strict';
creativei_app.controller('CurrentOrdersController', function($scope){
  console.log("Inside current orders controller.");
    
    
    //my changes
    //filter implementation
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
    //end filter implementation
    //dummy json for tables
    $scope.tables = [
    {
        "tableNo": 1,
        "tableOccupancy": 4,
        "isAvailable": false,
        "tableStatus": "Table",
        "tableOccupiedDuration": "1:30Hrs"
    },
    {
        "tableNo": 2,
        "tableOccupancy": 4,
        "isAvailable": true,
        "tableStatus": null,
        "tableOccupiedDuration": null
    },
    {
        "tableNo": 3,
        "tableOccupancy": 4,
        "isAvailable": false,
        "tableStatus": "Table",
        "tableOccupiedDuration": "1:30Hrs"
    },
    {
        "tableNo": 4,
        "tableOccupancy": 4,
        "isAvailable": true,
        "tableStatus": null,
        "tableOccupiedDuration": null
    },
        {
        "tableNo": 5,
        "tableOccupancy": 4,
        "isAvailable": true,
        "tableStatus": null,
        "tableOccupiedDuration": null
    },
    {
        "tableNo": 6,
        "tableOccupancy": 4,
        "isAvailable": true,
        "tableStatus": null,
        "tableOccupiedDuration": null
    }
]
});
