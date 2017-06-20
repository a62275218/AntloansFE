antloans.factory('jobService',['API_BASE','$http','OAuthService',
    function(API_BASE,$http,OAuthService){
        return{
            getAllJobs:function(){
                return $http({
                    method:'GET',
                    url:API_BASE+"/deals",
                    headers:{
                        'Authorization':'Bearer'+OAuthService.getToken()
                    }
                })
            },
            createJob:function(data){
                return $http({
                    method:'POST',
                    url:API_BASE+"/deals",
                    headers:{
                        'Authorization':'Bearer'+OAuthService.getToken()
                    },
                    data:data
                })
            },
            getaJob: function(id) {
                return $http({
                    method: 'GET',
                    url: API_BASE + "/deals/" + id,
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    }
                })
            },
            getJobProperty:function(){
                return $http({
                    method: 'GET',
                    url: API_BASE + "/deal_constants/",
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    }
                })
            },
            getComments:function(id){
                return $http({
                    method: 'GET',
                    url: API_BASE + "/deals/"+ id +"/comments",
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    }
                })
            },
            makeComment:function(id,data){
                return $http({
                    method: 'POST',
                    url: API_BASE + "/deals/"+ id +"/comments",
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    },
                    data:data
                })
            },
            /*filterStatus:function(obj,status){
                var submission = [];
                var assessment = [];
                var settlement = [];
                if(status == 'submission'){
                    angular.forEach(obj,function(k,v){
                        console.log(k);
                        if(k.deal_status.value <4){
                            submission.push(obj)
                        }
                    });
                    return submission;
                }
            }*/
        }
}]);