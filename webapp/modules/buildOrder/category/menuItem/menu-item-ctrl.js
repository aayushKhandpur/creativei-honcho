creativei_app.controller('MenuItemController', function ($scope, $uibModal,$stateParams,$http, CartService, _) {
    console.log("Inside menu item controller.");

    // //fetch category and menu item data from the JSONs
   $http.get('../../../../commons/JSONs/category.json')
         .then(function(response){
        $scope.categories = response.data;
         console.log(response.data);
     });
     $http.get('../../../../commons/JSONs/menuItems.json')
         .then(function(response){
        $scope.menuItemList = response.data.menuItem;
        angular.forEach($scope.categories, function(category, key){
          var menuItems = _.where($scope.menuItemList, {categoryID: category.Id});
          category.menuItems = menuItems;
        });
        console.log($scope.categories);
    });

    $scope.selectedMenuItem={};

    //condition for the category aside collapse
    $scope.isCollapsed = true;

    //selection and customisation modal js
    $scope.customiseDish = function (menuItem) {

      if(menuItem == undefined || menuItem === "")
        return "Error";

        $scope.selectedMenuItem = menuItem;
        var modalInstance = $uibModal.open({
            //to set this true, you will need to add ngAnimate module
            animation: false,
            backdrop: 'static',                                         //disables dismissing modal by clicking on backdrop
            templateUrl: 'modules/buildOrder/selectionAndCustomisation/customisationModal.view.html',
            controller: 'CustomisationModalController',
            size: 'md',
            resolve: {
              menuItem:function(){
              var menuItem =$scope.selectedMenuItem;
              return menuItem;
            }}
        });

        modalInstance.result.then(function (data) {
            console.log(data);
            CartService.addItem();
            // if(status){
            //     console.log('You clicked on add to cart');              //log when the modal is dismissed with add to cart button
            // }else{
            //     console.log('You clicked on close button');             //log when the modal is dismissed with close button
            // }
        }, function () {
            console.log('Modal dismissed at: ' + new Date());           //log when the modal is dismissed by clicking on the modal backdrop,set backdrop as true or false to enable
        });

        var categoryArr = ["Drinks","Lunch", "Dinner"];
        $scope.categoryFunct = function(){
          var html = "<h1>Hello</h1>";
          return $sce.trustAsHtml(html);

        }
    };
});
