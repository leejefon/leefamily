/**
 * User Routes
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'angularUIRouter'], function (angular) {

	return angular.module('User.routes', ['ui.router'])

		.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: '/templates/user/partials/login.html',
					controller: 'UserController',
					action: 'login_form',
					requireLogin: false
				})

				.state('reset_password', {
					url: '/reset_password',
					templateUrl: '/templates/user/partials/reset_password.html',
					controller: 'UserController',
					action: 'reset_password',
					requireLogin: false
				})

				.state('reset_password.new', {
					url: '/reset_password/:key',
					requireLogin: false,
					onEnter: function ($stateParams, $state) {

					}
				})

				.state('user.add', {
					url: '/add',
					requireLogin: true,
					onEnter: function ($stateParams, $state) {

					}
				})

				.state('user.edit', {
					url: '/:name/edit',
					requireLogin: true,
					onEnter: function ($stateParams, $state) {

					}
				})

				.state('user.view', {
					url: '/:name',
					requireLogin: true,
					onEnter: function ($stateParams, $state) {

					}
				});

			$locationProvider.html5Mode(true);
		}]);
});
