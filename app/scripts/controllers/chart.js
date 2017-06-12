antloans.controller('lineChartCtrl',['$scope','chartService',
    function($scope,chartService){
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.type = 'bar';
    $scope.data = [
        [100, 550, 700, 450, 1400, 1700, 1400],
        [950, 1400, 1000, 1450, 1800, 1500, 900]
    ];
    $scope.total={
        credit:chartService.getTotal($scope.data[0]),
        paypal:chartService.getTotal($scope.data[1])
    };
    $scope.totalamount = chartService.getTotal([$scope.total.credit,$scope.total.paypal])
    $scope.series = ['Credit Card', 'PayPal'];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
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
}]);