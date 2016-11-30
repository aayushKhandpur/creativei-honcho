'use strict';
creativei_app.controller('CurrentOrdersController', function($scope){
  console.log("Inside current orders controller.");
    
    
    //my changes
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
        "isAvailable": false,
        "tableStatus": "Table",
        "tableOccupiedDuration": "1:30Hrs"
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
        "tableStatus": "null",
        "tableOccupiedDuration": "null"
    },
        {
        "tableNo": 5,
        "tableOccupancy": 4,
        "isAvailable": false,
        "tableStatus": "Table",
        "tableOccupiedDuration": "1:30Hrs"
    },
    {
        "tableNo": 6,
        "tableOccupancy": 4,
        "isAvailable": true,
        "tableStatus": "null",
        "tableOccupiedDuration": "null"
    }
]
});
