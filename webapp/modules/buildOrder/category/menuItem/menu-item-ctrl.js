creativei_app.controller('MenuItemController', function($scope,$stateParams,$http){
    console.log("Inside menu item controller.");
    console.log($stateParams);
    $http.get('../../../../commons/JSONs/menuItem.json')
    .then(function(response){
        $scope.menuItems = response.data; 
        console.log(response.data);
    });
});
