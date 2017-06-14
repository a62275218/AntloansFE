antloans.controller('navBarCtrl', ['$scope', 'UserService', 'principal','OAuthService','$state',
    function ($scope, UserService, principal,OAuthService,$state) {
        var vm = this;
        $scope.logout = function () {
            OAuthService.clearToken();
            principal.authenticate(null);
            $state.go('login',{},{reload:true})
        };

        var updateUser = function () {
            vm.isAuthenticated = principal.isAuthenticated();
            vm.uid = principal.getIdentity('id');
        };

        updateUser();
        UserService.getCurrentUser()
            .then(function (response) {
                $scope.user = response.data.data;
            }, function (e) {
                console.log(e)
            });
    }]);