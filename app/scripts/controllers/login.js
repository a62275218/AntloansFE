antloans.controller('LoginCtrl',['$scope','UserService','$state',
    function($scope,UserService,$state){
        $scope.user = this;
        $scope.user.onSubmit = function(){
            UserService.login($scope.user.username,$scope.user.password);
            $state.go('home.job-list')
        }
}]);
