antloans.controller('LoginCtrl',['$scope','UserService','$state','OAuthService','principal','$rootScope',
    function($scope,UserService,$state,OAuthService,principal,$rootScope){
        var vm = this;
        $scope.user = {};
        vm.message = false;
        vm.onSubmit = function(){
            vm.sending = true;
            OAuthService.login($scope.user.username,$scope.user.password)
                .then(function(response){
                    OAuthService.setToken(response.data.access_token);

                    principal.identity(true).then(function (response) {
                            $state.go('job-list', null, {reload: true});
                    });
                }).catch(function(e){
                swal("Oops...", "Username or password Incorrect! Login failed", "error");
            }).finally(function(){
                vm.sending = false;
            });
        }
}]);
