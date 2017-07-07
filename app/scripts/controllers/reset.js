antloans.controller('ResetPassCtrl',['OAuthService','UserService','$state','$stateParams','$scope','$location','$timeout',
    function(OAuthService,UserService,$state,$stateParams,$scope,$location,$timeout){
        $scope.onSubmit = function(){
            console.log($stateParams);
            $scope.token = $location.search().token;
            UserService.resetPassword($stateParams.userId,$scope.token,$scope.password)
                .then(function(response){
                    if(response.data.message == "Invalid token"){
                        swal("Oops...", "Token expired", "error");
                    }else {
                        swal("Success!", "You have reset the password!", "success");
                        $timeout($state.go('login'), 400)
                    }
                },function(e){});
        }
}]);