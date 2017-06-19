antloans.controller('UserListCtrl',['$scope','UserService','paginationService',
    function($scope,UserService,paginationService){
    var vm =this;
        $scope.sort ='first_name';
        $scope.namedesc = false;
        $scope.roledesc = false;
        $scope.mobiledesc = false;
        $scope.sortByType=function(type){
            $scope.sort=type;
            if(type == 'first_name'){
                $scope.namedesc=!$scope.namedesc;
                $scope.roledesc = false;
                $scope.mobiledesc = false;
                vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
            }else if(type == 'role'){
                $scope.namedesc= false;
                $scope.roledesc = !$scope.roledesc;
                $scope.mobiledesc = false;
                vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
            }else if(type == 'mobile'){
                $scope.namedesc= false;
                $scope.roledesc = false;
                $scope.mobiledesc = !$scope.mobiledesc;
                vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
            }
        };

        /*set default current page*/
        $scope.currentPage = 0;

        vm.getPaginatedUsers = function(page,limit,attr) {
            UserService.getAllUsers()
                .then(
                    function (response) {
                        var desc = false;
                        $scope.user = response.data.data;
                        if(attr == 'first_name'){
                            desc = $scope.namedesc;
                        }else if(attr == 'role'){
                            desc = $scope.roledesc;
                        }else if(attr == 'mobile'){
                            desc = $scope.mobiledesc;
                        }
                        $scope.user.sort(paginationService.sortByAttr(attr,desc));
                        $scope.totalPage = paginationService.numberOfPages($scope.user.length,limit);
                        $scope.users = $scope.user.slice(page * limit);
                    },
                    function (e) {
                        console.log(e)
                    });
        };
        /*go to next page*/
        $scope.nextPage = function(){
            $scope.currentPage++;
            if($scope.currentPage>$scope.totalPage-1){
                $scope.currentPage = $scope.totalPage-1
            }
            vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
        };
        /*go to previous page*/
        $scope.prevPage = function(){
            $scope.currentPage--;
            if($scope.currentPage < 0){
                $scope.currentPage = 0
            }
            vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
        };
        /*go to first page*/
        $scope.returnToFirst = function(){
            $scope.currentPage = 0;
            vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
        };
        /*options of page amount*/
        $scope.pageAmount =[
            {"name":10},
            {"name":20},
            {"name":30}
        ];
        /*default page amount*/
        $scope.pageAmount.selected = $scope.pageAmount[0];
        /*load paginated data*/
        vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
        /*set up total page*/
        $scope.totalPage = vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name,$scope.sort);
}]);