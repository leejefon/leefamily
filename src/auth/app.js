/**
 * Auth App
 *
 * @docs    :: http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html
 * @author  :: Jeff Lee
 * @created :: 2016/01/09
 */

define([
	'angular',
	'angularLoadingBar',
	'angularCookies'
], function (angular) {

	return angular.module('Auth', [
		'chieffancypants.loadingBar',
		'ngCookies'
    ]).run(['$rootScope', '$state', '$cookies', function ($rootScope, $state, $cookies) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.requireLogin;

			if ($cookies.get('user')) {
				// TODO: login on the server as well
				$rootScope.currentUser = JSON.parse($cookies.get('user'));
			}

            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
				$rootScope.originalState = {
					state: toState,
					params: toParams
				};
                $state.go('login');
            }
        });
    }]);

	// TODO: add http interceptors for api calls
});
