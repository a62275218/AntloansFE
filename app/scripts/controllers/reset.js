antloans.controller('ResetPassCtrl',['OAuthService','UserService','$state','$stateParams','$scope',
    function(OAuthService,UserService,$state,$stateParams,$scope){
        $scope.user = this;
        OAuthService.accessToken();
        $scope.user.onSubmit = function(){
            UserService.resetPassword($stateParams.token,$scope.user.password);
            $state.go('login');
        }
}]);