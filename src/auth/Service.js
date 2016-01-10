/**
 * Auth Service
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/09
 */

define(['auth/app'], function (Auth) {

	return Auth

		.service('Auth', ['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {

            return {
                login: function (email, password) {
                    $http.post('/login', {
						email: email,
						password: password
					}).then(function (user) {
                        $rootScope.currentUser = user;
						if ($rootScope.originalState) {
							$state.go($rootScope.originalState.state.name, $rootScope.originalState.params);
							delete $rootScope.originalState;
						} else {
							$state.go('user');
						}
                    }, function (error) {
						toastr.error('Login Failed, check your email or password');
					});
                },
                logout: function () {
					// delete $rootScope.currentUser;
					// delete cookie
                }
            }
		}]);
});
