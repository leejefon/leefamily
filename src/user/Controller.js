/**
 * User Controller
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

define(['angular', 'user/services/User'], function (angular) {

	return angular.module('User.controllers', ['User.services'])

		.controller('UserController', ['$scope', '$state', '$stateParams', '$location', 'User', function ($scope, $state, $stateParams, $location, User) {

			$scope.index = function () {
				$scope.q = '';
				User.list().then(function (response) {
					$scope.users = response.data;
				});
			};

			$scope.search = function () {
				// HACK: $stateParams supposed to work, but doesn't, so use $location
				// $scope.q = $stateParams.q;
				$scope.q = $scope.q || $location.url().split('q=')[1];
				User.list().then(function (response) {
					$scope.users = response.data;
				}).then(function () {
					User.search($scope.q).then(function (data) {
						$scope.$apply(function () {
							$scope.users = data.hits.map(function (user) {
								var temp = $.grep($scope.users, function (u) {
									return 'leefamily-' + u.id === user.objectID;
								})[0];

								return $.extend({}, temp, {
									name: user._highlightResult.name.value,
									email: user._highlightResult.email.value,
									home_phone: user._highlightResult.home_phone.value,
									mobile_phone: user._highlightResult.mobile_phone.value,
									city: user._highlightResult.city.value,
									address: user._highlightResult.address.value,
									birthday: user._highlightResult.birthday.value,
									facebook: user._highlightResult.facebook.value,
									line: user._highlightResult.line.value
								});
							});
						});
					});
				});
			};

			$scope.triggerSearch = function () {
				// NOTE: $state.go doesn't call the search, probably because same controller, I can also do { reload: true }
				$state.go('user.search', { q: $scope.q });
				$scope.search();
			};

			$scope.clearSearch = function () {
				$state.go('user');
				$scope.index();
			};

			$(document).keyup(function (e) {
				var ESC_KEY = 27
				if (e.keyCode === ESC_KEY) {
					$scope.clearSearch();
				}
			});

			$scope.init = function () {
				if ($state.current.action) {
					$scope[$state.current.action]();
				}
			};

			$scope.init();

		}]);
});
