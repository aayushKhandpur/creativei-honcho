creativei_app.controller('OrderTrackerController', function($scope, $rootScope, $localStorage, CartService){
  console.log("Inside order tracker controller.");
  $scope.tableId = $localStorage.currentTable;
  $scope.cartItems = $localStorage.runningOrders[$scope.tableId].items;
  $scope.subtotal = CartService.updateSubTotal($scope.cartItems);


    $scope.countrySelected = function(selected) {
      if (selected) {
        window.alert('You have selected ' + selected.title);
      } else {
        console.log('cleared');
      }
    };

    $scope.focusState = 'None';
    $scope.focusIn = function() {
      var focusInputElem = document.getElementById('trackCartSearch_value');
      $scope.focusState = 'In';
      focusInputElem.classList.add('trackCartSearchFull');
    }
    $scope.focusOut = function() {
      var focusInputElem = document.getElementById('trackCartSearch_value');
      $scope.focusState = 'Out';
      focusInputElem.classList.remove('trackCartSearchFull');
    }

    $scope.menuItems = $localStorage.menuItemList;
    console.log($scope.menuItems);
});
