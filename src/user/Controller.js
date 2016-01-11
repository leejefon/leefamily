/**
 * User Controller
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'user/services/User'], function (angular) {

	return angular.module('User.controllers', ['User.services'])

		.controller('UserController', ['$scope', '$state', '$stateParams', 'User', function ($scope, $state, $stateParams, User) {

			$scope.index = function () {
				User.list().then(function (response) {
					$scope.users = response.data;
				});
			};

			$scope.search = function () {
				// User.search('jeff').then(function (data) {
				// 	console.log(data);
				// });
			};

			$scope.init = function () {
				if ($state.current.action) {
					$scope[$state.current.action]();
				}
			};

			$scope.init();

		}]);
});
