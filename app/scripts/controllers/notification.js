antloans.controller('notificationListCtrl',['$scope','$state','notificationService','UserService',
    function($scope,$state,notificationService,UserService){

    //detailed user info
        $scope.toNote =function(id){
            $state.go('notification-details',{notificationId:id});
        };

        UserService.getCurrentUser()
            .then(function (response) {
                $scope.user = response.data.data;
            }, function (e) {
                console.log(e)
            });

        notificationService.getNotification()
            .then(function(response){
                $scope.alert = response.data;
            },function(e){
                console.log(e)
            });
}]);
