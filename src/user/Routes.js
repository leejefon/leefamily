/**
 * User Routes
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'angularUIRouter', 'user/services/UserModal'], function (angular) {

	return angular.module('User.routes', ['ui.router', 'User.services'])

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
					templateUrl: '/templates/user/partials/reset_password.html',
					controller: 'UserController',
					action: 'reset_password',
					requireLogin: false
				})

				.state('user.create', {
					url: '/create',
					requireLogin: true,
					onEnter: ['$stateParams', '$state', 'UserModal', function ($stateParams, $state, UserModal) {
						UserModal.create($stateParams, $state);
					}]
				})

				.state('user.edit', {
					url: '/:name/edit',
					requireLogin: true,
					onEnter: ['$stateParams', '$state', 'UserModal', function ($stateParams, $state, UserModal) {
						UserModal.edit($stateParams, $state);
					}]
				})

				.state('user.view', {
					url: '/:name',
					requireLogin: true,
					onEnter: ['$stateParams', '$state', 'UserModal', function ($stateParams, $state, UserModal) {
						UserModal.view($stateParams, $state);
					}]
				});

			$locationProvider.html5Mode(true);
		}]);
});
