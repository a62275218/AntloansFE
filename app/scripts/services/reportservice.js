antloans.factory('reportService',['$http','API_BASE','OAuthService',
    function($http,API_BASE,OAuthService){
        return {
            getTimeReports:function(start_date,end_date,step){
                return $http.get(API_BASE + '/reports',
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        },
                        params:{
                            startDateTime:start_date,
                            endDateTime:end_date,
                            step:step
                        }
                    }
                )
            },
            getReports:function(start_date,end_date,type){
                return $http.get(API_BASE + '/reports1',
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        },
                        params:{
                            startDateTime:start_date,
                            endDateTime:end_date,
                            type:type
                        }
                    }
                )
            }
        }
    }]);