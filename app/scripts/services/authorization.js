antloans.factory('authorization', ['$rootScope','$state','principal',
    function ($rootScope, $state, principal) {
    return {
        authorize: function () {
            return principal.identity()
                .then(function () {

                    if ($rootScope.toState.data
                        && $rootScope.toState.data.roles
                        && $rootScope.toState.data.roles.length > 0) {
                        if (!principal.isInAnyRole($rootScope.toState.data.roles)) {

                            if (principal.isAuthenticated()) {
                                // user is signed in but not
                                // authorized for desired state
                                $state.go('refero.accessdenied', null, {reload: true});

                            } else {
                                // user is not authenticated. Stow
                                // the state they wanted before you
                                // send them to the sign-in state, so
                                // you can return them when you're done
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;

                                // now, send them to the signin state
                                // so they can log in
                                $state.go('refero.signin', null, {reload: true});
                            }
                        }
                    }
                });
        }
    };
}]);