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
      updateOrderItemQuantity(menuItem.id, menuItem.quantity, menuItem.price, tableId);
    }
    return {message: "Item added", item:menuItem };
  };

  cart.updateItem = function(id, quantity, price, tableId){
    updateOrderItemQuantity(id, quantity, price, tableId);
  }

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
  function updateOrderItemQuantity(id, quantity, price, tableId){
    $rootScope.runningOrders[tableId].items[id]["quantity"]= quantity;
    $rootScope.runningOrders[tableId].items[id]["rate"]= price;
    $rootScope.runningOrders[tableId].items[id]["price"]=price * quantity;
    if($rootScope.runningOrders[tableId].items[id]["quantity"] == 0){
      $rootScope.runningOrders[tableId].items.splice(id, 1);
    }
  }

  return cart;
});
