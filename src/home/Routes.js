/**
 * Home Routes
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular', 'angularRoute'], function (angular) {

	return angular.module('Home.routes', ['ngRoute'])

		.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '/templates/home/partials/home.html',
					controller: 'HomeController',
					action: 'home'
				});

			$routeProvider.otherwise({ redirectTo: '/' });

			$locationProvider.html5Mode(true);
		}]);
});
