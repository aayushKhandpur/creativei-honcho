creativei_app.controller('MenuItemController', function ($scope, $uibModal,$stateParams,$http, CartService, _, categories, menuItems) {
    console.log("Inside menu item controller.");
    $scope.tableId = "1";
    $scope.categories = categories;
    $scope.selectedCategory = $scope.categories[0];
    console.log($scope.categories);
    $scope.menuItemList = [];
    if(menuItems.menuItem !== undefined){
      $scope.menuItemList = menuItems.menuItem;
      angular.forEach($scope.categories, function(category, key){
        var menuItems = _.where($scope.menuItemList, {categoryID: category.Id});
        category.menuItems = menuItems;
      });
    }
    $scope.cartItems = {};
    $scope.subtotal = 0;
    $scope.addItem = function(menuItem,type){
      var qty = 1;

      switch (type) {
        case "ADD":{
          menuItem.quantity+=qty;
        }
        break;
        case "REMOVE":{
          menuItem.quantity-=qty;
        }
        break;
        default:
          return;
      }
      var response = CartService.addItem(menuItem, $scope.tableId);
      if(response.item && response.item != ""){
        if($scope.cartItems[response.item.id] === undefined || $scope.cartItems[response.item.id] == null){
          $scope.cartItems[response.item.id] = menuItem;
        }else{
          $scope.cartItems[response.item.id].quantity = menuItem.quantity;
          if($scope.cartItems[response.item.id].quantity == 0){
            delete $scope.cartItems[response.item.id];
          }
        }
        var subtotal = 0;
        for (var item in $scope.cartItems) {
          subtotal += ($scope.cartItems[item].quantity * $scope.cartItems[item].price);
        }
        $scope.subtotal = subtotal;
      }
    }

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
