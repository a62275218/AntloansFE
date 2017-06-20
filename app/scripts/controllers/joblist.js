antloans.controller('JobListCtrl',['$scope','$state','response','OAuthService','localStorageService','jobService','paginationService','BankService','UserService',
    function($scope, $state,response,OAuthService,localStorageService,jobService,paginationService,BankService,UserService){
        var vm = this;
        /*set default current page*/
        $scope.currentPage = 0;

        /*get all the paginated data*/
        vm.getPaginatedJobs = function() {
            jobService.getAllJobs()
                .then(
                    function (response) {
                        $scope.job = response.data.data.content;
                        $scope.totalPage = paginationService.numberOfPages($scope.job.length,$scope.pageAmount.selected.name);
                        jobService.filterStatus($scope.jobs,'submission');
                    },
                    function (e) {
                        console.log(e)
                    });
        };
        $scope.brokers = [];
        $scope.admin = [];
        vm.getUsersByType = function (target,type) {
            UserService.getAllUsers()
                .then(function (response) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].role === type) {
                            target.push(response.data.data[i]);
                        }
                    }
                }, function (e) {
                })
        };
        vm.getBanks = function () {
            BankService.getAllBanks()
                .then(function (response) {
                    $scope.banks = response.data.data;
                }, function (e) {
                })
        };
        vm.getBanks();
        vm.getUsersByType($scope.brokers,'broker');
        vm.getUsersByType($scope.admins,'admin');
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

        $scope.$watchGroup(['searchInput','sortBy.selected.name'],function(){
            $scope.currentPage = 0;
        },true);
}]);

