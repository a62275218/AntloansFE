antloans.controller('notificationDetailCtrl', ['$scope', '$state', 'notificationService', 'UserService', '$stateParams',
    function ($scope, $state, notificationService, UserService, $stateParams) {

        //detailed user info
        notificationService.getNotificationDetail($stateParams.notificationId)
            .then(function (response) {
                $scope.notification = response.data.notification;
            }, function (e) {
                console.log(e)
            });

        $scope.toDeal = function(id){
            $state.go('approval',{jobId:id})
        }
    }]);