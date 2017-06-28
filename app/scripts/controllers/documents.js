antloans.controller('documentCtrl',['UserService','$scope','API_BASE','paginationService',
    function(UserService,$scope,API_BASE,paginationService){
    var vm = this;
        $scope.sort = '';
        $scope.desc = false;
    //api base for document download
        $scope.api = API_BASE + '/download/document/';
    vm.getPaginatedDocuments = function() {
        UserService.getDocuments()
            .then(function (response) {
                $scope.document = response.data.data;
                $scope.totalPage = paginationService.numberOfPages($scope.document.length,$scope.pageAmount.selected.name);
            }, function (e) {
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
            vm.getPaginatedDocuments();
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
        vm.getPaginatedDocuments();

        $scope.$watchGroup(['searchInput','sort'],function(){
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
