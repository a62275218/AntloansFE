antloans.controller('forgotPassCtrl',['UserService','$scope',
    function(UserService,$scope){
        var vm = this;
        $scope.sent="";
        vm.OnSubmit = function(email) {
            UserService.forgotPass(email)
                .then(function (response) {
                    console.log(response.data);
                    if(response.data.message =="Email sent"){
                        $scope.sent = "true"
                    }else{
                        $scope.sent = "false"
                    }
                }, function (e) {
                })
        }
}]);
