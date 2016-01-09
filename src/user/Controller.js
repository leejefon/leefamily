/**
 * User Controller
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

define(['angular'], function (angular) {

	return angular.module('User.controllers', [])

		.controller('UserController', ['$scope', '$state', '$stateParams', '$http', function ($scope, $state, $stateParams, $http) {

			$scope.login = function () {

			};

			$scope.reset_password = function () {
				var key = $stateParams.key;

				if (key) {

				}
			};

			$scope.init = function () {
				if ($state.current.action) {
					$scope[$state.current.action]();
				}
			};

			$scope.init();

		}]);
});
