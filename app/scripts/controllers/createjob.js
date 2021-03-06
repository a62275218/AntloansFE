antloans.controller('createJob', ['$scope', 'jobService', 'UserService', 'BankService',
    function ($scope, jobService, UserService, BankService) {
        var vm = this;
        vm.onSubmit = function () {
            if (vm.user.date_of_birth) {
            $scope.dob = Date.UTC(vm.user.date_of_birth.getFullYear(), vm.user.date_of_birth.getMonth(), vm.user.date_of_birth.getDate());
            }
            if($scope.settlementDate) {
                $scope.settle_date = Date.UTC($scope.settlementDate.getFullYear(), $scope.settlementDate.getMonth(), $scope.settlementDate.getDate());
            }
            if(!$scope.banks.selected || !$scope.loan_type.selected || !$scope.job.product.loan_amount || !$scope.loan_purpose.selected
            || !$scope.repayment_type.selected || !$scope.brokers.selected){
                $scope.valid = false;
            }else {
                $scope.valid = true;
                jobService.createJob(
                    {
                        "first_name": vm.user.first_name,
                        "last_name": vm.user.last_name,
                        "mobile": vm.user.mobile,
                        "address": vm.user.address,
                        "email": vm.user.email,
                        "preferred_time":vm.user.preferred_time,
                        "preferred_method":vm.user.preferred_method,
                        "date_of_birth": $scope.dob,
                        "bank_id": $scope.banks.selected.id,
                        "loan_type": $scope.loan_type.selected.value,
                        "loan_amount": $scope.job.product.loan_amount,
                        "loan_purpose": $scope.loan_purpose.selected.value,
                        "repayment_type": $scope.repayment_type.selected.value,
                        "broker_id": $scope.brokers.selected.user_id,
                        "special_note": $scope.job.product.special_note,
                        "settlement_date":$scope.settle_date
                    }
                ).then(function (response) {
                    if (response.status == 200) {
                        swal("Success!", "You created a new deal!", "success")
                        /*UserService.createUser(
                            {
                                "email": vm.user[0].email,
                                "password": "12345",
                                "first_name": vm.user[0].first_name,
                                "last_name": vm.user[0].last_name,
                                "role":5
                            }
                        )*/
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
        /*vm.refreshUser = function (email) {
            if (email.length < 3) {
                //do nothing if input is less than 3 characters
            } else {
                UserService.searchUsers(email)
                    .then(function (response) {
                        vm.users = response.data.data;
                    }, function (e) {
                    })
            }
        };*/
        vm.refreshUser = function(input){
            if(input.length <3 ){
                $scope.userobj = [];
            }
        };
        //transform tag to user
        /*vm.tagTransform = function (newTag) {
            var item = {
                first_name: '',
                last_name: '',
                email: newTag,
                mobile: '',
                address: ''
            };
            return item;
        };*/
            //get all users
            vm.getUsers = function () {
                UserService.getAllUsers()
                    .then(function (response) {
                        $scope.userobj =[];
                        //filter all customers
                        angular.forEach(response.data.data,function(v,k){
                            if(v.role == 'customer'){
                                $scope.userobj.push(v);
                                v.name = v.first_name+' '+v.last_name;
                            }
                        });
                    })
            };
            vm.getUsers();

            $scope.listUser = function(){
                /*if(vm.choosenUser.length > 0){
                    vm.choosenUser.shift();
                }*/
                vm.user = vm.choosenUser;
            };
            $scope.brokers = [];
            vm.getUsersByType = function (target, type) {
                UserService.getAllUsers()
                    .then(function (response) {
                        for (var i = 0; i < response.data.data.length; i++) {
                            if (response.data.data[i].role === type) {
                                response.data.data[i].name = response.data.data[i].first_name+' '+response.data.data[i].last_name;
                                target.push(response.data.data[i])
                            }
                        }
                    }, function (e) {
                    })
            };
            $scope.dateOptions = {
                changeYear: true,
                changeMonth: true,
                yearRange:"1800:2100"
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
            vm.repayment_type = [];
            $scope.loan_type = [];
            $scope.loan_pupose = [];
            $scope.file_nature = [];
            vm.getProperty = function () {
                jobService.getJobProperty()
                    .then(function (response) {
                        $scope.loan_type = response.data.data.loan_type;
                        $scope.repayment_type = response.data.data.repayment_type;
                        $scope.loan_purpose = response.data.data.loan_purpose;
                        $scope.file_nature = response.data.data.file_nature;
                        $scope.loan_type.shift();
                        $scope.file_nature.shift();
                        $scope.repayment_type.shift();
                        $scope.loan_purpose.shift();
                    }, function (e) {
                    })
            };
            vm.getUsersByType($scope.brokers, 'broker');
            vm.getBanks();
            vm.getProperty();
}]);
