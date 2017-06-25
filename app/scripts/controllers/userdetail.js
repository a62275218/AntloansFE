antloans.controller('userDetailCtrl',['$scope','$state','UserService','$stateParams',
    function($scope,$state,UserService,$stateParams){
        UserService.getaUser($stateParams.userId)
            .then(function(response){
                $scope.user = response.data.data;
            },function(e){})

        $scope.edit = function(){
            $('.personal_detail input').removeAttr('disabled').removeClass('disable');
        };
        $scope.save = function(){
            $('.personal_detail input').attr('disabled');
            $('.personal_detail input').addClass('disable');
            UserService.updateUser($scope.user.user_id,{
                firstName:$scope.user.first_name,
                lastName:$scope.user.last_name,
                email:$scope.user.email,
                phone:$scope.user.phone,
                mobile:$scope.user.mobile,
                preferred_time:$scope.user.preferred_time,
                preferred_method:$scope.user.preferred_method
            }).then(function(){
                swal("Success!", "User uploaded", "success")
            },function(e){
                swal("Oops...", "Something went wrong! Update failed", "error");
            })
        }
}]);