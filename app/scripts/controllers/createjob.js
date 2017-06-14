antloans.controller('createJob', ['$scope', 'jobService', 'UserService', 'BankService',
    function ($scope, jobService, UserService, BankService) {
        var vm = this;
        vm.onSubmit = function () {
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
        vm.brokers = [];
        vm.getBrokers = function () {
            UserService.getAllUsers()
                .then(function (response) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].role === 'broker') {
                            vm.brokers.push(response.data.data[i])
                        }
                    }
                }, function (e) {
                })
        };

        /*vm.brokers.selected*/
        vm.banks = [];
        vm.getBanks = function () {
            BankService.getAllBanks()
                .then(function (response) {
                    vm.banks = response.data.data;
                    console.log(vm.banks)
                }, function (e) {
                })
        };
        vm.getBrokers();
        vm.getBanks();
    }]);