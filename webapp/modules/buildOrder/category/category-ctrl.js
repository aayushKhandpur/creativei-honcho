creativei_app.controller('CategoryController', function($scope,$http){
  console.log("Inside category controller.");
    
    //dummy json for categories
    $http.get("../../../commons/JSONs/categories.json")
    .then(function(response){
        $scope.categories = response.data;
    });
    
    //availability check for category
    $scope.isAvailable = function(category){
       return category.isAvailable;
    };
});
