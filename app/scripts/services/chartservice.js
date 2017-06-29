antloans.factory('chartService',['$http','API_BASE',
    function($http,API_BASE){
        return{
            getTotal:function(data){
                var sum = 0;
                angular.forEach(data, function(value){
                    sum += value;
                });
                return sum;
            },
            getChartData:function(start_date,end_date,step){
                $http.get(API_BASE+'/reports?'+'')
            }
        }
}]);