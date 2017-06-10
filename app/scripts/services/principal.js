antloans.factory('principal',['$q','$timeout','OAuthService',
    function ($q, $timeout,OAuthService) {
    var _identity,
        _authenticated = false;

    return {
      isIdentityResolved: function () {
        return angular.isDefined(_identity);
      },
      isAuthenticated: function () {
        return _authenticated;
      },

      authenticate: function (identity) {
        _authenticated = identity !== null;
        _identity = identity;
      },
      identity: function (force) {
        var deferred = $q.defer();

        if (force === true) {
          _identity = undefined;
        }

        // check and see if we have retrieved the
        // identity data from the server. if we have,
        // reuse it by immediately resolving
        if (angular.isDefined(_identity)) {
          deferred.resolve(_identity);

          return deferred.promise;
        }

        // resolve if not login
        var notLogin = function () {
          this.authenticate(null);
          deferred.resolve(null);
        }.bind(this);

        // otherwise, retrieve the identity data from the
        // server, update the identity object, and then
        // resolve.

        var accessToken = OAuthService.getToken();
        /*if (accessToken) {

          // inject token for later requests
          CompanyService.injectToken(accessToken);
          UserService.injectToken(accessToken);
          JobService.injectToken(accessToken);

          // get current user information
          UserService.getCurrentUser()
            .then(function (response) {

              this.authenticate({
                id: response.data.data.user_id,
                roles: response.data.data.user_roles
              });

              deferred.resolve(_identity);

            }.bind(this))

            .catch(notLogin);

        } else {

          notLogin();
        }*/
        return deferred.promise;
      },
      getIdentity: function (key) {
        return _identity && _identity[key];
      }
    };
  }]);
