creativei_app.controller('feedbackController', function ($scope, $http) {
    console.log("Inside feedback controller.");
    //dummy json for feedback criteria
    $http.get("../../../commons/JSONs/feedback.json")
    .then(function(response) {
        $scope.feedbackQuestions = response.data;
    });
    $scope.criteria1 = 0;
    $scope.criteria2 = 0;
    $scope.criteria3 = 0;
    $scope.criteria4 = 0;
    $scope.additonalComment = "";
    $scope.titles = ['Bad', 'Meh', 'Okay', 'Good', 'Excellent']
    $scope.maxRating = 5;
});