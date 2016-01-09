/**
 * User Routes
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular', 'angularUIRouter'], function (angular) {

	return angular.module('User.routes', ['ui.router'])

		.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: '/templates/user/partials/login.html',
					controller: 'UserController',
					action: 'login'
				})

				.state('reset_password', {
					url: '/reset_password',
					templateUrl: '/templates/user/partials/reset_password.html',
					controller: 'UserController',
					action: 'reset_password'
				})

				.state('reset_password.new', {
					url: '/reset_password/:key',
					onEnter: function ($stateParams, $state) {

					}
				})

				.state('user.add', {
					url: '/add',
					onEnter: function ($stateParams, $state) {

					}
				})

				.state('user.edit', {
					url: '/:name/edit',
					onEnter: function ($stateParams, $state) {

					}
				})

				.state('user.view', {
					url: '/:name',
					onEnter: function ($stateParams, $state) {

					}
				});

			$locationProvider.html5Mode(true);
		}]);
});
