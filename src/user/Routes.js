/**
 * User Routes
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular', 'angularRoute'], function (angular) {

	return angular.module('User.routes', ['ngRoute'])

		.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/login', {
					templateUrl: '/templates/user/partials/login.html',
					controller: 'UserController',
					action: 'login'
				})

				.when('/reset_password', {
					templateUrl: '/templates/user/partials/reset_password.html',
					controller: 'UserController',
					action: 'reset_password'
				})

				.when('/reset_password/:key', {
					templateUrl: '/templates/user/partials/reset_password.html',
					controller: 'UserController',
					action: 'reset_password'
				});

			$locationProvider.html5Mode(true);
		}]);
});
