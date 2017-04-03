var creativei_app= angular.module("creativei_app",['ui.router','ui.bootstrap','ngAnimate','angucomplete-alt'])
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
      controller: 'CurrentOrdersController'
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
    });
    $urlRouterProvider.otherwise('/services');


});


creativei_app.controller("MainController",function($scope, $rootScope, $state, $location){
  $rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams, options){
    if(toState.name === "login")
      return;
    if($rootScope.isAuthenticated)
      return;
    $location.path("/login");
  });

  // var modalInstance = $uibModal.open({
  //     templateUrl: 'myModalContent.html',
  //     controller: 'ModalInstanceCtrl',
  //     size: 100,
  //     resolve: {
  //       items: function () {
  //         return $scope.items;
  //       }
  //     }
  //   });
  //   modalInstance.result.then(function (selectedItem) {
  //     $scope.selected = selectedItem;
  //   }, function () {
  //     $log.info('Modal dismissed at: ' + new Date());
  //   });
});

// creativei_app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
//
//   $scope.items = [1,2,3];
//   $scope.selected = {
//     item: $scope.items[0]
//   };
//
//   $scope.ok = function () {
//     $uibModalInstance.close($scope.selected.item);
//   };
//
//   $scope.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });
