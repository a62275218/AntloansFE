antloans.controller('userProfileCtrl',['$scope','response',
    function($scope,response){
        if (response && response.status == 200 && response.data.success) {
            $scope.user = response.data.data;
            console.log($scope.user);
        }

    $scope.edit = function(){
      $('.personal_detail input').removeAttr('disabled').removeClass('disable');
    }
    $scope.save = function(){
      $('.personal_detail input').attr('disabled');
      $('.personal_detail input').addClass('disable');
    }
}]);
