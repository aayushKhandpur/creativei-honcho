creativei_app.factory('CartService', function($http, $rootScope){
  var cart = {};

  cart.addItem = function (menuItem, tableId){

    console.log("Item added to cart.");
    if($rootScope.runningOrders === undefined )
      $rootScope.runningOrders = {};
    if(angular.isUndefined($rootScope.runningOrders[tebleId]))
      $rootScope.runningOrders[tebleId] = {};
    if(angular.isUndefined($rootScope.runningOrders[tebleId][menuItem.id])){
      $rootScope.runningOrders[tebleId][menuItem.id] = {
                                                          name: menuItem.name,
                                                          quantity: menuItem.quantity,
                                                          isVeg: menuItem.isVeg,
                                                          rate: menuItem.price,
                                                          price: menuItem.price*menuItem.quantity
                                                        };
    }else{
      $rootScope.runningOrders[tebleId][menuItem.id]["quantity"]= menuItem.quantity;
      $rootScope.runningOrders[tebleId][menuItem.id]["rate"]= menuItem.price;
      $rootScope.runningOrders[tebleId][menuItem.id]["price"]=menuItem.price*menuItem.quantity;
    }

    return {message: "Item added", item:$rootScope.runningOrders[tebleId] };
  };

  cart.removeItem = function (){
    console.log("Item removed from cart.");

    return {message: "Item removed."};
  };
  cart.getItem = function (itemId){
    console.log("Item not found in cart.");

    return {};
  };

  return cart;
});
