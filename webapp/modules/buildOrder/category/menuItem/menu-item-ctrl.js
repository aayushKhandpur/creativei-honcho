creativei_app.controller('MenuItemController', function ($scope, $filter, $uibModal, $stateParams
  , $http, $state, $localStorage, $anchorScroll, $location, CartService, _, categories, menuItems) {
    console.log("Inside menu item controller.");
    $scope.tableId = $localStorage.currentTable;
    $scope.order = $localStorage.runningOrders[$scope.tableId] || newOrder();
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
      if($localStorage.runningOrders
        && $localStorage.runningOrders[$scope.tableId]
        && $localStorage.runningOrders[$scope.tableId].items){
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
      var response = CartService.addItem(menuItem, $scope.order.items, $scope.tableId);
      if(response.cart && response.cart != ""){
        $scope.order.items = response.cart;
        $scope.subtotal = CartService.updateSubTotal($scope.order.items);
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
      var cartItem = _.find($scope.order.items, function(item){ return item.menuItemId === orderItem.menuItemId });
      if(cartItem){
        if(orderItem.quantity == 0){
          $scope.order.items.splice($scope.order.items.indexOf(cartItem), 1);
        }else {
          cartItem.quantity = orderItem.quantity;
          cartItem.price = orderItem.quantity * orderItem.rate;
        }
      }
      //CartService.updateItem(orderItem.menuItemId, orderItem.quantity, orderItem.rate, $scope.tableId);
      angular.forEach($scope.categories, function(category, key){
        angular.forEach(category.menuItems, function(menuItem, key){
          if(menuItem.id === orderItem.menuItemId){
            menuItem.quantity = orderItem.quantity;
          }
        });
      });
    //  $scope.cartItems = $rootScope.runningOrders[$scope.tableId].items;
      $scope.subtotal = CartService.updateSubTotal($scope.order.items);
    //if(orderItem.quantity == 0) delete $scope.cartItems[orderItem.id];
    };
    function syncMenuItemAndCartWithRoot(){
      var items = $localStorage.runningOrders[$scope.tableId].items;
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
      $scope.order.items = $localStorage.runningOrders[$scope.tableId].items;
      $scope.subtotal = CartService.updateSubTotal($scope.order.items);
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
    function newOrder(){
      return {
        table : $scope.tableId,
        orderId: null,
        user  : "",
        customize : "",
        spice :  "",
        items : []
      };
    }
    $scope.confirmOrder = function(){
        //sync localStorag
        if(!$localStorage.runningOrders) $localStorage.runningOrders = {};
        if(!$localStorage.runningOrders[$scope.tableId]){
      //    $scope.order.items = $scope.order.items;
          $localStorage.runningOrders[$scope.tableId] = $scope.order;
        }
      //  $localStorage.runningOrders[$scope.tableId].items = $scope.order.items;
        $state.go('buildOrder.trackOrder');
    }
});
