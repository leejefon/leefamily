/**
 * User Routes
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'angularUIRouter', 'user/services/UserModal'], function (angular) {

	return angular.module('User.routes', ['ui.router', 'User.services'])

		.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider) {
			$stateProvider
				.state('user', {
					url: '/',
					templateUrl: '/templates/user/partials/index.html',
					controller: 'UserController',
					action: 'index',
					requireLogin: true
				})

				.state('user.create', {
					url: 'create',
					requireLogin: true,
					onEnter: ['$state', '$rootScope', 'UserModal', function ($state, $rootScope, UserModal) {
						if ($rootScope.currentUser.role !== 'admin') {
							$state.go('user');
						} else {
							UserModal.create($state);
						}
					}]
				})

				.state('user.edit', {
					url: ':name/edit',
					requireLogin: true,
					onEnter: ['$state', '$stateParams', '$rootScope', 'UserModal', function ($state, $stateParams, $rootScope, UserModal) {
						if ($rootScope.currentUser.role !== 'admin' && $rootScope.currentUser.name !== $stateParams.name) {
							$state.go('user');
						} else {
							UserModal.edit($state, $stateParams);
						}
					}]
				})

				.state('user.view', {
					url: ':name',
					requireLogin: true,
					onEnter: ['$state', '$stateParams', 'UserModal', function ($state, $stateParams, UserModal) {
						UserModal.view($state, $stateParams);
					}]
				});

			$locationProvider.html5Mode(true);
		}]);
});
