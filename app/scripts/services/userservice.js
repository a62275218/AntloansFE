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
            getAllUsers: function (email) {
                return $http.get(API_BASE + '/users/search?email=' + email,
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        }
                    }
                )
            }
        }
    }]);