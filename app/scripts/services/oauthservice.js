'use strict';

/**
 * @ngdoc service
 * @name jobReferoApp.OAuthService
 * @description
 * # OAuthService
 * Factory in the jobReferoApp.
 */
antloans.factory('OAuthService', ['$http','API_BASE','localStorageService',
    function ($http, API_BASE, localStorageService) {
    return {
      /**
       * get access_token
       *
       * @returns {HttpPromise}
       */
/*      login: function (username, password) {
        return $http({
          method: 'POST',
          url: API_BASE + "/oauth/token",
          headers: {
            'Authorization': 'Basic Zm9vQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: "grant_type=password&username=" + username + "&password=" + password
        });
      },*/
      /*get access_token by password*/
      accessToken:function(){
        return $http({
          method:'POST',
            url:"http://52.65.53.191:8088/users/signin"
        }).then(function(r){
          console.log(r);
        },function(e){
          console.log(e);
        })
      },
      /**
       * Save token to localStorage
       *
       * @param token
       */
      setToken: function (token) {
        localStorageService.set('access_token', token);
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
