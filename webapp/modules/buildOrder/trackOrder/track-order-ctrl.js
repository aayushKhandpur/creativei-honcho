creativei_app.controller('OrderTrackerController', function ($scope, $rootScope, CartService) {
    console.log("Inside order tracker controller.");
    $scope.tableId = "1";
    $scope.cartItems = $rootScope.runningOrders[$scope.tableId].items;
    $scope.subtotal = CartService.updateSubTotal($scope.cartItems);
    
    
    
    //recommended item
    $scope.recommendedItems = [
        'Coke',
        'Fries',
        'Iced Tea',
        'Strawberry Smoothie',
        'Thumsup',
        'Grilled Sandwich',
        'Chicken Sandwich'
    ];
    
    $scope.addRecommendedItem = function(index){
        $scope.addedItem = $scope.recommendedItems.splice(index,1);
        console.log($scope.addedItem);
    }
});
