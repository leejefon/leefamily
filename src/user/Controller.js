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
				User.list(function (err, data) {
					$scope.users = data;
				});

				// User.search('jeff', function (err, data) {
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
