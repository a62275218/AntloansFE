antloans.controller('documentCtrl',['UserService','$scope','API_BASE',
    function(UserService,$scope,API_BASE){
        UserService.getDocuments()
            .then(function(response){
                $scope.document = response.data.data;
                console.log($scope.document);
                $scope.api = API_BASE +'/download/document/';
            },function(e){})

}]);