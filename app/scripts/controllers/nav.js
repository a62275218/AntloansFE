antloans.controller('navBarCtrl', ['$scope', 'UserService', 'principal','OAuthService','$state','notificationService',
    function ($scope, UserService, principal,OAuthService,$state,notificationService) {
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
                console.log($scope.user.role)
            }, function (e) {
                console.log(e)
            });
    }]);
