//
creativei_app.controller("ServicesController", function ($scope,$state) {
    //  console.log(servObj);
    $scope.services = ["order"];
    //dummy comment
    $scope.selectOrderService = function(){
      $state.go('order.current');  
    };
});