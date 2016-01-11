/**
 * Home Controller
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'auth/Service'], function (angular) {

	return angular.module('Home.controllers', ['Auth'])

		.controller('HomeController', ['$scope', '$state', '$stateParams', 'Auth', function ($scope, $state, $stateParams, Auth) {

			$scope.login = function () {
				Auth.login($scope.loginForm.email, $scope.loginForm.password);
			};

			$scope.login_form = function () {
				$scope.loginForm = {
					email: '',
					password: ''
				};
			};

			$scope.logout = function () {
				Auth.logout();
				$state.go('login');
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
