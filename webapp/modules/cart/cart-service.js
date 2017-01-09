creativei_app.factory('CartService', function($http){
  var cart = {};

  cart.addItem = function (){
    console.log("Item added to cart.");
    return {message: "Item added"};
  };

  cart.removeItem = function (){
    console.log("Item removed from cart.");

    return {message: "Item removed."};
  };

  return cart;
});
