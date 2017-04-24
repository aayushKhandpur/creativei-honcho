var creativei_app= angular.module("creativei_app",['ui.router','ngStorage','ui.bootstrap','ngAnimate', 'angucomplete-alt'])
creativei_app.constant('_',
    window._
);

creativei_app.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('services', {
      url: '/services',
      templateUrl: 'modules/services/services.view.html',
      controller: 'ServicesController',

    })
    .state('order', {
      url: '/order',
      templateUrl: 'modules/order/order.view.html',
      controller: 'OrderController',
      abstract: true
    })
    .state('order.current', {
      url: '/current',
      templateUrl: 'modules/order/current/currentOrders.view.html',
      controller: 'CurrentOrdersController',
      resolve:{
        RestaurantTables :function($http){
          return $http.get('commons/JSONs/tableStatus.json')
                .then(function(response){
                 return response.data;
            },function(e){
                console.log(e);
                return [];
          });
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'modules/authenticate/authenticate.view.html',
      controller: 'AuthController'
    })
    .state('buildOrder',{
      url: '/buildOrder',
      templateUrl: 'modules/buildOrder/buildOrder.view.html',
      controller: 'BuildOrderController',
      abstract: true
    })
    .state('buildOrder.initiate',{
      url: '/initiate',
      templateUrl: 'modules/buildOrder/orderInit/orderInitiation.view.html',
      controller: 'OrderInitiateController'
    })
    .state('buildOrder.category',{
      url: '/category',
      templateUrl: 'modules/buildOrder/category/category.view.html',
      controller: 'CategoryController'
    })
    .state('buildOrder.menuItem',{
      url: '/menuItem/:categoryName',
      templateUrl: 'modules/buildOrder/category/menuItem/menuItem.view.html',
      controller: 'MenuItemController',
      resolve:{
        categories :function($http){
          return $http.get('commons/JSONs/category.json')
                .then(function(response){
                 return response.data;
            });
        },
        menuItems : function($http){
          return $http.get('commons/JSONs/menuItems.json')
                .then(function(response){
                 return response.data;
            });
        }
      }
    })
    .state('buildOrder.trackOrder',{
      url: '/trackOrder',
      templateUrl: 'modules/buildOrder/trackOrder/trackOrder.view.html',
      controller: 'OrderTrackerController'
    })
    .state('buildOrder.feedback', {
        url: '/feedback',
        templateUrl: 'modules/buildOrder/feedback/feedback.view.html',
        controller: 'feedbackController'
    })
    .state('buildOrder.thankyou', {
        url: '/thankyou',
        templateUrl: 'modules/buildOrder/thankyou/thankyou.view.html',
        controller: 'thankyouController'
    })
    .state('logout', {
        url: '/logout',
        templateUrl: 'modules/logout/logout.view.html',
        controller: 'logoutController'
    });
    $urlRouterProvider.otherwise('/services');


});


creativei_app.controller("MainController",function($scope, $rootScope, $state, $location, $localStorage){
  $scope.$storage = $localStorage;
  //sync running orders with rootScope
  if($localStorage.runningOrders){
    if($rootScope.runningOrders === undefined || $rootScope.runningOrders === {}){
      $rootScope.runningOrders = $localStorage.runningOrders;
    }
  }else{
    $localStorage.runningOrders = {};
  }

  $rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams, options){
    if(toState.name == "logout"){
      delete $rootScope.isAuthenticated;
      delete $scope.$storage.isAuthenticated;
      delete $rootScope.runningOrders;
      delete $scope.$storage.runningOrders;
      return;
    }
    if(toState.name === "login"){
      if($scope.$storage.isAuthenticated){
        $rootScope.isAuthenticated = $scope.$storage.isAuthenticated;
        $location.path("/services");
        return;
      }
    }

    if($rootScope.isAuthenticated)
      return;
    if($scope.$storage.isAuthenticated){
      $rootScope.isAuthenticated = $scope.$storage.isAuthenticated;
      return;
    }
    $location.path("/login");
  });

});
