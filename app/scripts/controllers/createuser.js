antloans.controller('createUserCtrl',['$scope','UserService',
    function($scope,UserService){
    //get constants
    UserService.getAllConstants()
        .then(function(response){
            $scope.roles = response.data.data.role;
            $scope.roles.shift();
        },function(e){});
    //create user
        $scope.createUser = function() {
            UserService.createUser(
                {
                    email: $scope.email,
                    password: "12345",
                    first_name: $scope.first_name,
                    last_name: $scope.last_name,
                    role: $scope.roles.selected.value
                }
            )
                .then(function(response){
                    swal("Success!", "User created", "success");
                    $state.go('job-list')
                },function(e){
                    swal("Oops...", "Something went wrong! Create failed", "error");
                })
        }
}]);