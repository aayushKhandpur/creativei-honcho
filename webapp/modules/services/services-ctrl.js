//
creativei_app.controller("ServicesController", function ($scope,$state) {
    //  console.log(servObj);
    $scope.services = ["order"];
    //dummy comment
    $scope.selectService = function(service){

      switch (service) {
        case 'ORDER':
          $state.go('order.current');
          break;
        default:
          console.log("no state selected.");

      }

    };
});
