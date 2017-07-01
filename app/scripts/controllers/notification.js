antloans.controller('notificationListCtrl', ['$scope', '$state', 'notificationService', 'UserService', 'paginationService',
    function ($scope, $state, notificationService, UserService, paginationService) {
        var vm = this;
        $scope.currentPage = 0;
        $scope.sort = '';
        $scope.desc = false;
        //detailed user info
        $scope.toNote = function (id) {
            $state.go('notification-details', {notificationId: id});
        };

        UserService.getCurrentUser()
            .then(function (response) {
                $scope.user = response.data.data;
            }, function (e) {
                console.log(e)
            });

        vm.getRecentNotifications = function () {
            notificationService.getRecentNotification()
                .then(function (response) {
                    $scope.alert = response.data;
                }, function (e) {});
        };

        vm.getAllNotifications = function(){
            notificationService.getNotification()
                .then(function(response){
                    $scope.alerts = response.data.notifications;
                    $scope.totalPage = paginationService.numberOfPages($scope.alerts.length, $scope.pageAmount.selected.name);
                },function(e){})
        };

        vm.getRecentNotifications();
        vm.getAllNotifications();
        /*go to next page*/
        $scope.nextPage = function () {
            $scope.currentPage++;
            if ($scope.currentPage > $scope.totalPage - 1) {
                $scope.currentPage = $scope.totalPage - 1
            }
        };
        /*go to previous page*/
        $scope.prevPage = function () {
            $scope.currentPage--;
            if ($scope.currentPage < 0) {
                $scope.currentPage = 0
            }
        };
        /*go to first page*/
        $scope.returnToFirst = function () {
            $scope.currentPage = 0;
            vm.getAllNotifications();
        };
        /*options of page amount*/
        $scope.pageAmount = [
            {"name": 10},
            {"name": 20},
            {"name": 30}
        ];
        /*default page amount*/
        $scope.pageAmount.selected = $scope.pageAmount[0];
        /*load paginated data*/
        vm.getAllNotifications();

        $scope.$watchGroup(['searchInput', 'sort'], function () {
            $scope.currentPage = 0;
        }, true);

        $scope.sortObj = function (sort, obj) {
            $('th').removeClass('selected');
            if ($(obj.target).is("i")) {
                if ($(obj.target).hasClass("false")) {
                    $(obj.target).removeClass('fa-caret-up');
                    $(obj.target).addClass('fa-caret-down');
                    $(obj.target).removeClass("false");
                    $(obj.target).addClass("true");
                    $scope.desc = true;
                } else {
                    $(obj.target).removeClass("true");
                    $(obj.target).addClass("false");
                    $(obj.target).removeClass('fa-caret-down');
                    $(obj.target).addClass('fa-caret-up');
                    $scope.desc = false;
                }
                $scope.sort = sort;
                $(obj.target).parent().addClass('selected');
            } else {
                if ($(obj.target).children().hasClass("false")) {
                    $(obj.target).children().removeClass('fa-caret-up');
                    $(obj.target).children().addClass('fa-caret-down');
                    $(obj.target).children().removeClass("false");
                    $(obj.target).children().addClass("true");
                    $scope.desc = true;
                } else {
                    $(obj.target).children().removeClass("true");
                    $(obj.target).children().addClass("false");
                    $(obj.target).children().removeClass('fa-caret-down');
                    $(obj.target).children().addClass('fa-caret-up');
                    $scope.desc = false;
                }
                $scope.sort = sort;
                $(obj.target).addClass('selected');
            }
        };
    }]);
