var configs = {
    headers: {}
};

antloans.factory('UserService', ['$http', 'API_BASE','OAuthService',
    function ($http, API_BASE,OAuthService) {
        return {
            resetPassword: function (token, email, password) {
                return $http.put(API_BASE + '/users/resetpass', {
                    token: token,
                    email: password,
                    password: password
                });
            },
            injectToken: function (token) {
                configs.headers['Authorization'] = 'Bearer ' + token;
            },
            getCurrentUser: function () {
                return $http.get(API_BASE + '/users/current', configs);
            },
            searchUsers: function (email) {
                return $http.get(API_BASE + '/users/search?email=' + email,
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        }
                    }
                )
            },
            getAllUsers:function(){
                return $http.get(API_BASE + '/users',
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        }
                    }
                )
            },
            forgotPass:function(email){
                return $http.post(API_BASE+ '/users/forgotpass',{email:email})
            },
            updateUser:function(id,data){
                return $http({
                    method:'PUT',
                    url:API_BASE+ '/users/' + id,
                    headers:{
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    },
                    data:data
                });
            },
            getDocuments:function(){
                return $http({
                    method:'GET',
                    url:API_BASE+ '/documents/',
                    headers:{
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    }
                });
            }
        }
    }]);