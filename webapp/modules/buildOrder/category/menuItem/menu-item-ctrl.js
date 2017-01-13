creativei_app.controller('MenuItemController', function ($scope, $uibModal) {
    console.log("Inside menu item controller.");
    
    $scope.customiseDish = function () {
        var modalInstance = $uibModal.open({
            //to set this true, you will need to add ngAnimate module
            animation: false,
            backdrop: 'static',                                         //disables dismissing modal by clicking on backdrop
            templateUrl: 'modules/buildOrder/selectionAndCustomisation/customisationModal.view.html',
            controller: 'CustomisationModalController',
            size: 'md'
        });

        modalInstance.result.then(function (status) {
            if(status){
                console.log('You clicked on add to cart');              //log when the modal is dismissed with add to cart button
            }else{
                console.log('You clicked on close button');             //log when the modal is dismissed with close button
            }
        }, function () {
            console.log('Modal dismissed at: ' + new Date());           //log when the modal is dismissed by clicking on the modal backdrop,set backdrop as true or false to enable
        });
    };
});