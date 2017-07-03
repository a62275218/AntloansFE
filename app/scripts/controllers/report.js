antloans.controller('reportCtrl', ['$scope', 'BankService','UserService','reportService','jobService',
    function ($scope, BankService,UserService,reportService,jobService) {
    var vm = this;

        /*google chart api*/
        $scope.Chart = {};

        $scope.Chart.type = "ColumnChart";

        $scope.Chart.data = [];

        $scope.Chart.options = {
            height:500,
            width:800,
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

        //get all banks
        BankService.getAllBanks()
            .then(function (response) {
                $scope.banks = response.data.data;
                $scope.banks.unshift({name: 'All'});
                $scope.banks.selected = $scope.banks[0];
            }, function (e) {});

        //get all customers and brokers
        $scope.brokers = [];
        $scope.admins = [];
        vm.getUsersByType = function (target,type) {
            UserService.getAllUsers()
                .then(function (response) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].role === type) {
                            target.push(response.data.data[i]);
                        }
                    }
                }, function (e) {
                })
        };
        vm.getUsersByType($scope.brokers,'broker');
        vm.getUsersByType($scope.admins,'admin');

        /*set up filter properties*/
        $scope.timeFrame = [
            {"name": "Month"},
            {"name": "Quarter"},
            {"name": "Week"},
            {"name": "Year"}
        ];
        $scope.timeFrame.selected = $scope.timeFrame[0];

        $scope.filter_by = [
            {"name": "Time"},
            {"name": "User Type"},
            {"name": "Bank"},
            {"name": "Loan"}
        ];
        $scope.filter_by.selected = $scope.filter_by[0];

        $scope.user_type = [
            {"name": "Admin"},
            {"name": "Broker"}
        ];
        $scope.user_type.selected = $scope.user_type[0];

        //get all loan properties
        jobService.getJobProperty()
            .then(function(response){
                $scope.loan_type = response.data.data.loan_type;
                $scope.loan_type.shift();
                $scope.loan_type.unshift({"label": "All","value":""});
                $scope.loan_type.selected = $scope.loan_type[0];
                console.log($scope.loan_type);
                $scope.loan_status = response.data.data.deal_status;
                $scope.loan_status.shift();
                $scope.loan_status.unshift({"label": "All","value":""});
                $scope.loan_status.selected = $scope.loan_type[0];
                console.log($scope.loan_status);
            },function(e){});

        $scope.processing_time = 10;

        $scope.chart_type = [
            {"name":"Bar chart"},
            {"name":"Line chart"}
        ];
        $scope.chart_type.selected = $scope.chart_type[0];

        /*apply filter*/
        $scope.getDaysInOneMonth = function(year, month){
            month = parseInt(month, 10);
            var d= new Date(year, month, 0);
            return d.getDate();
        };
        var today = new Date();
        $scope.start_time = Date.UTC(today.getFullYear(),0,1);
        $scope.end_time = Date.UTC(today.getFullYear(),today.getUTCMonth(),today.getUTCDate());
        $scope.step = 30;
        $scope.transferMonth = function(timestamp){
            var date = new Date(timestamp);
            switch(date.getMonth()){
                case 0:
                    return 'Jan'+'\n'+date.getFullYear() ;break;
                case 1:
                    return 'Feb'+'\n'+date.getFullYear();break;
                case 2:
                    return 'Mar'+'\n'+date.getFullYear();break;
                case 3:
                    return 'Apr'+'\n'+date.getFullYear();break;
                case 4:
                    return 'May'+'\n'+date.getFullYear();break;
                case 5:
                    return 'Jun'+'\n'+date.getFullYear();break;
                case 6:
                    return 'Jul'+'\n'+date.getFullYear();break;
                case 7:
                    return 'Aug'+'\n'+date.getFullYear();break;
                case 8:
                    return 'Sep'+'\n'+date.getFullYear();break;
                case 9:
                    return 'Oct'+'\n'+date.getFullYear();break;
                case 10:
                    return 'Nov'+'\n'+date.getFullYear();break;
                case 11:
                    return 'Dec'+'\n'+date.getFullYear();break;
            }
        };
        $scope.transferQuarter = function(timestamp) {
            var date = new Date(timestamp);
            if(date.getMonth() < 3){
                return 'Q1'+'\n'+date.getFullYear();
            }else if(date.getMonth() >= 3 && date.getMonth()<6){
                return 'Q2'+'\n'+date.getFullYear();
            }else if(date.getMonth() >= 6 && date.getMonth()<9){
                return 'Q3'+'\n'+date.getFullYear();
            }else if(date.getMonth() >= 9){
                return 'Q4'+'\n'+date.getFullYear();
            }
        };
        $scope.transferYear = function(timestamp) {
            var date = new Date(timestamp);
            return date.getFullYear().toString();
        };
        /*$scope.pushData = function(target,obj,attr,index){
            if(obj) {
                target.push(['attr', obj[index].loan_amount, obj[index].deal_numbers])
            }
        };*/
        reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step)
            .then(function(response){
                $scope.data = response.data;
                $scope.total_loan_amount = response.data.total_loan_amount;
                $scope.average_loan_amount = response.data.average_loan_amount;
                $scope.Chart.data.push(['Month','Loan Amount', 'Deal Number']);
                for(var i = 0; i< 12; i++){
                    if($scope.data.content[i]) {
                        $scope.Chart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                    }else{
                    }
                }
            },function(e){});
        $scope.findUser = function(type,id){
            var name;
            if(type =='broker'){
                angular.forEach($scope.brokers,function(v,k){
                    if(v.user_id == id){
                        name = v.first_name+ ' '+v.last_name;
                    }
                })
            }else if(type == 'admin'){
                angular.forEach($scope.admins,function(v,k){
                    if(v.user_id == id){
                        name = v.first_name+ ' '+v.last_name;
                    }
                });
            }
            return name;
        };
        $scope.applyFilter = function(){
            $scope.Chart.data = [];
            //time
            if($scope.startDate != null) {
                $scope.start_time = Date.UTC($scope.startDate.getFullYear(), $scope.startDate.getUTCMonth(), $scope.startDate.getUTCDate() + 1);
            }
            if($scope.endDate != null) {
                $scope.end_time = Date.UTC($scope.endDate.getFullYear(), $scope.endDate.getUTCMonth(), $scope.endDate.getUTCDate() + 1);
            }

            //chart type
            if($scope.chart_type.selected == $scope.chart_type[0]){
                $scope.Chart.type = "ColumnChart";
            }else if($scope.chart_type.selected == $scope.chart_type[1]){
                $scope.Chart.type = "LineChart";
            }
            //user type
            if($scope.filter_by.selected.name == 'User Type'){
                if($scope.user_type.selected.name == 'Admin'){
                    $scope.Chart.data.push(['Admin', 'Loan Amount', 'Deal Number']);
                    reportService.getReports($scope.start_time,$scope.end_time,'admin')
                        .then(function(response){
                            $scope.admin = response.data;
                            angular.forEach($scope.admin.content,function(v,k){
                                $scope.Chart.data.push([$scope.findUser('admin',v.admin_id),v.loan_amount,v.deal_number]);
                            });
                        },function(e){})
                }else if($scope.user_type.selected.name == 'Broker'){
                    $scope.Chart.data.push(['Broker','Loan Amount', 'Deal Number']);
                    reportService.getReports($scope.start_time,$scope.end_time,'broker')
                        .then(function(response){
                            $scope.broker = response.data;
                            angular.forEach($scope.broker.content,function(v,k){
                                $scope.Chart.data.push([$scope.findUser('broker',v.broker_id),v.loan_amount,v.deal_number]);
                            });
                        },function(e){})
                }
            }
            //time
            if($scope.filter_by.selected.name == 'Time'){
                if($scope.timeFrame.selected.name == 'Month'){
                    $scope.step = 30;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Month','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< 12; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{
                                }
                            }
                        },function(e){});
                }
                else if($scope.timeFrame.selected.name == 'Quarter'){
                    /*$scope.step = Math.floor($scope.getDaysInOneMonth(today.getFullYear(),today.getUTCMonth()+1) / 4);*/
                    $scope.step = 90;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Quarter','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< $scope.data.content.length; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push([$scope.transferQuarter(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{
                                }
                            }
                        },function(e){});
                }
                else if($scope.timeFrame.selected.name == 'Week'){
                    $scope.step =7;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Week','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< $scope.data.content.length; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push(['Week'+ (i+1),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{
                                }
                            }
                        },function(e){});
                }
                else if($scope.timeFrame.selected.name == 'Year'){
                    $scope.step = 365;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Year','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< $scope.data.content.length; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push([$scope.transferYear(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{}
                            }
                        },function(e){});
                }
            }
            //bank
            if($scope.filter_by.selected.name == 'Bank'){
                if($scope.banks.selected.name == 'All') {
                    $scope.Chart.data.push(['Bank', 'Loan Amount', 'Deal Number']);
                    reportService.getReports($scope.start_time, $scope.end_time, 'bank')
                        .then(function (response) {
                            $scope.bank = response.data;
                            angular.forEach($scope.bank.content, function (v, k) {
                                $scope.Chart.data.push([v.bank_id, v.loan_amount, v.deal_number]);
                            });
                        }, function (e) {})
                }else{
                    if($scope.timeFrame.selected.name == 'Month'){
                        $scope.step = 30;
                        reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,$scope.banks.selected.id)
                            .then(function(response){
                                $scope.data = response.data;
                                $scope.Chart.data.push(['Month','Loan Amount', 'Deal Number']);
                                for(var i = 0; i< 12; i++){
                                    if($scope.data.content[i]) {
                                        $scope.Chart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                    }else{
                                    }
                                }
                            },function(e){});
                    }
                    else if($scope.timeFrame.selected.name == 'Quarter'){
                        /*$scope.step = Math.floor($scope.getDaysInOneMonth(today.getFullYear(),today.getUTCMonth()+1) / 4);*/
                        $scope.step = 90;
                        reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,$scope.banks.selected.id)
                            .then(function(response){
                                $scope.data = response.data;
                                $scope.Chart.data.push(['Quarter','Loan Amount', 'Deal Number']);
                                for(var i = 0; i< $scope.data.content.length; i++){
                                    if($scope.data.content[i]) {
                                        $scope.Chart.data.push([$scope.transferQuarter(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                    }else{
                                    }
                                }
                            },function(e){});
                    }
                    else if($scope.timeFrame.selected.name == 'Week'){
                        $scope.step =7;
                        reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,$scope.banks.selected.id)
                            .then(function(response){
                                $scope.data = response.data;
                                $scope.Chart.data.push(['Week','Loan Amount', 'Deal Number']);
                                for(var i = 0; i< $scope.data.content.length; i++){
                                    if($scope.data.content[i]) {
                                        $scope.Chart.data.push(['Week'+ (i+1),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                    }else{
                                    }
                                }
                            },function(e){});
                    }
                    else if($scope.timeFrame.selected.name == 'Year'){
                        $scope.step = 365;
                        reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,$scope.banks.selected.id)
                            .then(function(response){
                                $scope.data = response.data;
                                $scope.Chart.data.push(['Year','Loan Amount', 'Deal Number']);
                                for(var i = 0; i< $scope.data.content.length; i++){
                                    if($scope.data.content[i]) {
                                        $scope.Chart.data.push([$scope.transferYear(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                    }else{}
                                }
                            },function(e){});
                    }
                }
            }
            //loan
            if($scope.filter_by.selected.name == 'Loan'){
                if($scope.timeFrame.selected.name == 'Month'){
                    $scope.step = 30;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,'',$scope.loan_type.selected.value,$scope.loan_status.selected.value,$scope.processing_time)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Month','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< 12; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push([$scope.transferMonth(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{
                                }
                            }
                        },function(e){});
                }
                else if($scope.timeFrame.selected.name == 'Quarter'){
                    $scope.step = 90;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,'',$scope.loan_type.selected.value,$scope.loan_status.selected.value,$scope.processing_time)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Quarter','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< $scope.data.content.length; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push([$scope.transferQuarter(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{
                                }
                            }
                        },function(e){});
                }
                else if($scope.timeFrame.selected.name == 'Week'){
                    $scope.step =7;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,'',$scope.loan_type.selected.value,$scope.loan_status.selected.value,$scope.processing_time)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Week','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< $scope.data.content.length; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push(['Week'+ (i+1),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{
                                }
                            }
                        },function(e){});
                }
                else if($scope.timeFrame.selected.name == 'Year'){
                    $scope.step = 365;
                    reportService.getTimeReports($scope.start_time,$scope.end_time,$scope.step,'',$scope.loan_type.selected.value,$scope.loan_status.selected.value,$scope.processing_time)
                        .then(function(response){
                            $scope.data = response.data;
                            $scope.Chart.data.push(['Year','Loan Amount', 'Deal Number']);
                            for(var i = 0; i< $scope.data.content.length; i++){
                                if($scope.data.content[i]) {
                                    $scope.Chart.data.push([$scope.transferYear(($scope.data.content[i].start + $scope.data.content[i].end)/2),$scope.data.content[i].loan_amount,$scope.data.content[i].deal_numbers]);
                                }else{}
                            }
                        },function(e){});
                }
            }
        };
    }]);