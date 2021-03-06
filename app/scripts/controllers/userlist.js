antloans.controller('UserListCtrl',['$scope','UserService','paginationService','$state',
    function($scope,UserService,paginationService,$state){
    var vm =this;
    $scope.sort = '';
    $scope.desc = false;

    //detailed user info
        $scope.toUser =function(id){
            $state.go('user-detail',{userId:id});
        };

        //get all user roles
        UserService.getAllConstants()
            .then(function(response){
                $scope.user_type = response.data.data.role;
                console.log($scope.user_type)
                $scope.user_type.shift();
                $scope.user_type.unshift(
                    {label:'all',name:'all',value:0}
                    );
                $scope.user_type.selected = $scope.user_type[0];
            },function(e){});

        //get all users
        vm.getPaginatedUsers = function() {
            UserService.getAllUsers()
                .then(
                    function (response) {
                        $scope.user = response.data.data;
                        UserService.findFullName($scope.user);
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
        // $scope.totalPage = vm.getPaginatedUsers();
        //$watch search to update pagination
        $scope.$watchGroup(['searchInput','sort','user_type.selected'],function(){
            $scope.currentPage = 0;
        },true);

        /*sort job*/
        $scope.sort = '';
        $scope.desc = false;
        $scope.sortObj = function(sort,obj){
            $('th').removeClass('selected');

            if($(obj.target).is("i")){
                if($(obj.target).hasClass("false")){
                    $(obj.target).removeClass('fa-caret-up');
                    $(obj.target).addClass('fa-caret-down');
                    $(obj.target).removeClass("false");
                    $(obj.target).addClass("true");
                    $scope.desc = true;
                }else{
                    $(obj.target).removeClass("true");
                    $(obj.target).addClass("false");
                    $(obj.target).removeClass('fa-caret-down');
                    $(obj.target).addClass('fa-caret-up');
                    $scope.desc = false;
                };
                $scope.sort = sort;
                $(obj.target).parent().addClass('selected');
            }else{
              if($(obj.target).children().hasClass("false")){
                  $(obj.target).children().removeClass('fa-caret-up');
                  $(obj.target).children().addClass('fa-caret-down');
                  $(obj.target).children().removeClass("false");
                  $(obj.target).children().addClass("true");
                  $scope.desc = true;
              }else{
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
