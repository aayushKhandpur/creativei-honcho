creativei_app.controller('OrderTrackerController', function($scope, $rootScope, CartService){
  console.log("Inside order tracker controller.");
  $scope.tableId = "1";
  $scope.cartItems = $rootScope.runningOrders[$scope.tableId].items;
  $scope.subtotal = CartService.updateSubTotal($scope.cartItems);
});
