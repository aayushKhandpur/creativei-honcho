creativei_app.factory('CartService', function($http, $rootScope){
  var cart = {};

  cart.initializeOrder = function (){
    if($rootScope.runningOrders === undefined )
      $rootScope.runningOrders = {};
    // TODO call server to fetch current running orders
  };

  cart.addItem = function (menuItem, tableId){
    console.log("Item added to cart.");
    if(angular.isUndefined($rootScope.runningOrders) || $rootScope.runningOrders === null)
      cart.initializeOrder();
    if(!$rootScope.runningOrders.hasOwnProperty(tableId))
      $rootScope.runningOrders[tableId] = getOrderTemplate(tableId);
    var menuItemKey =menuItem.id;
    if(!$rootScope.runningOrders[tableId].hasOwnProperty(menuItemKey)){
      $rootScope.runningOrders[tableId].items.push(getOrderItemFromMenuItem(menuItem));
    }else{
      updateOrderItemQuantity();
    }

    return {message: "Item added", item:$rootScope.runningOrders[tableId] };
  };

  cart.removeItem = function (){
    console.log("Item removed from cart.");

    return {message: "Item removed."};
  };
  cart.getItem = function (itemId){
    console.log("Item not found in cart.");

    return {};
  };

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
  function updateOrderItemQuantity(menuItem,tableId){
    $rootScope.runningOrders[tebleId][menuItem.id]["quantity"]= menuItem.quantity;
    $rootScope.runningOrders[tebleId][menuItem.id]["rate"]= menuItem.price;
    $rootScope.runningOrders[tebleId][menuItem.id]["price"]=menuItem.price*menuItem.quantity;
  }

  return cart;
});
