antloans.controller('navBarCtrl',['$scope','UserService','principal',
    function($scope,UserService,principal){
        var vm = this;

        var updateUser = function() {
            vm.isAuthenticated = principal.isAuthenticated();
            vm.uid = principal.getIdentity('id');
        };

        updateUser();
        UserService.getCurrentUser()
            .then(function(response){
            })
}]);