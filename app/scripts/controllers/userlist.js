antloans.controller('UserListCtrl',['$scope','UserService','paginationService',
    function($scope,UserService,paginationService){
    var vm =this;
        $scope.sortBy =[
            {"name":"name"},
            {"name":"last activity"},
            {"name":"type"}
        ];
        $scope.sortBy.selected = $scope.sortBy[0];

        $scope.convertName = function(name){
            if(name == "name" ){
                return "first_name"
            }else if(name == "last activity"){
                return "last_login"
            }else{
                return "role"
            }
        };

        /*set default current page*/
        $scope.currentPage = 0;

        vm.getPaginatedUsers = function(page,limit) {
            UserService.getAllUsers()
                .then(
                    function (response) {
                        $scope.user = response.data.data;
                        console.log($scope.user);
                        $scope.totalPage = paginationService.numberOfPages($scope.user.length,limit);
                        $scope.users = $scope.user.slice(page * limit);
                        console.log($scope.users.length +' '+page+' '+limit );
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
            vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name);
        };
        /*go to previous page*/
        $scope.prevPage = function(){
            $scope.currentPage--;
            if($scope.currentPage < 0){
                $scope.currentPage = 0
            }
            vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name);
        };
        /*go to first page*/
        $scope.returnToFirst = function(){
            $scope.currentPage = 0;
            vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name);
        };
        /*options of page amount*/
        $scope.pageAmount =[
            {"name":5},
            {"name":10},
            {"name":15}
        ];
        /*default page amount*/
        $scope.pageAmount.selected = $scope.pageAmount[0];
        /*load paginated data*/
        vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name);
        /*set up total page*/
        $scope.totalPage = vm.getPaginatedUsers($scope.currentPage,$scope.pageAmount.selected.name);
}]);