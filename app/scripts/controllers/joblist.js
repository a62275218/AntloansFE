antloans.controller('JobListCtrl',['$scope','$state','response','OAuthService',
    function($scope, $state,response,OAuthService){
        var vm = this;
        vm.logout = function(){
            OAuthService.clearToken();
            principal.authenticate(null);
        };
        if (response && response.status == 200 && response.data.success) {
            $scope.user = response.data.data;
        }

        $scope.toApproval =function(approvalId){
          $state.go('approval',{approvalId:approvalId})
        };
        $scope.jobs=[
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
        ];
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

