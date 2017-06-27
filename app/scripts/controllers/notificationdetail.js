antloans.controller('notificationDetailCtrl', ['$scope', '$state', 'notificationService', 'UserService', '$stateParams',
    function ($scope, $state, notificationService, UserService, $stateParams) {

        //detailed user info
        notificationService.getNotification()
            .then(function (response) {
                $scope.alert = response.data;
                angular.forEach($scope.alert.notifications, function (v, k) {
                    if (v.notification_id == $stateParams.notificationId) {
                        $scope.notification = v;
                    }
                });
            }, function (e) {
                console.log(e)
            });

        $scope.toDeal = function(id){
            $state.go('approval',{jobId:id})
        }
    }]);