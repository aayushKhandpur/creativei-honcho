//validate credetials
//fetch user role
//fetch restaurant info
//save restaurant info, user role, login info in rootscope
'use strict';
creativei_app.controller('AuthController', function($scope, $rootScope, AuthService,$state){
  console.log("Inside auth controller");

  $scope.login = function(){
    $scope.restaurant= AuthService.get().then(function(response){
      console.log(response.data.restaurant);
      $state.go('services');
    });
  }

});
