antloans.controller('createJob', ['$scope', 'jobService', 'UserService', 'BankService',
    function ($scope, jobService, UserService, BankService) {
        var vm = this;
        vm.onSubmit = function () {
            if(!vm.user || !vm.email || !$scope.banks.selected || !$scope.loan_type.selected || !$scope.job.product.loan_amount || !$scope.loan_purpose.selected
            || !$scope.repayment_type.selected || !$scope.file_nature.selected || !$scope.brokers.selected){
                $scope.valid = false;
            }else {
                $scope.valid = true;
                jobService.createJob(
                    {
                        "first_name": vm.user.first_name,
                        "last_name": vm.user.last_name,
                        "mobile": vm.user.mobile,
                        "address": vm.user.address,
                        "email": vm.email.email,
                        "bank_id": $scope.banks.selected.id,
                        "loan_type": $scope.loan_type.selected,
                        "loan_amount": $scope.job.product.loan_amount,
                        "loan_purpose": $scope.loan_purpose.selected,
                        "repayment_type": $scope.repayment_type.selected,
                        "file_nature": $scope.file_nature.selected,
                        "broker_id": $scope.brokers.selected.user_id,
                        "special_note": $scope.job.product.special_note
                    }
                ).then(function (response) {
                    if (response.status == 200) {
                        swal("Success!", "You created a new deal!", "success")
                    }
                }, function (e) {
                    swal("Oops...", "Something went wrong! Upload failed", "error");
                });
            }
        };
        $scope.getEmail = function(search) {
            var newUser = $scope.users.slice();
            if (search && newUser.indexOf(search) === -1) {
                newUser.unshift(search);
            }
            return newUser;
        };
        vm.users = [];
        vm.refreshUser = function (email) {
            if (email.length < 3) {
                //do nothing if input is less than 3 characters
            } else {
                UserService.searchUsers(email)
                    .then(function (response) {
                        vm.users = response.data.data;
                    }, function (e) {
                    })
            }
        };
        $scope.listUser = function () {
            vm.user = vm.email
        };
        $scope.brokers = [];
        vm.getBrokers = function () {
            UserService.getAllUsers()
                .then(function (response) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].role === 'broker') {
                            $scope.brokers.push(response.data.data[i])
                        }
                    }
                }, function (e) {
                })
        };

        /*vm.brokers.selected*/
        $scope.banks = [];
        vm.getBanks = function () {
            BankService.getAllBanks()
                .then(function (response) {
                    $scope.banks = response.data.data;
                }, function (e) {
                })
        };
        vm.repayment_type=[];
        $scope.loan_type=[];
        $scope.loan_pupose=[];
        $scope.file_nature=[];
        vm.getProperty = function(){
            jobService.getJobProperty()
                .then(function(response){
                    $scope.loan_type = response.data.data.loan_type;
                    $scope.repayment_type = response.data.data.repayment_type;
                    $scope.loan_purpose = response.data.data.loan_purpose;
                    $scope.file_nature = response.data.data.file_nature;
                    $scope.loan_type.shift();
                    $scope.file_nature.shift();
                    $scope.repayment_type.shift();
                    $scope.loan_purpose.shift();
                },function(e){
                })
        };
        vm.getBrokers();
        vm.getBanks();
        vm.getProperty();
    }]);