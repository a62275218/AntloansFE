antloans.factory('BankService',['$http','API_BASE','OAuthService',
    function($http,API_BASE,OAuthService){
        return {
            getAllBanks:function(){
                return $http.get(API_BASE + '/banks',
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        }
                    }
                )
            }
        }
}]);