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
                    },
                    function (e) {
                        console.log(e)
                    });
        };
        $scope.brokers = [];
        $scope.admins = [];
        vm.getUsersByType = function (target,type) {
            UserService.getAllUsers()
                .then(function (response) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].role === type) {
                            target.push(response.data.data[i]);
                        }
                    }
                    /*target.unshift({name:'ALL'});*/
                }, function (e) {
                })
        };
        vm.getBanks = function () {
            BankService.getAllBanks()
                .then(function (response) {
                    $scope.banks = response.data.data;
                    $scope.banks.unshift({name:'ALL'});
                }, function (e) {
                })
        };
        vm.getBanks();
        vm.getUsersByType($scope.brokers,'broker');
        vm.getUsersByType($scope.admins,'admin');

        /*initiate filter attributes*/
        $scope.jobStatus ='all';
        $scope.searchBank ='all';
        $scope.userType = 'all';
        $scope.userId = '';

        /*filter bank*/
        $scope.filterBankId = function(obj){
            obj.id? $scope.searchBank = obj.id: $scope.searchBank = 'all';
        };
        /*filter user*/
        $scope.filterUser = function(obj,type){
            $scope.userType = type;
            obj.user_id? $scope.userId = obj.user_id:$scope.userId ='';
        };

        /*sort job*/
        $scope.sort = '';
        $scope.desc = false;
        $scope.sortObj = function(sort,obj){
            $('th').removeClass('selected');
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
        };

        /*$scope.judgeStatus = function(status){
            if(status<4){
                return 'red';
            }else if(status >= 4 && status <10){
                return 'orange';
            }else{
                return 'green';
            }
        };*/

        //date filter
        $scope.startDate='';
        $scope.endDate='';

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
            vm.getPaginatedJobs();
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
        vm.getPaginatedJobs();

        $scope.toApproval =function(id){
          $state.go('approval',{jobId:id})
        };

        $scope.convertName = function(name){
            if(name == "name" ){
                return "first_name"
            }
        };
        /*$scope.sortBy =[
            {"name":"date"},
            {"name":"gender"},
            {"name":"name"}
        ];
        $scope.sortBy.selected = $scope.sortBy[0];*/

        $scope.$watchGroup(['searchInput','sort','jobStatus','searchBank','userType'],function(){
            $scope.currentPage = 0;
        },true);


       // bank active button
       $scope.active = function(status){
         $(status).addClass('selected');
         if($(status).hasClass('status_submission')){
           $('.status_assessment').removeClass('selected');
            $('.status_settlement').removeClass('selected');
             $('.status_all').removeClass('selected');
             $scope.jobStatus = 'submission'
         }
         if($(status).hasClass('status_assessment')){
           $('.status_submission').removeClass('selected');
            $('.status_settlement').removeClass('selected');
             $('.status_all').removeClass('selected');
             $scope.jobStatus = 'assessment'
         }
         if($(status).hasClass('status_settlement')){
           $('.status_assessment').removeClass('selected');
            $('.status_submission').removeClass('selected');
             $('.status_all').removeClass('selected');
             $scope.jobStatus = 'settlement'
         }
         if($(status).hasClass('status_all')){
           $('.status_assessment').removeClass('selected');
            $('.status_submission').removeClass('selected');
             $('.status_settlement').removeClass('selected');
             $scope.jobStatus = 'all'
         }
       }
}]);
