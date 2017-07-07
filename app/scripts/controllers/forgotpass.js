antloans.controller('forgotPassCtrl',['UserService','$scope','$state',
    function(UserService,$scope,$state){
        var vm = this;
        $scope.sending = false;
        vm.OnSubmit = function(email) {
            $scope.sending = true;
            UserService.forgotPass(email)
                .then(function (response) {
                    $scope.sending= false;
                    if(response.data.message =="Email sent"){
                        swal("Success!", "Please check your email to reset password", "success");
                        $state.go('login');
                    }else{
                        $scope.sending= false;
                        swal("Oops...", "Please enter correct email", "error");
                    }
                }, function (e) {
                    $scope.sending= false;
                    swal("Oops...", "Something went wrong!", "error");
                })
        }
}]);
