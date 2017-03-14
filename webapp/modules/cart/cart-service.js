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
    if(!$rootScope.runningOrders[tableId].items.hasOwnProperty(menuItemKey)){
      $rootScope.runningOrders[tableId].items[menuItemKey] = getOrderItemFromMenuItem(menuItem);
    }else{
      updateOrderItemQuantity(menuItem, tableId);
    }
    return {message: "Item added", item:menuItem };
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
    $rootScope.runningOrders[tableId].items[menuItem.id]["quantity"]= menuItem.quantity;
    $rootScope.runningOrders[tableId].items[menuItem.id]["rate"]= menuItem.price;
    $rootScope.runningOrders[tableId].items[menuItem.id]["price"]=menuItem.price*menuItem.quantity;
    if($rootScope.runningOrders[tableId].items[menuItem.id]["quantity"] == 0){
      $rootScope.runningOrders[tableId].items.splice(menuItem.id, 1);
    }
  }

  return cart;
});
