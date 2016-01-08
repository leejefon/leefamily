/**
 * User Controller
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular'], function (angular) {

	return angular.module('User.controllers', [])

		.controller('UserController', ['$scope', '$route', '$routeParams', '$http', function ($scope, $route, $routeParams, $http) {

			$scope.login = function () {

			};

			$scope.reset_password = function () {
				var key = $routeParams.key;

				if (key) {

				}
			};

			$scope.init = function () {
				if ($route.current.action) {
					$scope[$route.current.action]();
				}
			};

			$scope.init();

		}]);
});
