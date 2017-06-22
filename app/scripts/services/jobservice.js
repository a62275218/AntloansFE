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
            updateJob:function(id,data){
                return $http({
                    method: 'PUT',
                    url: API_BASE + "/deals/"+ id + '/approve',
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    },
                    data:data
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
            }
        }
}]);