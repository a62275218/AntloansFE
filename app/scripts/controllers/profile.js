antloans.controller('userProfileCtrl',['$scope','response',
    function($scope,response){
        if (response && response.status == 200 && response.data.success) {
            $scope.user = response.data.data;
            console.log($scope.user);
        }
}]);