antloans.controller('createJob',['$scope','jobService','UserService',
    function($scope,jobService,UserService){
    var vm = this;
     vm.onSubmit = function(){
         jobService.createJob(
             $scope.job.user.client_id,
             $scope.job.user.bank_id,
             $scope.job.product.product,
             $scope.job.product.loan_type,
             $scope.job.product.loan_amount,
             $scope.job.product.loan_purpose,
             $scope.job.product.repayment_type,
             $scope.job.product.file_nature,
             $scope.job.product.broker_id,
             $scope.job.product.special_note
         )
     };
     vm.users={};
     vm.refreshUser = function(email){
         if(email.length<3){
             //do nothing if input is less than 3 characters
         }else {
             UserService.getAllUsers(email)
                 .then(function (response) {
                     vm.users = response.data.data;
                     console.log(vm.users)
                 }, function (e) {
                 })
         }
     };
}]);