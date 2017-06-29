antloans.controller('reportCtrl', ['$scope', 'BankService','chartService',
    function ($scope, BankService,chartService) {
        /*set up filter properties*/
        $scope.timeFrame = [
            {"name": "Month"},
            {"name": "Quarter"},
            {"name": "Week"},
            {"name": "Year"}
        ];
        $scope.timeFrame.selected = $scope.timeFrame[0];

        $scope.user_type = [
            {"name": "All"},
            {"name": "File Owner"},
            {"name": "Broker"}
        ];
        $scope.user_type.selected = $scope.user_type[0];

        BankService.getAllBanks()
            .then(function (response) {
                $scope.banks = response.data.data;
                $scope.banks.unshift({name: 'All'});
                $scope.banks.selected = $scope.banks[0];
            }, function (e) {});

        $scope.loan_type = [
            {"name": "All"},
            {"name": "Investment"},
            {"name": "Owner Occupied"}
        ];
        $scope.loan_type.selected = $scope.loan_type[0];

        $scope.loan_status =
            [
                {
                    value: 0,
                    label: 'All'
                },
                {
                    value: 1,
                    label: 'Interview conducted'
                },
                {
                    value: 2,
                    label: 'Document collected'
                },
                {
                    value: 3,
                    label: 'Application submitted'
                },
                {
                    value: 4,
                    label: 'Conditional approval'
                },
                {
                    value: 5,
                    label: 'Valuation ordered '
                },
                {
                    value: 6,
                    label: 'Unconditional approval '
                },
                {
                    value: 7,
                    label: 'Docs issued'
                },
                {
                    value: 8,
                    label: 'Signed docs returned'
                },
                {
                    value: 9,
                    label: 'Ready to book'
                },
                {
                    value: 10,
                    label: 'Settled'
                },
                {
                    value: 11,
                    label: 'One month post settlement confirmation'
                }
            ];
        $scope.loan_status.selected = $scope.loan_status[0];

        $scope.processing_time = [
            {"name":"All"},
            {"name":"30 days"},
            {"name":"45 days"},
            {"name":"60 days"},
            {"name":"90 days"},
            {"name":"6 months"},
            {"name":"Over 12 months"}
        ];
        $scope.processing_time.selected = $scope.processing_time[0];

        $scope.chart_type = [
            {"name":"bar chart"},
            {"name":"line chart"}
        ];
        $scope.chart_type.selected = $scope.chart_type[0];

        /*google chart api*/
        $scope.Chart = {};

        $scope.Chart.type = "BarChart";

        $scope.onions = [
            {v: "Onions"},
            {v: 3}
        ];

        $scope.Chart.data = {"cols": [
            {id: "t", label: "Topping", type: "string"},
            {id: "s", label: "Slices", type: "number"}
        ], "rows": [
            {c: [
                {v: "Mushrooms"},
                {v: 3}
            ]},
            {c: $scope.onions},
            {c: [
                {v: "Olives"},
                {v: 31}
            ]},
            {c: [
                {v: "Zucchini"},
                {v: 1}
            ]},
            {c: [
                {v: "Pepperoni"},
                {v: 2}
            ]}
        ]};

        $scope.Chart.options = {
            title: 'How Much Pizza I Ate Last Night',
            orientation:'horizontal'
        };

        /*apply filter*/
        $scope.applyFilter = function(){
            if($scope.chart_type.selected == $scope.chart_type[0]){
                $scope.Chart.type = "BarChart";
                $scope.Chart.options.orientation = 'horizontal'
            }else if($scope.chart_type.selected == $scope.chart_type[1]){
                $scope.Chart.type = "LineChart";
            }
            /*if($scope.timeFrame.selected == $scope.timeFrame[0]){
                $scope.time = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
            }else if($scope.timeFrame.selected == $scope.timeFrame[1]){
                $scope.time = ["Q1","Q2","Q3","Q4"];
            }else if($scope.timeFrame.selected == $scope.timeFrame[2]){
                $scope.time = ["Week1","Week2","Week3","Week4"];
            }else if($scope.timeFrame.selected == $scope.timeFrame[3]){
                var current_year = new Date().getFullYear();
                var start_year = 2013;
                var years = [];
                for(var i = 0;i < current_year - start_year;i++){
                    years.push(start_year+i);
                }
                years.push(current_year);
                $scope.time = years;
            }*/
        };

        /*chart setup*/
        /*$scope.time = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
        $scope.type = 'bar';
        $scope.data = [
            [100, 550, 700, 450, 1400, 1700, 1400, 450, 1400, 1700, 1400,1700],
            [950, 1400, 1000, 1450, 1800, 1500, 900, 450, 1400, 1700, 1400,800]
        ];
        $scope.total = {
            credit: chartService.getTotal($scope.data[0]),
            paypal: chartService.getTotal($scope.data[1])
        };
        $scope.totalamount = chartService.getTotal([$scope.total.credit, $scope.total.paypal]);
        $scope.series = ['Credit Card', 'PayPal'];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{yAxisID: 'y-axis-1'}];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            title: {
                display: true,
                text: 'Payments Received'
            },
            elements: {
                line: {
                    tension: 0  // disables bezier curves
                }
            }
        };*/
    }]);