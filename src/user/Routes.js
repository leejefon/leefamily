/**
 * User Routes
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'angularUIRouter', 'user/services/UserModal'], function (angular) {

	return angular.module('User.routes', ['ui.router', 'User.services'])

		.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
			$stateProvider
				.state('user', {
					url: '/',
					templateUrl: '/templates/user/partials/index.html',
					controller: 'UserController',
					action: 'index',
					requireLogin: true
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
					url: ':name',
					requireLogin: true,
					onEnter: ['$stateParams', '$state', 'UserModal', function ($stateParams, $state, UserModal) {
						UserModal.view($stateParams, $state);
					}]
				});

			$locationProvider.html5Mode(true);

			// $urlRouterProvider.otherwise('/');
		}]);
});
