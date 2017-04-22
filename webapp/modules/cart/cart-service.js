creativei_app.factory('CartService', function($http, $rootScope, $localStorage, _ ){
  var cart = {};
  cart.initializeOrder = function (){
    if($rootScope.runningOrders === undefined )
      $rootScope.runningOrders = {};
    // TODO call server to fetch current running orders
  };
  /*
  *To add a menu item to the cart. Returns the
  */
  cart.addItem = function(menuItem, cartItems, tableId){
    console.log("Item added to cart.");
    var menuItemKey =menuItem.id;
    //find if item already exists in the cart
     var cartItem = _.find(cartItems, function(item){ return item.menuItemId === menuItemKey });
     if(cartItem){
       if(menuItem.quantity == 0){
         cartItems.splice(cartItems.indexOf(cartItem), 1);
       }else {
         cartItem.quantity = menuItem.quantity;
         cartItem.price = menuItem.quantity * menuItem.price;
       }
     }else{
        cartItem = getOrderItemFromMenuItem(menuItem);
        cartItems.push(cartItem);
     }
     //return update cart
     return {message: "Item added", cart: cartItems };
  };

  /*cart.addItem = function (menuItem, tableId){
    console.log($localStorage);
    console.log("Item added to cart.");
    if(angular.isUndefined($rootScope.runningOrders) || $rootScope.runningOrders === null)
      cart.initializeOrder();
    if(!$rootScope.runningOrders.hasOwnProperty(tableId))
      $rootScope.runningOrders[tableId] = getOrderTemplate(tableId);
    var menuItemKey =menuItem.id;
    var itemIndex = findItemIndex(menuItemKey, tableId);
    if(itemIndex == -1){
      $rootScope.runningOrders[tableId].items.push(getOrderItemFromMenuItem(menuItem));
    }else{
      updateOrderItemQuantity(itemIndex, menuItem.quantity, menuItem.price, tableId);
      console.log($localStorage);
    }
    return {message: "Item added", item:menuItem };
  };*/
  cart.updateItem = function(menuItemKey, quantity, price, tableId){
    updateOrderItemQuantity(findItemIndex(menuItemKey, tableId), quantity, price, tableId);
  };

  cart.removeItem = function (){
    console.log("Item removed from cart.");

    return {message: "Item removed."};
  };
  cart.getItem = function (itemId){
    console.log("Item not found in cart.");

    return {};
  };
  cart.updateSubTotal = function(cartItems){
    var subtotal = 0;
    for (var item in cartItems) {
      subtotal += (cartItems[item].quantity * cartItems[item].rate);
    }
    return subtotal;
  }
  function updateSubTotal(){
    var subtotal = 0;
    for (var item in $scope.cartItems) {
      subtotal += ($scope.cartItems[item].quantity * $scope.cartItems[item].rate);
    }
    $scope.subtotal = subtotal;
  }

  function findItemIndex(menuItemKey, tableId){
    for(var itemId in $rootScope.runningOrders[tableId].items){
      if($rootScope.runningOrders[tableId].items[itemId].menuItemId == menuItemKey){
        return itemId;
      }
    }
    return -1;
  }
  function getOrderTemplate(tableId){
    var order = {
      table : tableId,
      orderId: null,
      user  : "",
      customize : "",
      spice :  "",
      items : []
    };
    return order;
  }

  function getOrderItemFromMenuItem(menuItem){
    var orderItem = {
      menuItemId: menuItem.id,
      name: menuItem.name,
      quantity: menuItem.quantity,
      isVeg: menuItem.isVeg,
      rate: menuItem.price,
      price: menuItem.price * menuItem.quantity
    };
    return orderItem;
  }
  function updateOrderItemQuantity(itemId, quantity, price, tableId){
    console.log($localStorage);
        $rootScope.runningOrders[tableId].items[itemId]["quantity"]= quantity;
        $rootScope.runningOrders[tableId].items[itemId]["rate"]= price;
        $rootScope.runningOrders[tableId].items[itemId]["price"]=price * quantity;
        if($rootScope.runningOrders[tableId].items[itemId]["quantity"] == 0){
          $rootScope.runningOrders[tableId].items.splice(itemId,1);
        }
  }
  return cart;
});
