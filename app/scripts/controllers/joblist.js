antloans.controller('JobListCtrl',['$scope','$state','response','OAuthService','localStorageService','jobService','paginationService','$filter',
    function($scope, $state,response,OAuthService,localStorageService,jobService,paginationService,$filter){
        var vm = this;
        vm.logout = function(){
            OAuthService.clearToken();
            principal.authenticate(null);
        };
        if (response && response.status == 200) {
            $scope.user = response.data.data;
        }
        /*set default current page*/
        $scope.currentPage = 0;

        /*get all the paginated data*/
        vm.getPaginatedJobs = function(page,limit) {
            jobService.getAllJobs()
                .then(
                    function (response) {
                        $scope.job = response.data.data.content;
                        $scope.totalPage = paginationService.numberOfPages($scope.job.length,limit);
                        $scope.jobs = $scope.job.slice(page * limit);
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
            vm.getPaginatedJobs($scope.currentPage,$scope.pageAmount.selected.name);
        };
        /*go to previous page*/
        $scope.prevPage = function(){
            $scope.currentPage--;
            if($scope.currentPage < 0){
                $scope.currentPage = 0
            }
            vm.getPaginatedJobs($scope.currentPage,$scope.pageAmount.selected.name);
        };
        /*go to first page*/
        $scope.returnToFirst = function(){
            $scope.currentPage = 0;
            vm.getPaginatedJobs($scope.currentPage,$scope.pageAmount.selected.name);
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
        vm.getPaginatedJobs($scope.currentPage,$scope.pageAmount.selected.name);
        /*set up total page*/
        $scope.totalPage = vm.getPaginatedJobs($scope.currentPage,$scope.pageAmount.selected.name);

        $scope.toApproval =function(id){
          $state.go('approval',{jobId:id})
        };

        $scope.convertName = function(name){
            if(name == "name" ){
                return "first_name"
            }
        };
        $scope.sortBy =[
            {"name":"date"},
            {"name":"gender"},
            {"name":"name"}
        ];
        $scope.sortBy.selected = $scope.sortBy[0];

        $scope.sliderVals = [0, 10000];
}]);

