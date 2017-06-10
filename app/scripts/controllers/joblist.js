antloans.controller('JobListCtrl',['$scope','$state',
    function($scope, $state){
        /*$scope.slider = {
            options: {
                start: function (event, ui) { $log.info('Slider start'); },
                stop: function (event, ui) { $log.info('Slider stop'); }
            }
        };*/
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
            {"name":"Date"},
            {"name":"Gender"},
            {"name":"Name"}
        ];
        $scope.sortBy.selected = $scope.sortBy[0];

        $scope.sliderVals = [0, 10000];
}]);

