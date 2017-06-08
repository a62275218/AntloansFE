antloans.controller('JobListCtrl',['$scope',
    function($scope){
        $scope.jobs=[
            {
                "id":1,
                "username":"Tommy Kuo",
                "waiting":true,
                "avatar_url":"/images/list-face.png",
                "loan_amount":1000,
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
                "username":"Tommy Kuo",
                "waiting":true,
                "avatar_url":"/images/list-face.png",
                "loan_amount":1000,
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
                "username":"Tommy Kuo",
                "waiting":true,
                "avatar_url":"/images/list-face.png",
                "loan_amount":1000,
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
                "loan_amount":1000,
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
}]);