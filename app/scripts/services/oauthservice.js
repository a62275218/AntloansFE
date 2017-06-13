'use strict';
antloans.factory('OAuthService', ['$http','API_BASE','localStorageService',
    function ($http, API_BASE, localStorageService) {
      var cacheToken = {};
    return {
        /**
         * get access_token by username/password
         *
         * @param password
         * @param username
         * @returns {HttpPromise}
         */
      login: function (username,password) {
        return $http({
          method: 'POST',
          url: API_BASE+"/signin",
          headers: {
            'Authorization': 'Basic Zm9vQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            data: "grant_type=password&username=" + username + "&password=" + password
        })
      },
      /**
       * Save token to localStorage
       *
       * @param token
       */
      setToken: function (access_token,expires_in,refresh_token) {
          localStorageService.set('access_token', access_token);
      },
      /**
       * Get token from localStorage
       */
      getToken: function () {
        return localStorageService.get('access_token');
      },
      /**
       * remove token from localStorage
       */
      clearToken: function () {
          localStorageService.remove('access_token');
      }
    };
  }]);
