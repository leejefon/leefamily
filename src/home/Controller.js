/**
 * Home Controller
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular', 'algoliasearch'], function (angular) {

	return angular.module('Home.controllers', ['algoliasearch'])

		.controller('HomeController', ['$scope', '$route', '$routeParams', '$http', 'algolia', function ($scope, $route, $routeParams, $http, algolia) {

			$scope.home = function () {

			};

			$scope.init = function () {
				if ($route.current.action) {
					$scope[$route.current.action]();
				}
			};

			$scope.init();

		}]);
});
