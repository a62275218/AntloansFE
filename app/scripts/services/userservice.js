var configs = {
    headers: {}
};

antloans.factory('UserService', ['$http', 'API_BASE',
    function ($http, API_BASE) {
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
            getAllUsers: function () {
                return $http.get(API_BASE + '/users/current',
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        }
                    }
                )
            }
        }
    }]);