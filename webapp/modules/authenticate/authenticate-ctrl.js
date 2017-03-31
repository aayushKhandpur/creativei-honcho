//validate credetials
//fetch user role
//fetch restaurant info
//save restaurant info, user role, login info in rootscope
'use strict';
creativei_app.controller('AuthController', function($scope, $rootScope, AuthService,$state, $localStorage){
  console.log("Inside auth controller");
  $scope.$storage = $localStorage;
  $scope.authenticate = function(){
    if(!$scope.user || !$scope.user.userId || !$scope.user.password){
      console.log("Invalid credentials.");
    }else{
      $scope.restaurant= AuthService.get().then(function(response){
        if(response.data){
          if($scope.user.userId.toLowerCase() === response.data.userId
          && $scope.user.password === response.data.password){
            $rootScope.isAuthenticated = true;
            $scope.$storage.isAuthenticated = true;
            $scope.$storage.restaurant = response.data;
            $rootScope.restaurant=response.data;
            $state.go('services');
          }else{
            alert("Invalid credentials. Use admin\\admin")
            console.log("invalid credentials");
          }
        }else{
          console.log("invalid response");
        }

      });
    }

  }
  $scope.logout = function(){
    delete $rootScope.isAuthenticated
    delete $scope.$storage.isAuthenticated
    $state.go('login');
  }

});
