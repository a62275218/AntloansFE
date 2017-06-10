antloans.controller('LoginCtrl',['$scope','UserService','$state','OAuthService','principal',
    function($scope,UserService,$state,OAuthService,principal){
    console.log('login')
        var vm = this;
        vm.username = "yorkfinechan@gmail.com";
        vm.password =12345;
        vm.remember = true;
        vm.onSubmit = function(){
            vm.sending = true;
            OAuthService.login(vm.username,vm.password)
                .then(function(response){
                    OAuthService.setToken(response.data.access_token);
                    $state.go('job-list', null, {reload: true});
                    principal.identity(true).then(function (response) {
                        if ($rootScope.returnToState) {
                            $state.go($rootScope.returnToState, $rootScope.returnToStateParams, {reload: true});
                            $state.go('job-list', null, {reload: true});
                        } else {
                            $state.go('job-list', null, {reload: true});
                        }
                    });

                    if (!vm.remember) {
                        OAuthService.clearToken();
                    }
                }).catch(function(e){
                    console.log(e.toString());
            }).finally(function(){
                vm.sending = false;
            });
        }
}]);
