antloans.controller('approvalCtrl',['$scope','jobService','$stateParams',
    function($scope,jobService,$stateParams){
    console.log($stateParams);
        jobService.getaJob($stateParams.jobId)
            .then(function(response){
                $scope.job = response.data.data;
                console.log($scope.job)
            },function(e){
                console.log(e)
            })
}]);