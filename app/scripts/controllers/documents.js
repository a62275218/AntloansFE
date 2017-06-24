antloans.controller('documentCtrl',['UserService','$scope','API_BASE',
    function(UserService,$scope,API_BASE){
        UserService.getDocuments()
            .then(function(response){
                $scope.document = response.data.data;
                console.log($scope.document);
                $scope.api = API_BASE +'/download/document/';
            },function(e){})

            // click th =>hightlight
              $scope.thSelect = function(event){
                $(event.target).toggleClass('selected');
                if($(event.target).hasClass('selected')){
                   $(event.target).siblings('.selected').removeClass('selected');
                }
              }
}]);
