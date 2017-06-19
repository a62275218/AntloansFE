antloans.controller('documentCtrl',['UserService','$scope',
    function(UserService,$scope){
        UserService.getDocuments()
            .then(function(response){
                $scope.document = response.data.data;
                console.log($scope.document)
            },function(e){})
}]);