creativei_app.controller('MenuItemController', function ($scope, $rootScope, $filter, $uibModal,
  $http, $state, $localStorage, $anchorScroll, $location, CartService, _, categories, menuItems) {
    console.log("Inside menu item controller.");
    $scope.tableId = "1";
    $scope.categories = categories;
    $scope.selectedCategory = $scope.categories[0];
    $scope.cartSize = 0;
    console.log($scope.categories);
    $scope.menuItemList = [];
    $scope.cartItems =[];
    //$scope.subtotal = CartService.updateSubTotal($scope.cartItems);
    if(menuItems.menuItem !== undefined){
      $scope.menuItemList = menuItems.menuItem;
      angular.forEach($scope.categories, function(category, key){
        var menuItems = _.where($scope.menuItemList, {categoryID: category.Id});
        category.menuItems = menuItems;
      });
      //sync cart and menu in case there is already an order
      if($rootScope.runningOrders
        && $rootScope.runningOrders[$scope.tableId]
        && $rootScope.runningOrders[$scope.tableId].items){
        syncMenuItemAndCartWithRoot();
      }
    }
    
    $localStorage.menuItemList = $scope.menuItemList;
    
    $scope.$watch('query.name', function(newValue, oldValue) {
      angular.forEach($scope.categories, function(category, key){
        var filteredMenu = $filter('filter')(category.menuItems, $scope.query);
        if(filteredMenu.length==0){
          category.visible = false;
        }else{
          category.visible = true;
        }
      });
    });



    //add or update menu item and sync order item in cart.
    $scope.addItem = function(menuItem,type){
      var qty = 1;
      switch (type) {
        case "ADD":{
          menuItem.quantity += qty;
        }
        break;
        case "REMOVE":{
          menuItem.quantity -= qty;
        }
        break;
        default:
          return;
      }
      //$rootScope.runningOrders[tableId].items
      var response = CartService.addItem(menuItem, $scope.tableId);
      if(response.item && response.item != ""){
        // if($scope.cartItems[response.item.id] === undefined || $scope.cartItems[response.item.id] == null){
        //   $scope.cartItems[response.item.id] = menuItem;
        // }else{
        //   $scope.cartItems[response.item.id].quantity = menuItem.quantity;
        //   if($scope.cartItems[response.item.id].quantity == 0){
        //     delete $scope.cartItems[response.item.id];
        //   }
        // }
        $scope.cartItems = $rootScope.runningOrders[$scope.tableId].items;
        $scope.subtotal = CartService.updateSubTotal($scope.cartItems);
      }
    };

        //update order item in cart and sync menu item menuItemId
    $scope.updateOrderItemAndSync = function(orderItem,type){
      var qty = 1;
      switch (type) {
        case "ADD":{
          orderItem.quantity += qty;
        }
        break;
        case "REMOVE":{
          orderItem.quantity -= qty;
        }
        break;
        default:
          return;
      }
      // update rootScope
      CartService.updateItem(orderItem.menuItemId, orderItem.quantity, orderItem.rate, $scope.tableId);
      angular.forEach($scope.categories, function(category, key){
        angular.forEach(category.menuItems, function(menuItem, key){
          if(menuItem.id === orderItem.menuItemId){
            menuItem.quantity = orderItem.quantity;
          }
        });
      });
      $scope.cartItems = $rootScope.runningOrders[$scope.tableId].items;
      $scope.subtotal = CartService.updateSubTotal($scope.cartItems);
    //if(orderItem.quantity == 0) delete $scope.cartItems[orderItem.id];
    };

    function syncMenuItemAndCartWithRoot(){
      var items = $rootScope.runningOrders[$scope.tableId].items;
      for(index in items){
        var orderItem = items[index];
        angular.forEach($scope.categories, function(category, key){
          angular.forEach(category.menuItems, function(menuItem, key){
            if(menuItem.id === orderItem.menuItemId){
              menuItem.quantity = orderItem.quantity;
            }
          });
        });
      }
      $scope.cartItems = $rootScope.runningOrders[$scope.tableId].items;
      $scope.subtotal = CartService.updateSubTotal($scope.cartItems);
    }

    //scroll function for the category dropdown
    $scope.gotoAnchor = function(x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash('anchor' + x);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
        }
    };

    $scope.$watch('selectedCategory',function(newValue,oldValue){
        console.log(newValue);
        $scope.gotoAnchor(newValue.Id);

    });

$scope.confirmOrder = function(){
        //sync localStorage
        $localStorage.runningOrders = $rootScope.runningOrders
        $state.go('buildOrder.trackOrder');
    }
});
