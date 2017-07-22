antloans.controller('reportCtrl', ['$scope', 'BankService', 'UserService', 'reportService', 'jobService', 'paginationService','user',
    function ($scope, BankService, UserService, reportService, jobService, paginationService, user) {
        if (user && user.status == 200 && user.data.success) {
            $scope.user = user.data.data;
            console.log($scope.user)
        }

        var vm = this;

        /*google chart api*/

        //line chart
        $scope.LineChart = {};

        $scope.LineChart.type = "LineChart";

        $scope.LineChart.data = [];

        $scope.LineChart.options = {
            height: 500,
            width: 800,
            title: 'Payment received ($)',
            series: {
                0: {targetAxisIndex: 0},
                1: {targetAxisIndex: 1}
            },
            vAxes: {
                // Adds titles to each axis.
                0: {title: 'Loan Amount'},
                1: {title: 'Deal Number'}
            }
        };

        //bar chart
        $scope.BarChart = {};

        $scope.BarChart.type = "ColumnChart";

        $scope.BarChart.data = [];

        $scope.BarChart.options = {
            height: 500,
            width: 800,
            title: 'Payment received ($)',
            series: {
                0: {targetAxisIndex: 0},
                1: {targetAxisIndex: 1}
            },
            vAxes: {
                // Adds titles to each axis.
                0: {title: 'Loan Amount'},
                1: {title: 'Deal Number'}
            }
        };

        /*date option*/

        //initialize start and end date
        $scope.startDate = new Date(new Date().getFullYear(), 0, 1);
        $scope.endDate = new Date();
        $scope.startDate2 = new Date(new Date().getFullYear(), 0, 1);
        $scope.endDate2 = new Date();

        $scope.inlineOptions = {
            /*customClass: getDayClass,*/
            /*minDate: new Date(),*/
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            minMode: 'month'
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        $scope.open3 = function () {
            $scope.popup3.opened = true;
        };
        $scope.open4 = function () {
            $scope.popup4.opened = true;
        };

        $scope.formats = ['MMMM-yyyy', 'yyyy/MM', 'MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };
        $scope.popup3 = {
            opened: false
        };
        $scope.popup4 = {
            opened: false
        };

        //get all banks
        BankService.getAllBanks()
            .then(function (response) {
                $scope.banks = response.data.data;
                $scope.banks.unshift({name: 'All'});
                $scope.banks.selected = $scope.banks[0];
            }, function (e) {
            });
        BankService.getAllBanks()
            .then(function (response) {
                $scope.multi_bank = response.data.data;
            }, function (e) {
            });

        //get all customers and brokers
        $scope.brokers = [];
        $scope.admins = [];
        vm.getUsersByType = function (target, type) {
            UserService.getAllUsers()
                .then(function(response){
                    $scope.users = response.data.data;
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].role === type) {
                            $scope.users[i].name = $scope.users[i].first_name + ' ' + $scope.users[i].last_name;
                            target.push($scope.users[i]);
                        }
                    }
                },function(e){});
        };
        vm.getUsersByType($scope.brokers, 'broker');
        vm.getUsersByType($scope.admins, 'admin');
        vm.getUsersByType($scope.users);
        /*set up filter properties*/
        $scope.timeFrame = [
            {"name": "Month"},
            {"name": "Year"}
        ];
        $scope.timeFrame.selected = $scope.timeFrame[0];

        $scope.radioModel = 'bank';

        /*$scope.filter_by = [
         {"name": "Time"},
         {"name": "Bank"},
         {"name": "Loan"}
         ];
         $scope.filter_by.selected = $scope.filter_by[0];*/


        /*$scope.filter_by_bar = [
         {"name": "User Type"},
         {"name": "Bank"}
         ];
         $scope.filter_by_bar.selected = $scope.filter_by_bar[0];*/

        /*$scope.user_type_admin = [
         {"name": "All"},
         {"name": "None"},
         {"name": "Customize"}
         ];
         $scope.user_type_admin.selected = $scope.user_type_admin[1];

         $scope.user_type_broker = [
         {"name": "All"},
         {"name": "None"},
         {"name": "Customize"}
         ];
         $scope.user_type_broker.selected = $scope.user_type_broker[1];

         $scope.bank_type = [
         {"name": "All"},
         {"name": "None"},
         {"name": "Customize"}
         ];
         $scope.bank_type.selected = $scope.bank_type[1];*/
        //bar chart filter
        //$scope.filter_by_bar = 'admin';
        //get all loan properties
        jobService.getJobProperty()
            .then(function (response) {
                $scope.loan_type = response.data.data.loan_type;
                $scope.loan_type.shift();
                $scope.loan_type.unshift({"label": "All", "name": ""});
                $scope.loan_type.selected = $scope.loan_type[0];
                $scope.loan_status = response.data.data.deal_status;
                $scope.loan_status.shift();
                $scope.loan_status.unshift({"label": "All", "value": ""});
                $scope.loan_status.selected = $scope.loan_type[0];
            }, function (e) {
            });

        $scope.processing_time = null;

        /*apply filter*/
        $scope.getDaysInOneMonth = function (year, month) {
            month = parseInt(month, 10);
            var d = new Date(year, month, 0);
            return d.getDate();
        };
        var today = new Date();
        $scope.start_time = Date.UTC(today.getFullYear(), 0, 1);
        $scope.end_time = Date.UTC(today.getFullYear(), today.getUTCMonth(), today.getUTCDate());
        $scope.step = 30;
        $scope.transferMonth = function (timestamp) {
            var date = new Date(timestamp);
            switch (date.getMonth()) {
                case 0:
                    return 'Jan' + '\n' + date.getFullYear();
                    break;
                case 1:
                    return 'Feb' + '\n' + date.getFullYear();
                    break;
                case 2:
                    return 'Mar' + '\n' + date.getFullYear();
                    break;
                case 3:
                    return 'Apr' + '\n' + date.getFullYear();
                    break;
                case 4:
                    return 'May' + '\n' + date.getFullYear();
                    break;
                case 5:
                    return 'Jun' + '\n' + date.getFullYear();
                    break;
                case 6:
                    return 'Jul' + '\n' + date.getFullYear();
                    break;
                case 7:
                    return 'Aug' + '\n' + date.getFullYear();
                    break;
                case 8:
                    return 'Sep' + '\n' + date.getFullYear();
                    break;
                case 9:
                    return 'Oct' + '\n' + date.getFullYear();
                    break;
                case 10:
                    return 'Nov' + '\n' + date.getFullYear();
                    break;
                case 11:
                    return 'Dec' + '\n' + date.getFullYear();
                    break;
            }
        };
        $scope.transferQuarter = function (timestamp) {
            var date = new Date(timestamp);
            if (date.getMonth() < 3) {
                return 'Q1' + '\n' + date.getFullYear();
            } else if (date.getMonth() >= 3 && date.getMonth() < 6) {
                return 'Q2' + '\n' + date.getFullYear();
            } else if (date.getMonth() >= 6 && date.getMonth() < 9) {
                return 'Q3' + '\n' + date.getFullYear();
            } else if (date.getMonth() >= 9) {
                return 'Q4' + '\n' + date.getFullYear();
            }
        };
        $scope.transferYear = function (timestamp) {
            var date = new Date(timestamp);
            return date.getFullYear().toString();
        };
        //find user by name
        $scope.findUser = function (type, id) {
            var name;
            if (type == 'broker') {
                angular.forEach($scope.brokers, function (v, k) {
                    if (v.user_id == id) {
                        name = v.first_name + ' ' + v.last_name;
                    }
                })
            } else if (type == 'admin') {
                angular.forEach($scope.admins, function (v, k) {
                    if (v.user_id == id) {
                        name = v.first_name + ' ' + v.last_name;
                    }
                });
            }
            return name;
        };

        //initiate line chart data
        //super admin
        $scope.initSuper = function () {
            //initiate line chart data
            reportService.getTimeReports($scope.start_time, $scope.end_time, $scope.step)
                .then(function (response) {
                    $scope.data = response.data;
                    $scope.total_loan_amount = response.data.total_loan_amount;
                    $scope.average_loan_amount = response.data.average_loan_amount;
                    $scope.LineChart.data.push(['Month', 'Loan Amount', 'Deal Number']);
                    for (var i = 0; i < $scope.data.content.length; i++) {
                        if ($scope.data.content[i]) {
                            $scope.LineChart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end) / 2), $scope.data.content[i].loan_amount, $scope.data.content[i].deal_numbers]);
                        } else {
                        }
                    }
                }, function (e) {
                });
            //initiate bar chart data
            reportService.getReports($scope.start_time, $scope.end_time, $scope.radioModel)
                .then(function (response) {
                    $scope.data_bar = response.data;
                    $scope.BarChart.data.push(['Bank', 'Loan Amount', 'Deal Number']);
                    angular.forEach($scope.data_bar.content, function (v, k) {
                        $scope.BarChart.data.push([v.bank_id, v.loan_amount, v.deal_number])
                    })
                }, function (e) {
                })
        };

        //broker or admin
        $scope.initNormal = function () {
            reportService.getUserReports($scope.start_time, $scope.end_time, $scope.step)
                .then(function (response) {
                    $scope.data = response.data;
                    $scope.total_loan_amount = response.data.total_loan_amount;
                    $scope.average_loan_amount = response.data.average_loan_amount;
                    $scope.LineChart.data.push(['Month', 'Loan Amount', 'Deal Number']);
                    for (var i = 0; i < $scope.data.content.length; i++) {
                        if ($scope.data.content[i]) {
                            $scope.LineChart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end) / 2), $scope.data.content[i].loan_amount, $scope.data.content[i].deal_numbers]);
                        } else {
                        }
                    }
                }, function (e) {
                });
        };

        if ($scope.user.role == 'super admin' || $scope.user.role == 'supervisor') {
            $scope.initSuper();
        } else {
            $scope.initNormal();
        }

        //line chart filter
        $scope.applyFilter1 = function () {
            $scope.LineChart.data = [];
            //time
            if ($scope.startDate != null) {
                $scope.start_time = Date.UTC($scope.startDate.getFullYear(), $scope.startDate.getMonth(), $scope.startDate.getDate());
            }
            if ($scope.endDate != null) {
                $scope.end_time = Date.UTC($scope.endDate.getFullYear(), $scope.endDate.getMonth(), $scope.endDate.getDate());
            }
            var bank = null,
                loan_type = null,
                loan_status = null,
                step = 30;
            $scope.banks.selected.name != 'All' ? bank = $scope.banks.selected.name : bank = null;
            $scope.loan_type.selected.name != 'All' ? loan_type = $scope.loan_type.selected.name : loan_type = null;
            $scope.loan_status.selected.name != 'All' ? loan_status = $scope.loan_status.selected.name : loan_status = null;
            $scope.timeFrame.selected.name == 'Month' ? step = 30 : step = 365;
            if ($scope.user.role == 'super admin' || $scope.user.role == 'supervisor') {
                reportService.getTimeReports($scope.start_time, $scope.end_time, step, bank, loan_type, loan_status, $scope.processing_time)
                    .then(function (response) {
                        $scope.data = response.data;
                        $scope.LineChart.data.push(['Month', 'Loan Amount', 'Deal Number']);
                        for (var i = 0; i < $scope.data.content.length; i++) {
                            if ($scope.data.content[i]) {
                                if (step == 30) {
                                    $scope.LineChart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end) / 2), $scope.data.content[i].loan_amount, $scope.data.content[i].deal_numbers]);
                                } else {
                                    $scope.LineChart.data.push([$scope.transferYear(($scope.data.content[i].start + $scope.data.content[i].end) / 2), $scope.data.content[i].loan_amount, $scope.data.content[i].deal_numbers]);
                                }
                            } else {
                            }
                        }
                    }, function (e) {
                    });
            } else {
                reportService.getUserReports($scope.start_time, $scope.end_time, step, bank, loan_type, loan_status, $scope.processing_time)
                    .then(function (response) {
                        $scope.data = response.data;
                        $scope.LineChart.data.push(['Month', 'Loan Amount', 'Deal Number']);
                        for (var i = 0; i < $scope.data.content.length; i++) {
                            if ($scope.data.content[i]) {
                                if (step == 30) {
                                    $scope.LineChart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end) / 2), $scope.data.content[i].loan_amount, $scope.data.content[i].deal_numbers]);
                                } else {
                                    $scope.LineChart.data.push([$scope.transferYear(($scope.data.content[i].start + $scope.data.content[i].end) / 2), $scope.data.content[i].loan_amount, $scope.data.content[i].deal_numbers]);
                                }
                            } else {
                            }
                        }
                    }, function (e) {
                    });
            }

        };

        $scope.changeRole = function(role){
            $scope.radioModel = role;
        };

        //bar chart filter
        $scope.applyFilter2 = function () {
            $scope.BarChart.data = [];
            //time
            if ($scope.startDate2 != null) {
                $scope.start_time2 = Date.UTC($scope.startDate2.getFullYear(), $scope.startDate2.getMonth(), $scope.startDate2.getDate());
            }
            if ($scope.endDate2 != null) {
                $scope.end_time2 = Date.UTC($scope.endDate2.getFullYear(), $scope.endDate2.getMonth(), $scope.endDate2.getDate());
            }
            $scope.BarChart.data.push(['Obj', 'Loan Amount', 'Deal Number']);

            reportService.getReports($scope.start_time2, $scope.end_time2, $scope.radioModel)
                .then(function (response) {

                    $scope.data_bar = response.data;
                    if ($scope.radioModel == 'bank') {
                        angular.forEach($scope.data_bar.content, function (v, k) {
                            $scope.BarChart.data.push([v.bank_id, v.loan_amount, v.deal_number])
                        })
                    } else if ($scope.radioModel == 'admin') {
                        angular.forEach($scope.data_bar.content, function (v, k) {
                            $scope.BarChart.data.push([$scope.findUser('admin', v.admin_id), v.loan_amount, v.deal_number])
                        })
                    } else if ($scope.radioModel == 'broker') {
                        angular.forEach($scope.data_bar.content, function (v, k) {
                            $scope.BarChart.data.push([$scope.findUser('broker', v.broker_id), v.loan_amount, v.deal_number]);
                        });
                    }
                }, function (e) {
                });
        };

        /*log information*/
        /*set default current page*/
        $scope.currentPage = 0;

        $scope.getPaginatedLogs = function () {
            reportService.getAllLogs()
                .then(function (response) {
                    $scope.logs = response.data.data.content;
                    $scope.totalPage = paginationService.numberOfPages($scope.logs.length, $scope.pageAmount.selected.name);
                }, function (e) {
                })
        };
        $scope.getPaginatedLogs();

        /*sort attribute*/
        $scope.sort = '';
        $scope.desc = false;

        $scope.sortObj = function (sort, obj) {
            $('th').removeClass('selected');
            if ($(obj.target).is("i")) {
                if ($(obj.target).hasClass("false")) {
                    $(obj.target).removeClass('fa-caret-up');
                    $(obj.target).addClass('fa-caret-down');
                    $(obj.target).removeClass("false");
                    $(obj.target).addClass("true");
                    $scope.desc = true;
                } else {
                    $(obj.target).removeClass("true");
                    $(obj.target).addClass("false");
                    $(obj.target).removeClass('fa-caret-down');
                    $(obj.target).addClass('fa-caret-up');
                    $scope.desc = false;
                }
                $scope.sort = sort;
                $(obj.target).parent().addClass('selected');
            } else {
                if ($(obj.target).children().hasClass("false")) {
                    $(obj.target).children().removeClass('fa-caret-up');
                    $(obj.target).children().addClass('fa-caret-down');
                    $(obj.target).children().removeClass("false");
                    $(obj.target).children().addClass("true");
                    $scope.desc = true;
                } else {
                    $(obj.target).children().removeClass("true");
                    $(obj.target).children().addClass("false");
                    $(obj.target).children().removeClass('fa-caret-down');
                    $(obj.target).children().addClass('fa-caret-up');
                    $scope.desc = false;
                }
                $scope.sort = sort;
                $(obj.target).addClass('selected');
            }
        };

        /*go to next page*/
        $scope.nextPage = function () {
            $scope.currentPage++;
            if ($scope.currentPage > $scope.totalPage - 1) {
                $scope.currentPage = $scope.totalPage - 1
            }
        };
        /*go to previous page*/
        $scope.prevPage = function () {
            $scope.currentPage--;
            if ($scope.currentPage < 0) {
                $scope.currentPage = 0
            }
        };
        /*go to first page*/
        $scope.returnToFirst = function () {
            $scope.currentPage = 0;
            vm.getPaginatedJobs();
        };
        /*options of page amount*/
        $scope.pageAmount = [
            {"name": 10},
            {"name": 20},
            {"name": 30}
        ];
        /*default page amount*/
        $scope.pageAmount.selected = $scope.pageAmount[0];

        $scope.$watchGroup(['searchInput', 'sort', 'jobStatus', 'searchBank', 'userType'], function () {
            $scope.currentPage = 0;
        }, true);
    }]);