creativei_app.controller('feedbackController', function ($scope, $http, $state) {
    console.log("Inside feedback controller.");
    //dummy json for feedback criteria
    $http.get("../../../commons/JSONs/feedback.json")
    .then(function(response) {
        $scope.feedbackQuestions = response.data;
    });
//    $scope.criteria1 = 5;
//    $scope.criteria2 = 4;
//    $scope.criteria3 = 3;
//    $scope.criteria4 = 2;
    $scope.additonalComment = "";
    $scope.titles = ['Bad', 'Meh', 'Okay', 'Good', 'Excellent'];
    $scope.maxRating = 5;
    $scope.feedbackRatings = [];
    $scope.submitFeedback = function(){
        console.log($scope.feedbackQuestions);
        console.log($scope.feedbackRatings);
        $state.go('services');
    };
});
