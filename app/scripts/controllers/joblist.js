antloans.controller('JobListCtrl',['$scope','$state','response','OAuthService','localStorageService','jobService',
    function($scope, $state,response,OAuthService,localStorageService,jobService){
        var vm = this;
        vm.logout = function(){
            OAuthService.clearToken();
            principal.authenticate(null);
            console.log(localStorageService.get('access_token'))
        };
        if (response && response.status == 200) {
            $scope.user = response.data.data;
        }
        jobService.getAllJobs()
            .then(
                function(response){
                    $scope.job = response.data.data.content;
                    console.log($scope.job)
                },
            function(e){
                console.log(e)
            });
        $scope.toApproval =function(approvalId){
          $state.go('approval',{approvalId:approvalId})
        };
        /*console.log($scope.bank);
        $scope.jobs.id = $scope.job.id;
        $scope.jobs.username = $scope.job.client.first_name + ' '+ $scope.job.client.last_name;
        $scope.jobs.waiting = true;
        $scope.jobs.avatar_url = "/images/list-face.png";
        $scope.jobs.loan_amount = $scope.job.loan_amount;
        $scope.jobs.loan_purpose = $scope.job.loan_purpose;
        $scope.jobs.repayment_type = $scope.job.repayment_type;
        $scope.jobs.file_nature = $scope.job.file_nature;
        $scope.jobs.assign = "Notebook";
        $scope.jobs.broker = $scope.job.broker.first_name + ' '+ $scope.job.broker.last_name;
        $scope.jobs.special_notes = $scope.job.special_note;
        $scope.jobs.color = "orange";*/



       /* $scope.jobs=[
            {
                "id":1,
                "username":"Jake Lin",
                "waiting":true,
                "avatar_url":"/images/list-face.png",
                "loan_amount":4000,
                "loan_purpose":"Business",
                "repayment_type":"ANZ",
                "file_nature":"Commercial",
                "assign":"Notebook",
                "broker":"Laurel Siaw",
                "special_notes":"Lorem Ipsum",
                "color":"orange"
            },
            {
                "id":2,
                "username":"Joyce Li",
                "waiting":true,
                "avatar_url":"/images/list-face.png",
                "loan_amount":5000,
                "loan_purpose":"Business",
                "repayment_type":"ANZ",
                "file_nature":"Commercial",
                "assign":"Notebook",
                "broker":"Laurel Siaw",
                "special_notes":"Lorem Ipsum",
                "color":"red"
            },
            {
                "id":3,
                "username":"Danny Liu",
                "waiting":true,
                "avatar_url":"/images/list-face.png",
                "loan_amount":1500,
                "loan_purpose":"Business",
                "repayment_type":"ANZ",
                "file_nature":"Commercial",
                "assign":"Notebook",
                "broker":"Laurel Siaw",
                "special_notes":"Lorem Ipsum",
                "color":"orange"
            },
            {
                "id":4,
                "username":"Tommy Kuo",
                "waiting":true,
                "avatar_url":"/images/list-face.png",
                "loan_amount":7500,
                "loan_purpose":"Business",
                "repayment_type":"ANZ",
                "file_nature":"Commercial",
                "assign":"Notebook",
                "broker":"Laurel Siaw",
                "special_notes":"Lorem Ipsum",
                "color":"green"
            }
        ];*/
        $scope.pageAmount =[
            {"name":10},
            {"name":20},
            {"name":30}
        ];
        $scope.pageAmount.selected = $scope.pageAmount[0];
        $scope.sortBy =[
            {"name":"date"},
            {"name":"gender"},
            {"name":"username"}
        ];
        $scope.sortBy.selected = $scope.sortBy[0];

        $scope.sliderVals = [0, 10000];

        $scope.searchInput="";
}]);

