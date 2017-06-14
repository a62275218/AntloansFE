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
            createJob:function(client_id,bank_id,product,loan_type,loan_amount,loan_purpose,repayment_type,file_nature,broker_id,special_note){
                return $http({
                    method:'POST',
                    url:API_BASE+"/deals",
                    headers:{
                        'Authorization':'Bearer'+OAuthService.getToken()
                    },
                    data:{
                        client_id:client_id,
                        bank_id:bank_id,
                        product:product,
                        loan_type:loan_type,
                        loan_amount:loan_amount,
                        loan_purpose:loan_purpose,
                        repayment_type:repayment_type,
                        file_nature:file_nature,
                        broker_id:broker_id,
                        special_note:special_note
                    }
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
            getJobStatus:function(status){
                if(status === ''){

                }
            }
        }
}]);