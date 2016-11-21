var creativei_app= angular.module("creativei_app",['ui.router'])

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
      controller: 'OrderController'
    })
    .state('order.current', {
      url: '/order/current',
      templateUrl: 'modules/order/current/currentOrders.view.html',
      controller: 'CurrentOrdersController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'modules/authenticate/authenticate.view.html',
      controller: 'AuthController'
    })
    $urlRouterProvider.otherwise('/login');
});

creativei_app.controller("MainController",function($scope){
  $scope.name = "aayush";
  //dummy comment
});
