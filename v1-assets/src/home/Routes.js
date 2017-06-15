/**
 * Home Routes
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'angularUIRouter'], function (angular) {

	return angular.module('Home.routes', ['ui.router'])

		.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: '/templates/home/partials/login.html',
					controller: 'HomeController',
					action: 'login_form',
					requireLogin: false
				})

				.state('logout', {
					url: '/logout',
					controller: 'HomeController',
					action: 'logout',
					requireLogin: false
				})

				.state('reset_password', {
					url: '/reset_password',
					templateUrl: '/templates/home/partials/reset_password.html',
					controller: 'HomeController',
					action: 'reset_password',
					requireLogin: false
				})

				.state('reset_password.new', {
					url: '/reset_password/:key',
					templateUrl: '/templates/home/partials/reset_password.html',
					controller: 'HomeController',
					action: 'reset_password',
					requireLogin: false
				});

				$locationProvider.html5Mode(true);
		}]);
});
