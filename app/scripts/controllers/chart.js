antloans
    .controller('lineChartCtrl', ['$scope', 'chartService',
        function ($scope, chartService) {
            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.type = 'bar';
            $scope.data = [
                [100, 550, 700, 450, 1400, 1700, 1400],
                [950, 1400, 1000, 1450, 1800, 1500, 900]
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
            };
        }])
    .controller('donutChartCtrl', ['$scope', 'chartService',
        function ($scope, chartService) {
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.type = 'bar';
            $scope.data = [300, 500, 100];
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
                }
            };
        }])
    .controller('scatterChartCtrl', ['$scope', 'chartService',
        function ($scope, chartService) {
            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.type = 'bar';
            $scope.data = [
                [100, 550, 700, 450, 1400, 1700, 1400],
                [950, 1400, 1000, 1450, 1800, 1500, 900]
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
                showLines: false
            };
        }])
    .controller('polarAreaCtrl', ['$scope',
        function ($scope) {
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
            $scope.data = [300, 500, 100, 40, 120];
        }])
    .controller('barChartCtrl', ['$scope',
        function ($scope) {

        }])
    .controller('radarCtrl', ['$scope',
        function ($scope) {
            $scope.labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

            $scope.data = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ];
        }])
    .controller('barChartCtrl', ['$scope',
        function ($scope) {
            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];

            $scope.type = "horizontalBar";

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
        }]);