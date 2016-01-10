/**
 * Auth App
 *
 * @docs    :: http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html
 * @author  :: Jeff Lee
 * @created :: 2016/01/09
 */

define([
	'angular',
	'angularLoadingBar'
], function (angular) {

	return angular.module('Auth', [
		'chieffancypants.loadingBar'
    ]).run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.requireLogin;

			// TODO: check cookie
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
