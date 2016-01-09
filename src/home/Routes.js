/**
 * Home Routes
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular', 'angularUIRouter'], function (angular) {

	return angular.module('Home.routes', ['ui.router'])

		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: '/templates/home/partials/home.html',
					controller: 'HomeController',
					action: 'home'
				});

			$urlRouterProvider.otherwise('/');

			$locationProvider.html5Mode(true);
		}]);
});
