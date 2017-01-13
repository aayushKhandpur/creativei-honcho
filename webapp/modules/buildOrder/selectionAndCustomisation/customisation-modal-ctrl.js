creativei_app.controller('CustomisationModalController', function($scope,$uibModalInstance){
    console.log("Inside customisation modal controller.");
    console.log("Modal Opened at "+ new Date());
    $scope.ok = function () {                       //function called on add to cart button
      //send the status as true
      $uibModalInstance.close( true );
    };

    $scope.cancel = function () {                   //function called on closing the modal via close button
      //send the status as false
      $uibModalInstance.close( false );
    }; 
});
