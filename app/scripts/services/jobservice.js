antloans.factory('jobService',[
    function(){
        return{
            getAllJobs:function(){
                return $http.get()
            }
        }
}]);