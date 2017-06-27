antloans.factory('notificationService',['$http','API_BASE','OAuthService',
    function($http,API_BASE,OAuthService){
        return{
            getNotification:function(){
                return $http({
                    method:'GET',
                    url:API_BASE+"/notifications",
                    headers:{
                        'Authorization':'Bearer'+OAuthService.getToken()
                    }
                })
            }
        }
}]);