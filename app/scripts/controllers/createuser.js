antloans.controller('createUserCtrl',['$scope','UserService',
    function($scope,UserService){
        $scope.createUser = function() {
            UserService.createUser(
                {
                    email: $scope.email,
                    password: "12345",
                    first_name: $scope.first_name,
                    last_name: $scope.last_name,
                    role: 4
                }
            )
        }
}]);