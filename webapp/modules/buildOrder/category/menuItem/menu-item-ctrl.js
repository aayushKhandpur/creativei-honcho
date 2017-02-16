creativei_app.controller('MenuItemController', function($scope,$stateParams,$http){
    console.log("Inside menu item controller.");
    console.log($stateParams);
    $http.get('../../../../commons/JSONs/menuCategory.json')
    .then(function(response){
        $scope.categories = response.data; 
        console.log(response.data);
    });
    $http.get('../../../../commons/JSONs/menuMenuItem.json')
    .then(function(response){
        $scope.menuItems = response.data; 
        console.log(response.data);
    });
    
    $scope.isCollapsed = true;
});
