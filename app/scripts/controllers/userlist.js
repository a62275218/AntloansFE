antloans.controller('UserListCtrl',['$scope','UserService','paginationService',
    function($scope,UserService,paginationService,BankService){
    var vm =this;
    $scope.sort = '';
    $scope.desc = false;
    $scope.sortBy = function(){

    };
        $scope.currentPage = 0;
        vm.numberOfPages=function(object){
            return Math.ceil($scope.user.length/$scope.pageAmount.selected.name);
        };
        vm.getPaginatedUsers = function() {
            UserService.getAllUsers()
                .then(
                    function (response) {
                        $scope.user = response.data.data;
                        $scope.totalPage = paginationService.numberOfPages($scope.user.length,$scope.pageAmount.selected.name);
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
        };
        /*go to previous page*/
        $scope.prevPage = function(){
            $scope.currentPage--;
            if($scope.currentPage < 0){
                $scope.currentPage = 0
            }
        };
        /*go to first page*/
        $scope.returnToFirst = function(){
            $scope.currentPage = 0;
            vm.getPaginatedUsers();
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
        vm.getPaginatedUsers();
        /*set up total page*/
        $scope.totalPage = vm.getPaginatedUsers();
        //$watch search to update pagination
        $scope.$watchGroup(['searchInput','desc'],function(){
            $scope.currentPage = 0;
        },true);

        // click th =>hightlight
          $('#user table th').click(function(event){
            $(event.target).toggleClass('selected');
            if($(event.target).hasClass('selected')){
               $(event.target).siblings('.selected').removeClass('selected');
            }
          })
}]);
