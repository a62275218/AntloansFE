var configs = {
    headers: {}
};

antloans.factory('UserService', ['$http', 'API_BASE', 'OAuthService',
    function ($http, API_BASE, OAuthService) {
        return {
            resetPassword: function (id, token, password) {
                return $http.put(API_BASE + '/users/' + id + '/resetpass', {
                    token: token,
                    newpass: password
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
            getAllUsers: function () {
                return $http.get(API_BASE + '/users',
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        }
                    }
                )
            },
            getaUser: function (id) {
                return $http.get(API_BASE + '/users/' + id,
                    {
                        headers: {
                            'Authorization': 'Bearer' + OAuthService.getToken()
                        }
                    }
                )
            },
            forgotPass: function (email) {
                return $http.post(API_BASE + '/users/forgotpass', {email: email})
            },
            updateUser: function (id, data) {
                return $http({
                    method: 'PUT',
                    url: API_BASE + '/users/' + id,
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    },
                    data: data
                });
            },
            addUserToDeal: function (id, data) {
                return $http({
                    method: 'PUT',
                    url: API_BASE + '/deals/' + id,
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    },
                    data: data
                });
            },
            getDocuments: function () {
                return $http({
                    method: 'GET',
                    url: API_BASE + '/documents/',
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    }
                });
            },
            createUser: function (data) {
                return $http({
                    method: 'POST',
                    url: API_BASE + '/signup',
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    },
                    data: data
                });
            },
            getAllConstants: function () {
                return $http({
                    method: 'GET',
                    url: API_BASE + '/constants',
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    }
                });
            },
            findFullName: function (obj) {
                angular.forEach(obj, function (v, k) {
                    if (v.first_name && v.last_name) {
                        v.name = v.first_name + ' ' + v.last_name;
                    }
                    if (v.broker) {
                        v.broker.name = v.broker.first_name + ' ' + v.broker.last_name;
                    }
                    if (v.admin) {
                        v.admin.name = v.admin.first_name + ' ' + v.admin.last_name;
                    }
                });
            },
            getUserJobs: function (id) {
                return $http({
                    method: 'GET',
                    url: API_BASE + '/users/' + id + '/deals',
                    headers: {
                        'Authorization': 'Bearer' + OAuthService.getToken()
                    }
                });
            }
        }
    }]);