antloans.factory('reportService',['$http','API_BASE','OAuthService',
    function($http,API_BASE,OAuthService){
        return {
            getTimeReports:function(start_date,end_date,step,bank_id,loan_type,loan_status,processing_time){
                return $http.get(API_BASE + '/reports',
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        },
                        params:{
                            startDateTime:start_date,
                            endDateTime:end_date,
                            step:step,
                            bank:bank_id,
                            loanType:loan_type,
                            loanStatus:loan_status,
                            processingTime:processing_time
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