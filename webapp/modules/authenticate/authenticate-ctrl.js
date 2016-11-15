'use strict';
creativei_app.controller('AuthController', function($scope, $rootScope, AuthService){
  console.log("Inside auth controller");

  $scope.login = function(){
    $scope.restaurant= AuthService.get().then(function(response){
      console.log(response);
    });
  }

});
