creativei_app.controller('MenuItemController', function ($scope, $rootScope, $filter, $uibModal,$stateParams,$http, CartService, _, categories, menuItems) {
    console.log("Inside menu item controller.");
    $scope.tableId = "1";
    $scope.categories = categories;
    $scope.selectedCategory = $scope.categories[0];
    $scope.cartSize = 0;
    console.log($scope.categories);
    $scope.menuItemList = [];
    $scope.cartItems =[];
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


    $scope.subtotal = 0;
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
        updateSubTotal();
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
      updateSubTotal();
      $scope.cartItems = $rootScope.runningOrders[$scope.tableId].items;
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
      updateSubTotal();
    }

    function updateSubTotal(){
      var subtotal = 0;
      for (var item in $scope.cartItems) {
        subtotal += ($scope.cartItems[item].quantity * $scope.cartItems[item].rate);
      }
      $scope.subtotal = subtotal;
    }
/*
    **************************************Unused code***************************************************
*/
    $scope.selectedMenuItem={};

    //condition for the category aside collapse
    $scope.isCollapsed = true;

    //selection and customisation modal js
    $scope.customiseDish = function (menuItem) {

      if(menuItem == undefined || menuItem === "")
        return "Error";

        $scope.selectedMenuItem = menuItem;
        var modalInstance = $uibModal.open({
            //to set this true, you will need to add ngAnimate module
            animation: false,
            backdrop: 'static',                                         //disables dismissing modal by clicking on backdrop
            templateUrl: 'modules/buildOrder/selectionAndCustomisation/customisationModal.view.html',
            controller: 'CustomisationModalController',
            size: 'md',
            resolve: {
              menuItem:function(){
              var menuItem =$scope.selectedMenuItem;
              return menuItem;
            }}
        });

        modalInstance.result.then(function (data) {
            console.log(data);
            CartService.addItem();
            // if(status){
            //     console.log('You clicked on add to cart');              //log when the modal is dismissed with add to cart button
            // }else{
            //     console.log('You clicked on close button');             //log when the modal is dismissed with close button
            // }
        }, function () {
            console.log('Modal dismissed at: ' + new Date());           //log when the modal is dismissed by clicking on the modal backdrop,set backdrop as true or false to enable
        });

        var categoryArr = ["Drinks","Lunch", "Dinner"];
        $scope.categoryFunct = function(){
          var html = "<h1>Hello</h1>";
          return $sce.trustAsHtml(html);

        }
    };
});
