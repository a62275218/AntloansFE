antloans.controller('ResetPassCtrl',['OAuthService','UserService','$state','$stateParams','$scope','$location',
    function(OAuthService,UserService,$state,$stateParams,$scope,$location){
        $scope.onSubmit = function(){
            console.log($stateParams);
            $scope.token = $location.search().token;
            UserService.resetPassword($stateParams.userId,$scope.token,$scope.password)
                .then(function(response){
                    console.log(response);
                    $state.go('login');
                },function(e){});
        }
}]);