creativei_app.controller('CustomisationModalController', function($scope,$uibModalInstance,CartService,menuItemId){
    console.log("Inside customisation modal controller.");
   
    //quantity control
    $scope.itemQuantity = 1;
    $scope.increaseQuantity = function(){
        return $scope.itemQuantity++;
    };
    $scope.decreaseQuantity = function(){
        if($scope.itemQuantity == 1){
            return;
        }else{
            return $scope.itemQuantity--;
        }
    };
    //quantity control
    
    $scope.menuItemId = menuItemId;                 //gets menu item id from the menu-item-ctrl
    console.log("Modal Opened at "+ new Date());
    
    $scope.ok = function () {                       //function called on add to cart button
      CartService.addItem();
      //send the status as true
      $uibModalInstance.close( true );
    };

    $scope.cancel = function () {                   //function called on closing the modal via close button
      //send the status as false
      $uibModalInstance.close( false );
    }; 
});
