creativei_app.controller('CustomisationModalController', function($scope,$uibModalInstance,CartService,menuItem){
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

    $scope.menuItem = menuItem;                 //gets menu item from the menu-item-ctrl
    console.log(menuItem);
    console.log("Modal Opened at "+ new Date());

    console.log("Modal Opened at "+ new Date());    
    $scope.ok = function () {
      //function called on add to cart button
      $uibModalInstance.close({
                menuItemId : $scope.menuItemId,
                quantity : 1,
                custom: {spice:"mild", additional: "Dummy information"}
            });


    };

    $scope.cancel = function () {                   //function called on closing the modal via close button
      //send the status as false
      $uibModalInstance.dismiss();
    };
});
