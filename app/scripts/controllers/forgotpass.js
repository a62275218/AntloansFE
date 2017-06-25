antloans.controller('forgotPassCtrl',['UserService','$scope','$state',
    function(UserService,$scope,$state){
        var vm = this;
        $scope.sent="";
        vm.OnSubmit = function(email) {
            UserService.forgotPass(email)
                .then(function (response) {
                    if(response.data.message =="Email sent"){
                        swal("Success!", "Please check your email to reset password", "success");
                        $state.go('login');
                    }else{
                        swal("Oops...", "Something went wrong! Please enter correct email", "error");
                    }
                }, function (e) {
                })
        }
}]);
