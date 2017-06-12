antloans.factory('chartService',[
    function(){
        return{
            getTotal:function(data){
                var sum = 0;
                angular.forEach(data, function(value){
                    sum += value;
                });
                return sum;
            }
        }
}]);